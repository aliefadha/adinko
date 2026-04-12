import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { PlusIcon, PencilIcon, TrashIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@adinko/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@adinko/ui/components/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@adinko/ui/components/dialog";
import { Input } from "@adinko/ui/components/input";
import { Label } from "@adinko/ui/components/label";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@adinko/ui/components/tabs";

import { api } from "@/lib/api";

export const Route = createFileRoute("/_protected/admin/perusahaan/$nama")({
	component: PerusahaanPage,
});

type Perusahaan = {
	id: string;
	nama: string;
	logo: string | null;
	title: string | null;
	subtitle: string | null;
	visi: string | null;
	misi: string | null;
	createdAt: string;
};

type PerusahaanImage = {
	id: string;
	perusahaanId: string;
	image: string;
	createdAt: string;
};

type PerusahaanTag = {
	id: string;
	perusahaanId: string;
	tag: string;
	createdAt: string;
};

type PerusahaanAlasan = {
	id: string;
	perusahaanId: string;
	alasan: string;
	sortOrder: number;
	createdAt: string;
};

type PerusahaanLayanan = {
	id: string;
	perusahaanId: string;
	title: string;
	subtitle: string | null;
	image: string | null;
	namaLayanan: string;
	createdAt: string;
};

function ImageUpload({
	value,
	onChange,
	entity,
}: {
	value: string;
	onChange: (url: string) => void;
	entity: "perusahaan-image" | "perusahaan-layanan";
}) {
	const [preview, setPreview] = useState<string | null>(value || null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setPreview(URL.createObjectURL(file));
		setUploading(true);

		try {
			const url = await api.upload.uploadFile(file, entity);
			onChange(url);
			toast.success("Image uploaded");
		} catch {
			toast.error("Failed to upload image");
			setPreview(null);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<input
				type="file"
				accept="image/*"
				onChange={handleFileChange}
				className="text-sm"
			/>
			{uploading && (
				<p className="text-xs text-muted-foreground">Uploading...</p>
			)}
			{preview && (
				<img
					src={preview}
					alt="Preview"
					className="size-24 object-cover border"
				/>
			)}
		</div>
	);
}

function ImagesTab({ perusahaan }: { perusahaan: Perusahaan }) {
	const queryClient = useQueryClient();

	const { data: images, isLoading } = useQuery({
		queryKey: ["perusahaanImage", perusahaan.id],
		queryFn: () =>
			api.perusahaanImage
				.list(perusahaan.id)
				.then((r) => r.data as PerusahaanImage[]),
		staleTime: 0,
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteImage, setDeleteImage] = useState<PerusahaanImage | null>(null);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Images</h2>
					<p className="text-sm text-muted-foreground">
						Images for "Siapa Kami" section
					</p>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<PlusIcon data-icon="inline-start" />
						Add Image
					</DialogTrigger>
					<DialogContent>
						<CreateImageForm
							perusahaanId={perusahaan.id}
							onSuccess={() => {
								setCreateOpen(false);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanImage", perusahaan.id],
								});
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : !images || images.length === 0 ? (
				<Card>
					<CardContent className="p-6">
						<p className="text-center text-muted-foreground">
							No images yet. Add one to get started.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-4 gap-4">
					{images.map((img) => (
						<div
							key={img.id}
							className="relative group border rounded-lg overflow-hidden"
						>
							<img
								src={img.image}
								alt=""
								className="aspect-square object-cover"
							/>
							<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
								<Button
									size="icon-sm"
									variant="destructive"
									onClick={() => {
										setDeleteImage(img);
										setDeleteOpen(true);
									}}
								>
									<TrashIcon className="size-4" />
								</Button>
							</div>
						</div>
					))}
				</div>
			)}

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteImage && (
						<DeleteImageConfirm
							image={deleteImage}
							onSuccess={() => {
								setDeleteOpen(false);
								setDeleteImage(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanImage", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function CreateImageForm({
	perusahaanId,
	onSuccess,
}: {
	perusahaanId: string;
	onSuccess: () => void;
}) {
	const [imageUrl, setImageUrl] = useState("");

	const handleSubmit = async () => {
		if (!imageUrl) {
			toast.error("Please upload an image");
			return;
		}
		try {
			await api.perusahaanImage.create({
				perusahaanId,
				image: imageUrl,
			});
			toast.success("Image added");
			onSuccess();
		} catch {
			toast.error("Failed to add image");
		}
	};

	return (
		<>
			<DialogHeader>
				<DialogTitle>Add Image</DialogTitle>
				<DialogDescription>
					Upload an image for the company profile.
				</DialogDescription>
			</DialogHeader>
			<div className="flex flex-col gap-4 py-4">
				<ImageUpload
					value={imageUrl}
					onChange={setImageUrl}
					entity="perusahaan-image"
				/>
			</div>
			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<Button onClick={handleSubmit}>Add</Button>
			</DialogFooter>
		</>
	);
}

function DeleteImageConfirm({
	image,
	onSuccess,
}: {
	image: PerusahaanImage;
	onSuccess: () => void;
}) {
	const deleteMutation = useMutation({
		mutationFn: () => api.perusahaanImage.delete(image.id),
		onSuccess: () => {
			toast.success("Image deleted");
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete image");
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Image</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete this image? This action cannot be
					undone.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<Button
					variant="destructive"
					onClick={() => deleteMutation.mutate()}
					disabled={deleteMutation.isPending}
				>
					Delete
				</Button>
			</DialogFooter>
		</>
	);
}

function TagsTab({ perusahaan }: { perusahaan: Perusahaan }) {
	const queryClient = useQueryClient();

	const { data: tags, isLoading } = useQuery({
		queryKey: ["perusahaanTag", perusahaan.id],
		queryFn: () =>
			api.perusahaanTag
				.list(perusahaan.id)
				.then((r) => r.data as PerusahaanTag[]),
		staleTime: 0,
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editTag, setEditTag] = useState<PerusahaanTag | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteTag, setDeleteTag] = useState<PerusahaanTag | null>(null);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Tags</h2>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<PlusIcon data-icon="inline-start" />
						Add Tag
					</DialogTrigger>
					<DialogContent>
						<CreateTagForm
							perusahaanId={perusahaan.id}
							onSuccess={() => {
								setCreateOpen(false);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanTag", perusahaan.id],
								});
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : !tags || tags.length === 0 ? (
				<Card>
					<CardContent className="p-6">
						<p className="text-center text-muted-foreground">
							No tags yet. Add one to get started.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<div
							key={tag.id}
							className="flex items-center gap-2 border px-3 py-1 rounded-full"
						>
							<TagIcon className="size-4" />
							<span>{tag.tag}</span>
							<Button
								size="icon-sm"
								variant="ghost"
								onClick={() => {
									setEditTag(tag);
									setEditOpen(true);
								}}
							>
								<PencilIcon className="size-3" />
							</Button>
							<Button
								size="icon-sm"
								variant="ghost"
								onClick={() => {
									setDeleteTag(tag);
									setDeleteOpen(true);
								}}
							>
								<TrashIcon className="size-3" />
							</Button>
						</div>
					))}
				</div>
			)}

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					{editTag && (
						<EditTagForm
							tag={editTag}
							onSuccess={() => {
								setEditOpen(false);
								setEditTag(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanTag", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteTag && (
						<DeleteTagConfirm
							tag={deleteTag}
							onSuccess={() => {
								setDeleteOpen(false);
								setDeleteTag(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanTag", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function CreateTagForm({
	perusahaanId,
	onSuccess,
}: {
	perusahaanId: string;
	onSuccess: () => void;
}) {
	const form = useForm({
		defaultValues: { tag: "" },
		onSubmit: async ({ value }) => {
			try {
				await api.perusahaanTag.create({
					perusahaanId,
					tag: value.tag,
				});
				toast.success("Tag added");
				onSuccess();
			} catch {
				toast.error("Failed to add tag");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<DialogHeader>
				<DialogTitle>Buat Tag</DialogTitle>
			</DialogHeader>

			<form.Field name="tag">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Tag</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Add
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function EditTagForm({
	tag,
	onSuccess,
}: {
	tag: PerusahaanTag;
	onSuccess: () => void;
}) {
	const form = useForm({
		defaultValues: { tag: tag.tag },
		onSubmit: async ({ value }) => {
			try {
				await api.perusahaanTag.update(tag.id, { tag: value.tag });
				toast.success("Tag updated");
				onSuccess();
			} catch {
				toast.error("Failed to update tag");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<DialogHeader>
				<DialogTitle>Edit Tag</DialogTitle>
			</DialogHeader>

			<form.Field name="tag">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Tag</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Save
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function DeleteTagConfirm({
	tag,
	onSuccess,
}: {
	tag: PerusahaanTag;
	onSuccess: () => void;
}) {
	const deleteMutation = useMutation({
		mutationFn: () => api.perusahaanTag.delete(tag.id),
		onSuccess: () => {
			toast.success("Tag deleted");
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete tag");
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Tag</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete tag "{tag.tag}"? This action cannot be
					undone.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<Button
					variant="destructive"
					onClick={() => deleteMutation.mutate()}
					disabled={deleteMutation.isPending}
				>
					Delete
				</Button>
			</DialogFooter>
		</>
	);
}

function AlasanTab({ perusahaan }: { perusahaan: Perusahaan }) {
	const queryClient = useQueryClient();

	const { data: alasanList, isLoading } = useQuery({
		queryKey: ["perusahaanAlasan", perusahaan.id],
		queryFn: () =>
			api.perusahaanAlasan
				.list(perusahaan.id)
				.then((r) => r.data as PerusahaanAlasan[]),
		staleTime: 0,
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editAlasan, setEditAlasan] = useState<PerusahaanAlasan | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteAlasan, setDeleteAlasan] = useState<PerusahaanAlasan | null>(
		null,
	);

	const MAX_ALASAN = 4;

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Kenapa Memilih Kami</h2>
				</div>
				{(!alasanList || alasanList.length < MAX_ALASAN) && (
					<Dialog open={createOpen} onOpenChange={setCreateOpen}>
						<DialogTrigger render={<Button>Create</Button>}>
							<PlusIcon data-icon="inline-start" />
							Add Reason
						</DialogTrigger>
						<DialogContent>
							<CreateAlasanForm
								perusahaanId={perusahaan.id}
								onSuccess={() => {
									setCreateOpen(false);
									queryClient.invalidateQueries({
										queryKey: ["perusahaanAlasan", perusahaan.id],
									});
								}}
							/>
						</DialogContent>
					</Dialog>
				)}
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : !alasanList || alasanList.length === 0 ? (
				<Card>
					<CardContent className="p-6">
						<p className="text-center text-muted-foreground">
							No reasons yet. Add one to get started.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-2 gap-4">
					{alasanList.map((alasan) => (
						<Card key={alasan.id}>
							<CardContent className="p-4">
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<p className="font-medium">{alasan.alasan}</p>
									</div>
									<div className="flex gap-1">
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setEditAlasan(alasan);
												setEditOpen(true);
											}}
										>
											<PencilIcon className="size-4" />
										</Button>
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setDeleteAlasan(alasan);
												setDeleteOpen(true);
											}}
										>
											<TrashIcon className="size-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					{editAlasan && (
						<EditAlasanForm
							alasan={editAlasan}
							onSuccess={() => {
								setEditOpen(false);
								setEditAlasan(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanAlasan", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteAlasan && (
						<DeleteAlasanConfirm
							alasan={deleteAlasan}
							onSuccess={() => {
								setDeleteOpen(false);
								setDeleteAlasan(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanAlasan", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function CreateAlasanForm({
	perusahaanId,
	onSuccess,
}: {
	perusahaanId: string;
	onSuccess: () => void;
}) {
	const form = useForm({
		defaultValues: { alasan: "", sortOrder: 0 },
		onSubmit: async ({ value }) => {
			try {
				await api.perusahaanAlasan.create({
					perusahaanId,
					alasan: value.alasan,
					sortOrder: value.sortOrder,
				});
				toast.success("Reason added");
				onSuccess();
			} catch {
				toast.error("Failed to add reason");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<DialogHeader>
				<DialogTitle>Add Reason</DialogTitle>
				<DialogDescription>
					Add a new reason for "Kenapa Memilih Kami" section.
				</DialogDescription>
			</DialogHeader>

			<form.Field name="alasan">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Title</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="sortOrder">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Urutan</Label>
						<Input
							id={field.name}
							name={field.name}
							type="number"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) =>
								field.handleChange(Number.parseInt(e.target.value) || 0)
							}
						/>
					</div>
				)}
			</form.Field>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Add
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function EditAlasanForm({
	alasan,
	onSuccess,
}: {
	alasan: PerusahaanAlasan;
	onSuccess: () => void;
}) {
	const form = useForm({
		defaultValues: {
			alasan: alasan.alasan,
			sortOrder: alasan.sortOrder,
		},
		onSubmit: async ({ value }) => {
			try {
				await api.perusahaanAlasan.update(alasan.id, {
					alasan: value.alasan,
					sortOrder: value.sortOrder,
				});
				toast.success("Reason updated");
				onSuccess();
			} catch {
				toast.error("Failed to update reason");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<DialogHeader>
				<DialogTitle>Edit</DialogTitle>
			</DialogHeader>

			<form.Field name="alasan">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Title</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="sortOrder">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Urutan</Label>
						<Input
							id={field.name}
							name={field.name}
							type="number"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) =>
								field.handleChange(Number.parseInt(e.target.value) || 0)
							}
						/>
					</div>
				)}
			</form.Field>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Save
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function DeleteAlasanConfirm({
	alasan,
	onSuccess,
}: {
	alasan: PerusahaanAlasan;
	onSuccess: () => void;
}) {
	const deleteMutation = useMutation({
		mutationFn: () => api.perusahaanAlasan.delete(alasan.id),
		onSuccess: () => {
			toast.success("Reason deleted");
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete reason");
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Reason</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete this reason? This action cannot be
					undone.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<Button
					variant="destructive"
					onClick={() => deleteMutation.mutate()}
					disabled={deleteMutation.isPending}
				>
					Delete
				</Button>
			</DialogFooter>
		</>
	);
}

function LayananTab({ perusahaan }: { perusahaan: Perusahaan }) {
	const queryClient = useQueryClient();

	const { data: layananList, isLoading } = useQuery({
		queryKey: ["perusahaanLayanan", perusahaan.id],
		queryFn: () =>
			api.perusahaanLayanan
				.list(perusahaan.id)
				.then((r) => r.data as PerusahaanLayanan[]),
		staleTime: 0,
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editLayanan, setEditLayanan] = useState<PerusahaanLayanan | null>(
		null,
	);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteLayanan, setDeleteLayanan] = useState<PerusahaanLayanan | null>(
		null,
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold">Layanan</h2>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<PlusIcon data-icon="inline-start" />
						Add Service
					</DialogTrigger>
					<DialogContent>
						<CreateLayananForm
							perusahaanId={perusahaan.id}
							onSuccess={() => {
								setCreateOpen(false);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanLayanan", perusahaan.id],
								});
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			{isLoading ? (
				<p className="text-muted-foreground">Loading...</p>
			) : !layananList || layananList.length === 0 ? (
				<Card>
					<CardContent className="p-6">
						<p className="text-center text-muted-foreground">
							No services yet. Add one to get started.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-2 gap-4">
					{layananList.map((layanan) => (
						<Card key={layanan.id}>
							<CardContent className="p-4">
								<div className="flex items-start gap-3">
									{layanan.image && (
										<img
											src={layanan.image}
											alt={layanan.namaLayanan}
											className="size-16 rounded object-cover"
										/>
									)}
									<div className="flex-1">
										<p className="font-medium">{layanan.namaLayanan}</p>
										<p className="text-sm text-muted-foreground">
											{layanan.title}
										</p>
										{layanan.subtitle && (
											<p className="text-xs text-muted-foreground">
												{layanan.subtitle}
											</p>
										)}
									</div>
									<div className="flex gap-1">
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setEditLayanan(layanan);
												setEditOpen(true);
											}}
										>
											<PencilIcon className="size-4" />
										</Button>
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setDeleteLayanan(layanan);
												setDeleteOpen(true);
											}}
										>
											<TrashIcon className="size-4" />
										</Button>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			)}

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					{editLayanan && (
						<EditLayananForm
							layanan={editLayanan}
							onSuccess={() => {
								setEditOpen(false);
								setEditLayanan(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanLayanan", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteLayanan && (
						<DeleteLayananConfirm
							layanan={deleteLayanan}
							onSuccess={() => {
								setDeleteOpen(false);
								setDeleteLayanan(null);
								queryClient.invalidateQueries({
									queryKey: ["perusahaanLayanan", perusahaan.id],
								});
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function CreateLayananForm({
	perusahaanId,
	onSuccess,
}: {
	perusahaanId: string;
	onSuccess: () => void;
}) {
	const [imageUrl, setImageUrl] = useState("");
	const form = useForm({
		defaultValues: { title: "", subtitle: "", namaLayanan: "" },
		onSubmit: async ({ value }) => {
			try {
				await api.perusahaanLayanan.create({
					perusahaanId,
					title: value.title,
					subtitle: value.subtitle || undefined,
					image: imageUrl || undefined,
					namaLayanan: value.namaLayanan,
				});
				toast.success("Service added");
				onSuccess();
			} catch {
				toast.error("Failed to add service");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<DialogHeader>
				<DialogTitle>Add Service</DialogTitle>
				<DialogDescription>
					Add a new service to the company profile.
				</DialogDescription>
			</DialogHeader>

			<form.Field name="title">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Title</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="subtitle">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Subtitle</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="namaLayanan">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Service Name</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<div className="flex flex-col gap-2">
				<Label>Image (optional)</Label>
				<ImageUpload
					value={imageUrl}
					onChange={setImageUrl}
					entity="perusahaan-layanan"
				/>
			</div>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Add
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function EditLayananForm({
	layanan,
	onSuccess,
}: {
	layanan: PerusahaanLayanan;
	onSuccess: () => void;
}) {
	const [imageUrl, setImageUrl] = useState(layanan.image || "");
	const form = useForm({
		defaultValues: {
			title: layanan.title,
			subtitle: layanan.subtitle || "",
			namaLayanan: layanan.namaLayanan,
		},
		onSubmit: async ({ value }) => {
			try {
				await api.perusahaanLayanan.update(layanan.id, {
					title: value.title,
					subtitle: value.subtitle || undefined,
					image: imageUrl || undefined,
					namaLayanan: value.namaLayanan,
				});
				toast.success("Service updated");
				onSuccess();
			} catch {
				toast.error("Failed to update service");
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<DialogHeader>
				<DialogTitle>Edit Service</DialogTitle>
				<DialogDescription>Update the service details.</DialogDescription>
			</DialogHeader>

			<form.Field name="title">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Title</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="subtitle">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Subtitle</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<form.Field name="namaLayanan">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Service Name</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>
			<div className="flex flex-col gap-2">
				<Label>Image</Label>
				<ImageUpload
					value={imageUrl}
					onChange={setImageUrl}
					entity="perusahaan-layanan"
				/>
			</div>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Save
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function DeleteLayananConfirm({
	layanan,
	onSuccess,
}: {
	layanan: PerusahaanLayanan;
	onSuccess: () => void;
}) {
	const deleteMutation = useMutation({
		mutationFn: () => api.perusahaanLayanan.delete(layanan.id),
		onSuccess: () => {
			toast.success("Service deleted");
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete service");
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Service</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete "{layanan.namaLayanan}"? This action
					cannot be undone.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<Button
					variant="destructive"
					onClick={() => deleteMutation.mutate()}
					disabled={deleteMutation.isPending}
				>
					Delete
				</Button>
			</DialogFooter>
		</>
	);
}

function PerusahaanPage() {
	const { nama } = Route.useParams();

	const { data: perusahaanData, isLoading } = useQuery({
		queryKey: ["perusahaan", nama],
		queryFn: () => api.perusahaan.get(nama).then((r) => r.data as Perusahaan),
		staleTime: 0,
	});

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold capitalize">{nama}</h1>
						<p className="text-muted-foreground">Company Profile</p>
					</div>
				</div>
				<Card>
					<CardContent className="p-6">
						<p className="text-muted-foreground">Loading...</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!perusahaanData) {
		return (
			<div className="flex flex-col gap-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold capitalize">{nama}</h1>
						<p className="text-muted-foreground">Company Profile</p>
					</div>
				</div>
				<Card>
					<CardContent className="p-6">
						<p className="text-muted-foreground">Company not found</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold capitalize">{nama}</h1>
					<p className="text-muted-foreground">Company Profile</p>
				</div>
			</div>

			<Tabs defaultValue="images">
				<TabsList>
					<TabsTrigger value="images">Images</TabsTrigger>
					<TabsTrigger value="tags">Tags</TabsTrigger>
					<TabsTrigger value="alasan">Why Us</TabsTrigger>
					<TabsTrigger value="layanan">Layanan</TabsTrigger>
				</TabsList>

				<TabsContent value="images">
					<ImagesTab perusahaan={perusahaanData} />
				</TabsContent>
				<TabsContent value="tags">
					<TagsTab perusahaan={perusahaanData} />
				</TabsContent>
				<TabsContent value="alasan">
					<AlasanTab perusahaan={perusahaanData} />
				</TabsContent>
				<TabsContent value="layanan">
					<LayananTab perusahaan={perusahaanData} />
				</TabsContent>
			</Tabs>
		</div>
	);
}

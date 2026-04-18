import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { BriefcaseIcon, PencilIcon, TrashIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@adinko/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@adinko/ui/components/card";
import { Input } from "@adinko/ui/components/input";
import { Label } from "@adinko/ui/components/label";
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

import { api } from "@/lib/api";

export const Route = createFileRoute("/_protected/knbnw3/layanan")({
	component: LayananPage,
});

type LayananImage = {
	id: string;
	image: string;
};

type Layanan = {
	id: string;
	title: string;
	images: LayananImage[];
};

function ImageUploader({
	values,
	onChange,
	onUploadingChange,
}: {
	values: { id: string; image: string }[];
	onChange: (images: { id: string; image: string }[]) => void;
	onUploadingChange?: (uploading: boolean) => void;
}) {
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const inputId = `file-upload-layanan-${Math.random().toString(36).slice(2)}`;

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		setProgress(0);
		onUploadingChange?.(true);

		try {
			const url = await api.upload.uploadFile(file, "layanan", (p) => {
				setProgress(p);
			});
			onChange([...values, { id: Math.random().toString(36).slice(2), image: url }]);
			toast.success("Image uploaded");
		} catch {
			toast.error("Failed to upload image");
		} finally {
			setUploading(false);
			onUploadingChange?.(false);
		}
	};

	const removeImage = (id: string) => {
		onChange(values.filter((v) => v.id !== id));
	};

	return (
		<div className="flex flex-col gap-3">
			<Label>Images</Label>
			<div className="flex flex-wrap gap-3">
				{values.map((v) => (
					<div key={v.id} className="relative group">
						<img
							src={v.image}
							alt=""
							className="size-16 object-cover border rounded-md"
						/>
						<button
							type="button"
							onClick={() => removeImage(v.id)}
							className="absolute -top-2 -right-2 size-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<XIcon className="size-3" />
						</button>
					</div>
				))}
				<div>
					<input
						type="file"
						id={inputId}
						accept="image/*"
						onChange={handleFileChange}
						className="hidden"
					/>
					<label
						htmlFor={inputId}
						className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground size-16 flex-col gap-1"
					>
						{uploading ? (
							<span className="text-xs">{progress}%</span>
						) : (
							<>
								<PlusIcon className="size-4" />
								<span className="text-xs">Add</span>
							</>
						)}
					</label>
				</div>
			</div>
		</div>
	);
}

function LayananPage() {
	const { data: layananList } = useQuery({
		queryKey: ["layanan"],
		queryFn: () => api.layanan.list().then((r) => r.data as Layanan[]),
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editLayanan, setEditLayanan] = useState<Layanan | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteLayanan, setDeleteLayanan] = useState<Layanan | null>(null);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Layanan</h1>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<BriefcaseIcon data-icon="inline-start" />
						Create
					</DialogTrigger>
					<DialogContent>
						<CreateForm onSuccess={() => setCreateOpen(false)} />
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Semua Layanan</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						{!layananList || layananList.length === 0 ? (
							<p className="py-8 text-center text-muted-foreground">
								No services yet. Create one to get started.
							</p>
						) : (
							layananList.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between border p-3"
								>
									<div className="flex items-center gap-3">
										<div className="flex items-center gap-2">
											{item.images && item.images.length > 0 ? (
												<>
													{item.images.slice(0, 3).map((img) => (
														<img
															key={img.id}
															src={img.image}
															alt=""
															className="size-16 rounded object-cover border"
														/>
													))}
													{item.images.length > 3 && (
														<div className="size-16 rounded object-cover border bg-muted flex items-center justify-center text-xs text-muted-foreground">
															+{item.images.length - 3}
														</div>
													)}
												</>
											) : (
												<div className="size-16 rounded object-cover border bg-muted flex items-center justify-center text-xs text-muted-foreground">
													No image
												</div>
											)}
										</div>
										<span>{item.title}</span>
									</div>
									<div className="flex gap-2">
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setEditLayanan(item);
												setEditOpen(true);
											}}
										>
											<PencilIcon className="size-4" />
										</Button>
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setDeleteLayanan(item);
												setDeleteOpen(true);
											}}
										>
											<TrashIcon className="size-4" />
										</Button>
									</div>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					{editLayanan && (
						<EditForm
							layanan={editLayanan}
							onSuccess={() => {
								setEditOpen(false);
								setEditLayanan(null);
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteLayanan && (
						<DeleteConfirm
							layanan={deleteLayanan}
							onSuccess={() => {
								setDeleteOpen(false);
								setDeleteLayanan(null);
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function CreateForm({ onSuccess }: { onSuccess: () => void }) {
	const queryClient = useQueryClient();
	const [images, setImages] = useState<{ id: string; image: string }[]>([]);
	const [uploading, setUploading] = useState(false);
	const form = useForm({
		defaultValues: {
			title: "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.layanan.create({
					title: value.title,
					images: images.map((i) => i.image),
				});
				toast.success("Layanan created");
				queryClient.invalidateQueries({ queryKey: ["layanan"] });
				onSuccess();
			} catch {
				toast.error("Failed to create layanan");
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
				<DialogTitle>Buat Layanan</DialogTitle>
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
							aria-invalid={field.state.meta.errors.length > 0}
						/>
					</div>
				)}
			</form.Field>

			<ImageUploader
				values={images}
				onChange={setImages}
				onUploadingChange={setUploading}
			/>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit || uploading}>
							Create
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function EditForm({
	layanan,
	onSuccess,
}: {
	layanan: Layanan;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const [images, setImages] = useState<{ id: string; image: string }[]>(
		layanan.images || [],
	);
	const [uploading, setUploading] = useState(false);
	const form = useForm({
		defaultValues: {
			title: layanan.title,
		},
		onSubmit: async ({ value }) => {
			try {
				await api.layanan.update(layanan.id, {
					title: value.title,
					images: images.map((i) => i.image),
				});
				toast.success("Layanan updated");
				queryClient.invalidateQueries({ queryKey: ["layanan"] });
				onSuccess();
			} catch {
				toast.error("Failed to update layanan");
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
				<DialogTitle>Edit Layanan</DialogTitle>
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
							aria-invalid={field.state.meta.errors.length > 0}
						/>
					</div>
				)}
			</form.Field>

			<ImageUploader
				values={images}
				onChange={setImages}
				onUploadingChange={setUploading}
			/>

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit || uploading}>
							Save
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function DeleteConfirm({
	layanan,
	onSuccess,
}: {
	layanan: Layanan;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: () => api.layanan.delete(layanan.id),
		onSuccess: () => {
			toast.success("Layanan deleted");
			queryClient.invalidateQueries({ queryKey: ["layanan"] });
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete layanan");
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Layanan</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete "{layanan.title}"? This action cannot
					be undone.
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
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { BriefcaseIcon, PencilIcon, TrashIcon } from "lucide-react";
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

export const Route = createFileRoute("/_protected/admin/layanan")({
	component: LayananPage,
});

type Layanan = {
	id: string;
	title: string;
	image: string | null;
};

function ImageUpload({
	value,
	onChange,
}: {
	value: string;
	onChange: (url: string) => void;
}) {
	const [preview, setPreview] = useState<string | null>(value || null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setPreview(URL.createObjectURL(file));
		setUploading(true);

		try {
			const url = await api.upload.uploadFile(file, "layanan");
			onChange(url);
			toast.success("Image uploaded");
		} catch {
			toast.error("Failed to upload image");
			setPreview(null);
		} finally {
			setUploading(false);
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<Label>Image</Label>
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
			{value && !preview && (
				<img
					src={value}
					alt="Current"
					className="size-24 object-cover border"
				/>
			)}
		</div>
	)
}

function LayananPage() {
	const { data: layananList } = useQuery({
		queryKey: ["layanan"],
		queryFn: () => api.layanan.list().then((r) => r.data as Layanan[]),
	})

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
					<p className="text-muted-foreground">Manage your services</p>
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
					<CardTitle>All Services</CardTitle>
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
										{item.image && (
											<img
												src={item.image}
												alt={item.title}
												className="size-16 rounded object-cover border"
											/>
										)}
										<span>{item.title}</span>
									</div>
									<div className="flex gap-2">
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setEditLayanan(item)
												setEditOpen(true)
											}}
										>
											<PencilIcon className="size-4" />
										</Button>
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setDeleteLayanan(item)
												setDeleteOpen(true)
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
								setEditOpen(false)
								setEditLayanan(null)
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
								setDeleteOpen(false)
								setDeleteLayanan(null)
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

function CreateForm({ onSuccess }: { onSuccess: () => void }) {
	const queryClient = useQueryClient();
	const [imageUrl, setImageUrl] = useState("");
	const form = useForm({
		defaultValues: {
			title: "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.layanan.create({
					title: value.title,
					image: imageUrl || undefined,
				})
				toast.success("Layanan created");
				queryClient.invalidateQueries({ queryKey: ["layanan"] });
				onSuccess()
			} catch {
				toast.error("Failed to create layanan");
			}
		},
	})

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
				<DialogTitle>Create Layanan</DialogTitle>
				<DialogDescription>Add a new service</DialogDescription>
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

			<ImageUpload value={imageUrl} onChange={setImageUrl} />

			<DialogFooter>
				<DialogClose render={<Button variant="outline">Cancel</Button>}>
					Cancel
				</DialogClose>
				<form.Subscribe selector={(state) => state.canSubmit}>
					{(canSubmit) => (
						<Button type="submit" disabled={!canSubmit}>
							Create
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	)
}

function EditForm({
	layanan,
	onSuccess,
}: {
	layanan: Layanan;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const [imageUrl, setImageUrl] = useState(layanan.image || "");
	const form = useForm({
		defaultValues: {
			title: layanan.title,
		},
		onSubmit: async ({ value }) => {
			try {
				await api.layanan.update(layanan.id, {
					title: value.title,
					image: imageUrl || undefined,
				})
				toast.success("Layanan updated");
				queryClient.invalidateQueries({ queryKey: ["layanan"] });
				onSuccess()
			} catch {
				toast.error("Failed to update layanan");
			}
		},
	})

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
				<DialogDescription>Update service</DialogDescription>
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

			<ImageUpload value={imageUrl} onChange={setImageUrl} />

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
	)
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
	})

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
	)
}

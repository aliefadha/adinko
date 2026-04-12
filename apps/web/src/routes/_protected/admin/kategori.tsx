import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

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

export const Route = createFileRoute("/_protected/admin/kategori")({
	component: KategoriPage,
});

type Kategori = {
	id: string;
	nama: string;
	createdAt: string;
};

function KategoriPage() {
	const { data: kategoriList } = useQuery({
		queryKey: ["kategori"],
		queryFn: () => api.kategori.list().then((r) => r.data as Kategori[]),
	})

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editKategori, setEditKategori] = useState<Kategori | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteKategori, setDeleteKategori] = useState<Kategori | null>(null);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Kategori</h1>
					<p className="text-muted-foreground">Manage your categories</p>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<PlusIcon data-icon="inline-start" />
						Create
					</DialogTrigger>
					<DialogContent>
						<CreateForm onSuccess={() => setCreateOpen(false)} />
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>All Categories</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						{!kategoriList || kategoriList.length === 0 ? (
							<p className="py-8 text-center text-muted-foreground">
								No categories yet. Create one to get started.
							</p>
						) : (
							kategoriList.map((kategori) => (
								<div
									key={kategori.id}
									className="flex items-center justify-between border p-3"
								>
									<span>{kategori.nama}</span>
									<div className="flex gap-2">
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setEditKategori(kategori)
												setEditOpen(true)
											}}
										>
											<PencilIcon className="size-4" />
										</Button>
										<Button
											size="icon-sm"
											variant="ghost"
											onClick={() => {
												setDeleteKategori(kategori)
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
					{editKategori && (
						<EditForm
							kategori={editKategori}
							onSuccess={() => {
								setEditOpen(false)
								setEditKategori(null)
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteKategori && (
						<DeleteConfirm
							kategori={deleteKategori}
							onSuccess={() => {
								setDeleteOpen(false)
								setDeleteKategori(null)
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
	const form = useForm({
		defaultValues: {
			nama: "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.kategori.create({ nama: value.nama });
				toast.success("Kategori created");
				queryClient.invalidateQueries({ queryKey: ["kategori"] });
				onSuccess()
			} catch {
				toast.error("Failed to create kategori");
			}
		},
		validators: {
			onSubmit: z.object({
				nama: z.string().min(1, "Nama is required"),
			}),
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
				<DialogTitle>Create Kategori</DialogTitle>
				<DialogDescription>Add a new category</DialogDescription>
			</DialogHeader>

			<form.Field name="nama">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Nama</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							aria-invalid={field.state.meta.errors.length > 0}
						/>
						{field.state.meta.errors.length > 0 && (
							<p className="text-xs text-destructive">
								{field.state.meta.errors[0]?.message}
							</p>
						)}
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
							Create
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	)
}

function EditForm({
	kategori,
	onSuccess,
}: {
	kategori: Kategori;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const form = useForm({
		defaultValues: {
			nama: kategori.nama,
		},
		onSubmit: async ({ value }) => {
			try {
				await api.kategori.update(kategori.id, { nama: value.nama });
				toast.success("Kategori updated");
				queryClient.invalidateQueries({ queryKey: ["kategori"] });
				onSuccess()
			} catch {
				toast.error("Failed to update kategori");
			}
		},
		validators: {
			onSubmit: z.object({
				nama: z.string().min(1, "Nama is required"),
			}),
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
				<DialogTitle>Edit Kategori</DialogTitle>
				<DialogDescription>Update category name</DialogDescription>
			</DialogHeader>

			<form.Field name="nama">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Nama</Label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							aria-invalid={field.state.meta.errors.length > 0}
						/>
						{field.state.meta.errors.length > 0 && (
							<p className="text-xs text-destructive">
								{field.state.meta.errors[0]?.message}
							</p>
						)}
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
	)
}

function DeleteConfirm({
	kategori,
	onSuccess,
}: {
	kategori: Kategori;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: () => api.kategori.delete(kategori.id),
		onSuccess: () => {
			toast.success("Kategori deleted");
			queryClient.invalidateQueries({ queryKey: ["kategori"] });
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete kategori");
		},
	})

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Kategori</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete "{kategori.nama}"? This action cannot
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

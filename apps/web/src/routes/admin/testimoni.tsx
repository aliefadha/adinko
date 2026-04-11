import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { MessageSquareIcon, PencilIcon, TrashIcon } from "lucide-react";
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

export const Route = createFileRoute("/admin/testimoni")({
	component: TestimoniPage,
});

type Testimoni = {
	id: string;
	kategoriId: string;
	nama: string;
	testimoni: string;
	image: string | null;
	createdAt: string;
};

type Kategori = {
	id: string;
	nama: string;
};

function TestimoniPage() {
	const { data: testimoniList } = useQuery({
		queryKey: ["testimoni"],
		queryFn: () => api.testimoni.list().then((r) => r.data as Testimoni[]),
	});

	const { data: kategoriList } = useQuery({
		queryKey: ["kategori"],
		queryFn: () => api.kategori.list().then((r) => r.data as Kategori[]),
	});

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editTestimoni, setEditTestimoni] = useState<Testimoni | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteTestimoni, setDeleteTestimoni] = useState<Testimoni | null>(
		null,
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Testimoni</h1>
					<p className="text-muted-foreground">Manage your testimonials</p>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<MessageSquareIcon data-icon="inline-start" />
						Create
					</DialogTrigger>
					<DialogContent>
						<CreateForm
							kategoriList={kategoriList || []}
							onSuccess={() => setCreateOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>All Testimonials</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						{!testimoniList || testimoniList.length === 0 ? (
							<p className="py-8 text-center text-muted-foreground">
								No testimonials yet. Create one to get started.
							</p>
						) : (
							testimoniList.map((item) => {
								const kategori = kategoriList?.find(
									(k) => k.id === item.kategoriId,
								);
								return (
									<div
										key={item.id}
										className="flex items-start justify-between border p-3"
									>
										<div className="flex flex-col gap-1">
											<span className="font-medium">{item.nama}</span>
											<span className="text-xs text-muted-foreground">
												{kategori?.nama || "Unknown"}
											</span>
											<p className="text-sm">{item.testimoni}</p>
										</div>
										<div className="flex gap-2">
											<Button
												size="icon-sm"
												variant="ghost"
												onClick={() => {
													setEditTestimoni(item);
													setEditOpen(true);
												}}
											>
												<PencilIcon className="size-4" />
											</Button>
											<Button
												size="icon-sm"
												variant="ghost"
												onClick={() => {
													setDeleteTestimoni(item);
													setDeleteOpen(true);
												}}
											>
												<TrashIcon className="size-4" />
											</Button>
										</div>
									</div>
								);
							})
						)}
					</div>
				</CardContent>
			</Card>

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					{editTestimoni && (
						<EditForm
							testimoni={editTestimoni}
							kategoriList={kategoriList || []}
							onSuccess={() => {
								setEditOpen(false);
								setEditTestimoni(null);
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deleteTestimoni && (
						<DeleteConfirm
							testimoni={deleteTestimoni}
							onSuccess={() => {
								setDeleteOpen(false);
								setDeleteTestimoni(null);
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	);
}

function CreateForm({
	kategoriList,
	onSuccess,
}: {
	kategoriList: Kategori[];
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const form = useForm({
		defaultValues: {
			kategoriId: "",
			nama: "",
			testimoni: "",
			image: "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.testimoni.create({
					kategoriId: value.kategoriId,
					nama: value.nama,
					testimoni: value.testimoni,
					image: value.image || undefined,
				});
				toast.success("Testimoni created");
				queryClient.invalidateQueries({ queryKey: ["testimoni"] });
				onSuccess();
			} catch {
				toast.error("Failed to create testimoni");
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
				<DialogTitle>Create Testimoni</DialogTitle>
				<DialogDescription>Add a new testimonial</DialogDescription>
			</DialogHeader>

			<form.Field name="kategoriId">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Kategori</Label>
						<select
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs"
						>
							<option value="">Select Kategori</option>
							{kategoriList.map((k) => (
								<option key={k.id} value={k.id}>
									{k.nama}
								</option>
							))}
						</select>
					</div>
				)}
			</form.Field>

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
					</div>
				)}
			</form.Field>

			<form.Field name="testimoni">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Testimoni</Label>
						<textarea
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className="min-h-24 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs"
							aria-invalid={field.state.meta.errors.length > 0}
						/>
					</div>
				)}
			</form.Field>

			<form.Field name="image">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Image URL</Label>
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
							Create
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	);
}

function EditForm({
	testimoni,
	kategoriList,
	onSuccess,
}: {
	testimoni: Testimoni;
	kategoriList: Kategori[];
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const form = useForm({
		defaultValues: {
			kategoriId: testimoni.kategoriId,
			nama: testimoni.nama,
			testimoni: testimoni.testimoni,
			image: testimoni.image || "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.testimoni.update(testimoni.id, {
					kategoriId: value.kategoriId,
					nama: value.nama,
					testimoni: value.testimoni,
					image: value.image || undefined,
				});
				toast.success("Testimoni updated");
				queryClient.invalidateQueries({ queryKey: ["testimoni"] });
				onSuccess();
			} catch {
				toast.error("Failed to update testimoni");
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
				<DialogTitle>Edit Testimoni</DialogTitle>
				<DialogDescription>Update testimonial</DialogDescription>
			</DialogHeader>

			<form.Field name="kategoriId">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Kategori</Label>
						<select
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs"
						>
							<option value="">Select Kategori</option>
							{kategoriList.map((k) => (
								<option key={k.id} value={k.id}>
									{k.nama}
								</option>
							))}
						</select>
					</div>
				)}
			</form.Field>

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
					</div>
				)}
			</form.Field>

			<form.Field name="testimoni">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Testimoni</Label>
						<textarea
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							className="min-h-24 w-full rounded-none border border-input bg-transparent px-2.5 py-1 text-xs"
							aria-invalid={field.state.meta.errors.length > 0}
						/>
					</div>
				)}
			</form.Field>

			<form.Field name="image">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Image URL</Label>
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

function DeleteConfirm({
	testimoni,
	onSuccess,
}: {
	testimoni: Testimoni;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: () => api.testimoni.delete(testimoni.id),
		onSuccess: () => {
			toast.success("Testimoni deleted");
			queryClient.invalidateQueries({ queryKey: ["testimoni"] });
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete testimoni");
		},
	});

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Testimoni</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete testimony from "{testimoni.nama}"?
					This action cannot be undone.
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

import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { ImageIcon, PencilIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
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

export const Route = createFileRoute("/_protected/knbnw3/portfolio")({
	component: PortfolioPage,
});

type PortfolioImage = {
	id: string;
	image: string;
};

type Portfolio = {
	id: string;
	kategoriId: string;
	title: string;
	subtitle: string | null;
	image: string | null;
	alamat: string | null;
	tahun: string | null;
	createdAt: string;
	images: PortfolioImage[];
};

type Kategori = {
	id: string;
	nama: string;
};

function MultiImageUpload({
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
	const inputId = `file-upload-portfolio-multi-${Math.random().toString(36).slice(2)}`;

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		setProgress(0);
		onUploadingChange?.(true);

		try {
			const url = await api.upload.uploadFile(file, "portfolio", (p) => {
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
			<Label>Additional Images</Label>
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

function PortfolioPage() {
	const { data: portfolioList } = useQuery({
		queryKey: ["portfolio"],
		queryFn: () => api.portfolio.list().then((r) => r.data as Portfolio[]),
	})

	const { data: kategoriList } = useQuery({
		queryKey: ["kategori"],
		queryFn: () => api.kategori.list().then((r) => r.data as Kategori[]),
	})

	const [createOpen, setCreateOpen] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [editPortfolio, setEditPortfolio] = useState<Portfolio | null>(null);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deletePortfolio, setDeletePortfolio] = useState<Portfolio | null>(
		null,
	)

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Portfolio</h1>
				</div>
				<Dialog open={createOpen} onOpenChange={setCreateOpen}>
					<DialogTrigger render={<Button>Create</Button>}>
						<ImageIcon data-icon="inline-start" />
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
					<CardTitle>Semua Portfolio</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-2">
						{!portfolioList || portfolioList.length === 0 ? (
							<p className="py-8 text-center text-muted-foreground">
								No portfolio entries yet. Create one to get started.
							</p>
						) : (
							portfolioList.map((item) => {
								const kategori = kategoriList?.find(
									(k) => k.id === item.kategoriId,
								)
								return (
									<div
										key={item.id}
										className="flex items-center justify-between border p-3"
									>
										<div className="flex items-center gap-3">
											{item.images && item.images.length > 0 && (
												<img
													src={item.images[0].image}
													alt={item.title}
													className="size-16 rounded object-cover border"
												/>
											)}
											<div className="flex flex-col gap-1">
												<span className="font-medium">{item.title}</span>
												<span className="text-xs text-muted-foreground">
													{kategori?.nama || "Unknown"} •{" "}
													{item.alamat || "No alamat"} •{" "}
													{item.tahun || "No tahun"}
													{item.images && item.images.length > 1 && (
														<> • {item.images.length} img</>
													)}
												</span>
											</div>
										</div>
										<div className="flex gap-2">
											<Button
												size="icon-sm"
												variant="ghost"
												onClick={() => {
													setEditPortfolio(item)
													setEditOpen(true)
												}}
											>
												<PencilIcon className="size-4" />
											</Button>
											<Button
												size="icon-sm"
												variant="ghost"
												onClick={() => {
													setDeletePortfolio(item)
													setDeleteOpen(true)
												}}
											>
												<TrashIcon className="size-4" />
											</Button>
										</div>
									</div>
								)
							})
						)}
					</div>
				</CardContent>
			</Card>

			<Dialog open={editOpen} onOpenChange={setEditOpen}>
				<DialogContent>
					{editPortfolio && (
						<EditForm
							portfolio={editPortfolio}
							kategoriList={kategoriList || []}
							onSuccess={() => {
								setEditOpen(false)
								setEditPortfolio(null)
							}}
						/>
					)}
				</DialogContent>
			</Dialog>

			<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
				<DialogContent>
					{deletePortfolio && (
						<DeleteConfirm
							portfolio={deletePortfolio}
							onSuccess={() => {
								setDeleteOpen(false)
								setDeletePortfolio(null);
							}}
						/>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

function CreateForm({
	kategoriList,
	onSuccess,
}: {
	kategoriList: Kategori[];
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const [additionalImages, setAdditionalImages] = useState<{ id: string; image: string }[]>([]);
	const [uploading, setUploading] = useState(false);
	const form = useForm({
		defaultValues: {
			kategoriId: "",
			title: "",
			subtitle: "",
			alamat: "",
			tahun: "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.portfolio.create({
					kategoriId: value.kategoriId,
					title: value.title,
					subtitle: value.subtitle || undefined,
					alamat: value.alamat || undefined,
					tahun: value.tahun || undefined,
					images: additionalImages.map((i) => i.image),
				})
				toast.success("Portfolio created");
				queryClient.invalidateQueries({ queryKey: ["portfolio"] });
				onSuccess()
			} catch {
				toast.error("Failed to create portfolio");
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
				<DialogTitle>Create Portfolio</DialogTitle>
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

			<MultiImageUpload
				values={additionalImages}
				onChange={setAdditionalImages}
				onUploadingChange={setUploading}
			/>

			<form.Field name="alamat">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Alamat</Label>
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

			<form.Field name="tahun">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Tahun</Label>
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
						<Button type="submit" disabled={!canSubmit || uploading}>
							Create
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	)
}

function EditForm({
	portfolio,
	kategoriList,
	onSuccess,
}: {
	portfolio: Portfolio;
	kategoriList: Kategori[];
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const [additionalImages, setAdditionalImages] = useState<{ id: string; image: string }[]>(
		portfolio.images || [],
	);
	const [uploading, setUploading] = useState(false);
	const form = useForm({
		defaultValues: {
			kategoriId: portfolio.kategoriId,
			title: portfolio.title,
			subtitle: portfolio.subtitle || "",
			alamat: portfolio.alamat || "",
			tahun: portfolio.tahun || "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.portfolio.update(portfolio.id, {
					kategoriId: value.kategoriId,
					title: value.title,
					subtitle: value.subtitle || undefined,
					alamat: value.alamat || undefined,
					tahun: value.tahun || undefined,
					images: additionalImages.map((i) => i.image),
				})
				toast.success("Portfolio updated");
				queryClient.invalidateQueries({ queryKey: ["portfolio"] });
				onSuccess()
			} catch {
				toast.error("Failed to update portfolio");
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
				<DialogTitle>Edit Portfolio</DialogTitle>
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

			<MultiImageUpload
				values={additionalImages}
				onChange={setAdditionalImages}
				onUploadingChange={setUploading}
			/>

			<form.Field name="alamat">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Alamat</Label>
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

			<form.Field name="tahun">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Tahun</Label>
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
						<Button type="submit" disabled={!canSubmit || uploading}>
							Save
						</Button>
					)}
				</form.Subscribe>
			</DialogFooter>
		</form>
	)
}

function DeleteConfirm({
	portfolio,
	onSuccess,
}: {
	portfolio: Portfolio;
	onSuccess: () => void;
}) {
	const queryClient = useQueryClient();
	const deleteMutation = useMutation({
		mutationFn: () => api.portfolio.delete(portfolio.id),
		onSuccess: () => {
			toast.success("Portfolio deleted");
			queryClient.invalidateQueries({ queryKey: ["portfolio"] });
			onSuccess();
		},
		onError: () => {
			toast.error("Failed to delete portfolio");
		},
	})

	return (
		<>
			<DialogHeader>
				<DialogTitle>Delete Portfolio</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete "{portfolio.title}"? This action
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
	)
}
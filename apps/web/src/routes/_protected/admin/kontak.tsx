import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { MailIcon, MapPinIcon, MessageCircleIcon } from "lucide-react";
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

import { api } from "@/lib/api";

export const Route = createFileRoute("/_protected/admin/kontak")({
	component: KontakPage,
});

type Kontak = {
	id: string;
	alamat: string | null;
	wa: string | null;
	instagram: string | null;
	email: string | null;
};

function KontakPage() {
	const { data: kontakData } = useQuery({
		queryKey: ["kontak"],
		queryFn: () => api.kontak.get().then((r) => r.data as Kontak[]),
	})

	const kontak = kontakData?.[0];

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Kontak</h1>
					<p className="text-muted-foreground">Manage contact information</p>
				</div>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Contact Information</CardTitle>
				</CardHeader>
				<CardContent>
					<EditForm kontak={kontak} />
				</CardContent>
			</Card>

			<div className="grid gap-4">
				<div className="flex items-center gap-3 border p-3">
					<MapPinIcon className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Alamat</p>
						<p>{kontak?.alamat || "-"}</p>
					</div>
				</div>
				<div className="flex items-center gap-3 border p-3">
					<MessageCircleIcon className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">WhatsApp</p>
						<p>{kontak?.wa || "-"}</p>
					</div>
				</div>
				<div className="flex items-center gap-3 border p-3">
					<MessageCircleIcon className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Instagram</p>
						<p>{kontak?.instagram || "-"}</p>
					</div>
				</div>
				<div className="flex items-center gap-3 border p-3">
					<MailIcon className="size-4 text-muted-foreground" />
					<div>
						<p className="text-xs text-muted-foreground">Email</p>
						<p>{kontak?.email || "-"}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

function EditForm({ kontak }: { kontak?: Kontak }) {
	const queryClient = useQueryClient();
	const form = useForm({
		defaultValues: {
			alamat: kontak?.alamat || "",
			wa: kontak?.wa || "",
			instagram: kontak?.instagram || "",
			email: kontak?.email || "",
		},
		onSubmit: async ({ value }) => {
			try {
				await api.kontak.update({
					alamat: value.alamat || undefined,
					wa: value.wa || undefined,
					instagram: value.instagram || undefined,
					email: value.email || undefined,
				})
				toast.success("Kontak updated");
				queryClient.invalidateQueries({ queryKey: ["kontak"] });
			} catch {
				toast.error("Failed to update kontak");
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

			<form.Field name="wa">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>WhatsApp</Label>
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

			<form.Field name="instagram">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Instagram</Label>
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

			<form.Field name="email">
				{(field) => (
					<div className="flex flex-col gap-2">
						<Label htmlFor={field.name}>Email</Label>
						<Input
							id={field.name}
							name={field.name}
							type="email"
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
					</div>
				)}
			</form.Field>

			<form.Subscribe selector={(state) => state.canSubmit}>
				{(canSubmit) => (
					<Button type="submit" disabled={!canSubmit}>
						Save
					</Button>
				)}
			</form.Subscribe>
		</form>
	)
}

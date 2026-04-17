import { Button } from "@adinko/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@adinko/ui/components/card";
import { Input } from "@adinko/ui/components/input";
import { Label } from "@adinko/ui/components/label";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth-client";

import Loader from "./loader";

export default function SignInForm() {
	const navigate = useNavigate({
		from: "/",
	});
	const { isPending } = authClient.useSession();
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.email(
				{
					email: value.email,
					password: value.password,
				},
				{
					onSuccess: () => {
						navigate({
							to: "/knbnw3/kategori",
						});
						toast.success("Sign in successful");
					},
					onError: (error) => {
						toast.error(error.error.message || error.error.statusText);
					},
				},
			);
		},
		validators: {
			onSubmit: z.object({
				email: z.email("Invalid email address"),
				password: z.string().min(8, "Password must be at least 8 characters"),
			}),
		},
	});

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center">
			<Card className="w-full max-w-lg border-0 shadow-xl ring-1 ring-border/50 sm:p-2">
				<CardHeader className="pt-4">
					<CardTitle className="text-center text-xl font-bold tracking-tight">
						Login
					</CardTitle>
				</CardHeader>
				<CardContent className="p-4">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-2"
					>
						<div>
							<form.Field name="email">
								{(field) => (
									<div className="space-y-3">
										<Label htmlFor={field.name} className="text-sm">Email</Label>
										<Input
											id={field.name}
											name={field.name}
											type="email"
											className="h-8 px-2 text-base"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
										{field.state.meta.errors.map((error) => (
											<p key={error?.message} className="text-sm font-medium text-red-500">
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>
						</div>

						<div>
							<form.Field name="password">
								{(field) => (
									<div className="space-y-3">
										<Label htmlFor={field.name} className="text-sm">Password</Label>
										<div className="relative">
											<Input
												id={field.name}
												name={field.name}
												type={showPassword ? "text" : "password"}
												className="h-8 px-2 text-sm"
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
											/>
											<button
												type="button"
												onClick={() => setShowPassword(!showPassword)}
												className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4" />
												) : (
													<Eye className="h-4 w-4" />
												)}
											</button>
										</div>
										{field.state.meta.errors.map((error) => (
											<p key={error?.message} className="text-sm font-medium text-red-500">
												{error?.message}
											</p>
										))}
									</div>
								)}
							</form.Field>
						</div>

						<form.Subscribe
							selector={(state) => ({
								canSubmit: state.canSubmit,
								isSubmitting: state.isSubmitting,
							})}
						>
							{({ canSubmit, isSubmitting }) => (
								<div className="pt-2">
									<Button
										type="submit"
										className="h-10 w-full text-base font-medium"
										disabled={!canSubmit || isSubmitting}
									>
										{isSubmitting ? "Submitting..." : "Sign In"}
									</Button>
								</div>
							)}
						</form.Subscribe>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

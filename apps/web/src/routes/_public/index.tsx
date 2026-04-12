import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
	component: IndexComponent,
});

function IndexComponent() {
	return (
		<div>
			<h1>Hello World</h1>
		</div>
	);
}

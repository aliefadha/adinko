import { getUser } from '@/functions/get-user';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: AuthComponent,
    beforeLoad: async () => {
        const session = await getUser();
        return { session };
    },
    loader: async ({ context }) => {
        if (context.session) {
            throw redirect({
                to: "/admin/kategori",
            });
        }
        return { session: context.session };
    },
})

function AuthComponent() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
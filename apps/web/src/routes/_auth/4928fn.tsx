import SignInForm from '@/components/sign-in-form';
import SignUpForm from '@/components/sign-up-form';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/_auth/4928fn')({
    component: RouteComponent,
})

function RouteComponent() {
    const [showSignUp, setShowSignUp] = useState(false);

    return showSignUp ? (
        <SignUpForm onSwitchToSignIn={() => setShowSignUp(false)} />
    ) : (
        <SignInForm />
    )
}
import Header from "./Header"
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const { user } = useAuth();
    return (
        <>
            <Header />
            <main className="bg-white dark:bg-gray-800">
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
                {JSON.stringify(user)}
            </main>
        </>
    )
}
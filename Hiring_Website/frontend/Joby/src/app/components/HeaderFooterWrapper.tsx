// components/HeaderFooterWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function HeaderFooterWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideHeaderFooter = pathname.startsWith("/EmployerManagement");

    return (
        <>
            {!hideHeaderFooter && <Header />}
            {children}
            {!hideHeaderFooter && <Footer />}
        </>
    );
}

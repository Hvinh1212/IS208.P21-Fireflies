"use client"

import CandidateBoard from "../components/CandidateBoard"
import SideNavbar from "../components/SidebarNav"

export default function EmployerManagement() {
    return (
        <div className="flex bg-gray-100 py-5 px-10 gap-6 ">
            <SideNavbar />
            <main className="flex-1 min-h-screen ">
                <CandidateBoard />
            </main>
        </div>
    );
}

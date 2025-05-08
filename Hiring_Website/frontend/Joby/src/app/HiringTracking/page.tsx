"use client"

import HiringPipeline from "../components/HiringTracking"
import SideNavbar from "../components/SidebarNav"

export default function HiringTracking() {
    return (
        <div className="flex bg-gray-100 py-5 px-10 gap-10 min-h-screen">
            <SideNavbar />
            <div className="flex-1 w-full">
                <HiringPipeline />
            </div>
        </div>
    )
}
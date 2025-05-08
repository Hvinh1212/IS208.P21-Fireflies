'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    MdOutlineSpaceDashboard,
    MdOutlineAnalytics,
    MdOutlineMoreHoriz,
    MdOutlineSettings,
    MdArrowBack,
} from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FaRegComments } from 'react-icons/fa';
import Link from 'next/link';

export default function SideNavbar() {
    return (
        <Disclosure as="nav" className="relative">
            {({ open }) => (
                <>
                    {/* Burger button */}
                    <div className="md:hidden p-4">
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white">
                            <GiHamburgerMenu className="h-6 w-6" />
                        </Disclosure.Button>
                    </div>

                    {/* Sidebar on mobile */}
                    <Disclosure.Panel className="fixed inset-y-0 left-0 z-30 w-60 bg-white p-6 shadow-lg md:hidden transition-transform transform duration-300 ease-in-out">
                        <SidebarContent />
                    </Disclosure.Panel>

                    {/* Sidebar on desktop */}
                    <div className="hidden md:flex flex-col w-60 bg-white p-6 shadow-lg min-h-screen rounded-xl">
                        <SidebarContent />
                    </div>
                </>
            )}
        </Disclosure>
    );
}

function SidebarContent() {
    return (
        <div className="flex flex-col h-full rounded-xl">
            <h1 className="text-xl font-bold text-green-500 mb-6 text-center">HireLab</h1>

            <div className="flex-1 space-y-2">
                {[
                    { icon: CgProfile, label: 'Tin tuyển dụng', link: "/Vacancy" },
                    { icon: FaRegComments, label: 'Theo dõi', link: "/HiringTracking" },
                    { icon: MdOutlineAnalytics, label: 'Phân tích', link: "/analize" },
                    { icon: MdOutlineSpaceDashboard, label: 'Kiểm tra đầu vào', link: "/Testing" },
                ].map((item, idx) => (
                    <SidebarItem key={idx} Icon={item.icon} label={item.label} link={item.link} />
                ))}

                <div className="border-t pt-4 mt-4">
                    {[
                        { icon: MdOutlineSettings, label: 'Cài đặt' },
                        { icon: MdOutlineMoreHoriz, label: 'Xem thêm' },
                    ].map((item, idx) => (
                        <SidebarItem key={idx} Icon={item.icon} label={item.label} />
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t mt-4">
                <SidebarItem Icon={MdArrowBack} label="Trở về" />
            </div>
        </div>
    );
}

function SidebarItem({ Icon, label, link }: { Icon: any; label: string; link?: string }) {
    const pathname = usePathname();
    const isActive = link && pathname.startsWith(link);

    const content = (
        <div
            className={`flex items-center gap-4 p-2 rounded-md cursor-pointer group transition-colors duration-300 
            ${isActive ? 'bg-green-500' : 'hover:bg-green-100'}`
            }
        >
            <Icon className={`text-2xl ${isActive ? 'text-white' : 'text-gray-600'} ${!isActive && 'group-hover:text-green-500'}`} />
            <span className={`text-base font-semibold ${isActive ? 'text-white' : 'text-gray-800'} ${!isActive && 'group-hover:text-green-500'}`}>
                {label}
            </span>
        </div>
    );

    if (link) {
        return (
            <Link href={link}>
                {content}
            </Link>
        );
    }

    return content;
}


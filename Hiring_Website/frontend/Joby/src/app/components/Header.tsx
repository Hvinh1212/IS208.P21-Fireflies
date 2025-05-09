"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";  // Import useRouter
import { toast } from "react-toastify";

import {
    faSearch,
    faBell,
    faCircleUser,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faXTwitter,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

const CandidateHeader = ({ onLogout }: { onLogout: () => void }) => {
    return (
        <header className="bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-yellow-300 text-sm text-center items-center py-2 flex flex-col md:flex-row justify-between px-4 md:px-20">
                <span className="font-semibold">Hotline: +123-456-789</span>
                <div className="space-x-4">
                    <span className="items-center font-semibold">
                        Hãy chia sẻ nhu cầu công việc để nhận gợi ý làm việc tốt nhất
                    </span>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-full cursor-pointer text-xs font-semibold hover:bg-green-700">
                        Cập nhật nhu cầu công việc ≫
                    </button>
                </div>
                <div className="flex space-x-3 mt-2 md:mt-0 text-center justify-center">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto flex flex-row justify-between items-center py-1 px-4 md:px-20">
                <Link href="/">
                    <Image
                        src="/Logo/Logo.png"
                        alt="logo"
                        width={200}
                        height={300}
                        className="object-cover"
                    />
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-gray-700">
                        <li>
                            <Link href="/" className="hover:text-green-500">
                                Việc làm
                            </Link>
                        </li>
                        <li>
                            <Link href="/cv" className="hover:text-green-500">
                                Hồ sơ & CV
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-green-500">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-green-500">
                                Liên hệ
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs" className="hover:text-green-500">
                                Diễn đàn
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-row sm:flex-row space-x-5 text-gray-700">
                    <a href="/noti">
                        <FontAwesomeIcon icon={faBell} className="text-gray-700 hover:text-green-500 text-2xl" />
                    </a>

                    <a href="/account">
                        <FontAwesomeIcon icon={faCircleUser} className="text-gray-700 hover:text-green-500 text-2xl" />
                    </a>
                    <button onClick={onLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-gray-700 hover:text-green-500 text-2xl" />
                    </button>
                </div>
            </div>
        </header>
    );
};

const EmployerHeader = ({ onLogout }: { onLogout: () => void }) => {
    return (
        <header className="bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-yellow-300 text-sm text-center items-center py-2 flex flex-col md:flex-row justify-between px-4 md:px-20">
                <span className="font-semibold">Hotline: +123-456-789</span>
                <div className="space-x-4">
                    <span className="items-center font-semibold">
                        Hãy chia sẻ nhu cầu công việc để nhận gợi ý làm việc tốt nhất
                    </span>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-full cursor-pointer text-xs font-semibold hover:bg-green-700">
                        Cập nhật nhu cầu công việc ≫
                    </button>
                </div>
                <div className="flex space-x-3 mt-2 md:mt-0 text-center justify-center">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto flex flex-row justify-between items-center py-1 px-4 md:px-20">
                <Link href="/">
                    <Image
                        src="/Logo/Logo.png"
                        alt="logo"
                        width={200}
                        height={300}
                        className="object-cover"
                    />
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-gray-700">
                        <li>
                            <Link href="/job" className="hover:text-green-500">
                                Việc làm
                            </Link>
                        </li>
                        <li>
                            <Link href="/cv" className="hover:text-green-500">
                                Hồ sơ & CV
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-green-500">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-green-500">
                                Liên hệ
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs" className="hover:text-green-500">
                                Diễn đàn
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-row sm:flex-row space-x-5 text-gray-700">
                    <div className="relative group hidden sm:block">
                        <button className="px-3 py-2 bg-green-600 text-white rounded-full cursor-pointer text-xs font-semibold hover:bg-green-700">
                            Quản lý tuyển dụng ≫
                        </button>
                    </div>
                    <a href="/noti">
                        <FontAwesomeIcon icon={faBell} className="text-gray-700 hover:text-green-500 text-2xl" />
                    </a>

                    <a href="/account">
                        <FontAwesomeIcon icon={faCircleUser} className="text-gray-700 hover:text-green-500 text-2xl" />
                    </a>
                    <button onClick={onLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-gray-700 hover:text-green-500 text-2xl" />
                    </button>
                </div>
            </div>
        </header>
    );
};

const GuestHeader = ({ onLogout }: { onLogout: () => void }) => {
    return (
        <header className="bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-yellow-300 text-sm text-center items-center py-2 flex flex-col md:flex-row justify-between px-4 md:px-20">
                <span className="font-semibold">Hotline: +123-456-789</span>
                <div className="space-x-4">
                    <span className="items-center font-semibold">
                        Hãy chia sẻ nhu cầu công việc để nhận gợi ý làm việc tốt nhất
                    </span>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-full cursor-pointer text-xs font-semibold">
                        Cập nhật nhu cầu công việc ≫
                    </button>
                </div>
                <div className="flex space-x-3 mt-2 md:mt-0 text-center justify-center">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container mx-auto flex flex-row justify-between items-center py-1 px-4 md:px-20">
                <Link href="/">
                    <Image
                        src="/Logo/Logo.png"
                        alt="logo"
                        width={200}
                        height={300}
                        className="object-cover"
                    />
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-gray-700">
                        <li>
                            <Link href="/job" className="hover:text-green-500">
                                Việc làm
                            </Link>
                        </li>
                        <li>
                            <Link href="/cv" className="hover:text-green-500">
                                Hồ sơ & CV
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-green-500">
                                Giới thiệu
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-green-500">
                                Liên hệ
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs" className="hover:text-green-500">
                                Diễn đàn
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex flex-row sm:flex-row space-x-5 text-gray-700">
                    <button className="px-3 py-2 bg-white text-green-500 rounded-md cursor-pointer text-sm font-semibold border border-green-500 hover:bg-green-50">
                        <Link href="/Login">Đăng nhập</Link>
                    </button>
                    <button className="px-3 py-2 bg-green-600 text-white rounded-md cursor-pointer text-sm font-semibold hover:bg-green-700">
                        <Link href="/SignUp">Đăng ký</Link>
                    </button>
                </div>
            </div>
        </header>
    );
};

const Header = () => {
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    const checkAndSetRole = () => {
        const storedRole = localStorage.getItem("permission");
        if (storedRole) {
            try {
                const parsedRole = JSON.parse(storedRole);
                setRole(parsedRole);
            } catch (error) {
                console.error("Failed to parse permission", error);
                setRole(null);
            }
        } else {
            setRole(null);
        }
    };

    useEffect(() => {
        checkAndSetRole();

        const handleStorageChange = () => {
            checkAndSetRole();
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setRole(null);
        toast.success('Đăng xuất thành công!');
        router.push("/Login");
    };

    if (role === "employer") return <EmployerHeader onLogout={handleLogout} />;
    if (role === "candidate") return <CandidateHeader onLogout={handleLogout} />;
    return <GuestHeader onLogout={handleLogout} />;
};

export default Header;

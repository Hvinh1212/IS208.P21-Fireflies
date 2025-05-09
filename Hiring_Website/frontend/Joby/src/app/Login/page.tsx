'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/Logo/Logo.jpg";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleClick = () => {
        if (!userName) {
            toast.warning('Vui lòng nhập tên đăng nhập!');
            return;
        }
        if (!password) {
            toast.warning('Vui lòng nhập mật khẩu!');
            return;
        }

        axios.post(`http://localhost:5000/login`, {
            user_login_name: userName,
            user_password: password
        }).then((res) => {
            if (res.data.success === false) {
                localStorage.clear();
                toast.error('Sai tên đăng nhập hoặc mật khẩu!');
            } else {
                toast.success('Đăng nhập thành công!');
                localStorage.setItem('user_id', res.data.user_id);
                localStorage.setItem('permission', JSON.stringify(res.data.permission));
                localStorage.setItem('role_id', JSON.stringify(res.data.role_id));

                window.dispatchEvent(new Event('storage'));

                window.location.href = '/';
            }
        }).catch((err) => {
            console.error(err);
            toast.error('Đã xảy ra lỗi trong quá trình đăng nhập.');
        });
    };


    return (
        <div>
            <div className="mx-10 my-10  rounded-sm border border-stroke shadow-default">
                <div className="flex md:flex-row items-center">
                    <div className="hidden w-full md:block xl:w-1/2">
                        <div className="px-26 py-17.5 text-center">
                            <Link href="/" className="mb-5.5 inline-block">
                                <Image src={logo} alt="Logo" width={500} />
                            </Link>
                            <p className="text-lg font-medium">
                                Cơ hội thật – Công việc chất
                            </p>
                        </div>
                    </div>

                    <div className="w-full border-stroke xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black sm:text-title-xl2">
                                Đăng nhập ngay
                            </h2>

                            <div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black">Tên đăng nhập</label>
                                    <div className="relative">
                                        <input
                                            value={userName}
                                            onChange={(e) => setUsername(e.target.value)}
                                            type="text"
                                            placeholder="Nhập tên tài khoản"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary"
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiUser size={32} />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="mb-2.5 block font-medium text-black">Mật khẩu</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary"
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiLock size={32} />
                                        </span>
                                        {password && (
                                            <span
                                                className="absolute right-4 top-3 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
                                            </span>
                                        )}
                                        <div className="mt-4 text-right mr-4">
                                            <p>
                                                Quên mật khẩu?{" "}
                                                <Link href="/dang-nhap/quen-mat-khau" className="text-cyan-800 hover:text-blue-900">
                                                    Lấy lại mật khẩu
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <button
                                        onClick={handleClick}
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-green-500 p-4 text-white transition hover:bg-opacity-90"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        Chưa có tài khoản?{" "}
                                        <Link href="/dang-ky" className="text-cyan-800 hover:text-blue-900">
                                            Đăng ký ngay
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

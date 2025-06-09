"use client"

import { useState } from "react";
import { CiMoneyCheck1, CiLock, CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import logo from "../../../public/Logo/Logo.jpg";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";


const ConfirmNewPassword = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleClick = () => {


        if (!password) {
            toast.warning(
                'Chưa nhập mật khẩu mới!',
            );
            return;
        }
        if (!code) {
            toast.warning(
                'Chưa nhập mã xác nhận!',
            );
            return;
        }

        if (!email) {
            toast.warning(
                'Chưa nhập email!',
            );
            return;
        }
        if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.warning(
                'Email không hợp lệ!',
            );
            return;
        }

        if (password.length < 6) {
            toast.warning(
                'Yêu cầu mật khẩu hơn 6 ký tự!',
            );
            return;
        }


        axios.post('http://localhost:5000/confirm', {
            newPassword: password,
            email: email,
            code: code
        })
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(
                        'Lấy lại mật khẩu thất bại, xem lại email hoặc mã xác nhận!',
                    );

                }
                else {
                    toast.success(
                        'Lấy lại mật khẩu thành công, mời đăng nhập!',
                    );
                    window.location.href = '/Login';
                }
            }
            )
            .catch(err => {
                console.log(err)
            })


    }

    return (
        <div>

            <div className="mt-5 mb-10 rounded-sm border border-strokeshadow-default ">
                <div className="flex  md:flex-row items-center">
                    <div className="hidden w-full md:block xl:w-1/2">
                        <div className="px-26 py-17.5 text-center">
                            <Link className="mb-5.5 inline-block" href="/">
                                <Image src={logo} alt="Logo" width={500} />

                            </Link>

                            <p style={{ fontSize: '20px', fontWeight: '500', }}>Cơ hội thật – Công việc chất</p>


                        </div>
                    </div>

                    <div className="w-full border-stroke  xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
                                Xác nhận đổi mật khẩu
                            </h2>

                            <div>

                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Email
                                    </label>
                                    <div className="relative">
                                        {/* <CiUser size={40} /> */}
                                        <input
                                            type="text"
                                            placeholder="Nhập email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiMail size={32} />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Mã xác nhận
                                    </label>
                                    <div className="relative">
                                        {/* <CiUser size={40} /> */}
                                        <input
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            type="text"
                                            placeholder="Nhập mã xác nhận"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                                        />
                                        <span className="absolute left-4 top-3">
                                            <CiMoneyCheck1 size={32} />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black ">
                                        Mật khẩu mới
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu mới"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                                        />

                                        <span className="absolute left-4 top-3">
                                            <CiLock size={32} />
                                        </span>
                                        {password && (<span
                                            className="absolute right-4 top-3 cursor-pointer"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <FaRegEye size={24} />
                                            ) : (
                                                <FaRegEyeSlash size={24} />
                                            )}
                                        </span>)}

                                    </div>
                                </div>


                                <div className="mb-5">
                                    <button
                                        onClick={handleClick}
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-green-500 p-4 text-white transition hover:bg-green-600">
                                        Thay đổi mật khẩu
                                    </button>
                                </div>

                                <div className="mt-6 text-center">
                                    <p>
                                        Hoặc{" "}
                                        <Link
                                            href={"/Login"}
                                            className="text-green-800 hover:text-green-900"
                                        >
                                            Đăng nhập ngay
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

export default ConfirmNewPassword;

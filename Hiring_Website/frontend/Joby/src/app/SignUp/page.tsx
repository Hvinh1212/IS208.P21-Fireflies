'use client';
import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/Logo/Logo.jpg";
import { CiUser, CiLock, CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password2, setPassword2] = useState("");
    const [showPassword2, setShowPassword2] = useState(false);
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const togglePasswordVisibility2 = () => {
        setShowPassword2((prev) => !prev);
    };

    const handleClick = async () => {
        if (!userName || !password || !password2 || !email) {
            toast.warning("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (
            !email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            toast.warning("Email không hợp lệ");
            return;
        }

        if (password !== password2) {
            toast.warning("Mật khẩu chưa trùng khớp");
            return;
        }

        if (password.length < 6) {
            toast.warning("Yêu cầu mật khẩu hơn 6 kí tự");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`,
                {
                    user_login_name: userName,
                    user_password: password,
                    user_email: email,
                }
            );

            if (res.data.success === false) {
                toast.error("Email đã được đăng ký");
            } else {
                toast.success("Đăng kí thành công, mời đăng nhập");
                router.push("/login");
            }
        } catch (err) {
            console.error(err);
            toast.error("Có lỗi xảy ra khi đăng ký");
        }
    };

    return (
        <div className="my-10 rounded-sm border border-stroke shadow-default mx-10">
            <div className="flex md:flex-row items-center">
                <div className="hidden w-full md:block xl:w-1/2">
                    <div className="px-10 py-10 text-center">
                        <Link href="/" className="mb-5.5 inline-block">
                            <Image src={logo} alt="Logo" width={500} />
                        </Link>
                        <p style={{ fontSize: "20px", fontWeight: "500" }}>
                            Cơ hội thật – Công việc chất
                        </p>
                    </div>
                </div>

                <div className="w-full border-stroke xl:w-1/2 xl:border-l-2">
                    <div className="w-full p-4 sm:p-12 xl:p-16">
                        <h2 className="mb-9 text-2xl font-bold text-black sm:text-3xl">
                            Đăng ký ngay
                        </h2>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black">
                                Tên đăng nhập
                            </label>
                            <div className="relative">
                                <input
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    type="text"
                                    placeholder="Nhập tên tài khoản"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary"
                                />
                                <span className="absolute left-4 top-3">
                                    <CiUser size={32} />
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-black">Email</label>
                            <div className="relative">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    placeholder="Nhập email"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary"
                                />
                                <span className="absolute left-4 top-3">
                                    <CiMail size={32} />
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
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
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-black">
                                Nhập lại mật khẩu
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword2 ? "text" : "password"}
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    placeholder="Nhập lại mật khẩu"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary"
                                />
                                <span className="absolute left-4 top-3">
                                    <CiLock size={32} />
                                </span>
                                {password2 && (
                                    <span
                                        className="absolute right-4 top-3 cursor-pointer"
                                        onClick={togglePasswordVisibility2}
                                    >
                                        {showPassword2 ? <FaRegEye size={24} /> : <FaRegEyeSlash size={24} />}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleClick}
                            className="w-full rounded-lg border border-primary bg-green-500 p-4 text-white hover:bg-opacity-90"
                        >
                            Đăng ký
                        </button>

                        <div className="mt-6 text-center">
                            <p>
                                Đã có tài khoản?{" "}
                                <Link href="/login" className="text-green-800 hover:text-green-900">
                                    Đăng nhập ngay
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

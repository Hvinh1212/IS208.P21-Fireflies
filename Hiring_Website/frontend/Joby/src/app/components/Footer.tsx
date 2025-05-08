"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faXTwitter,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faLocation, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";


export default function Footer() {
    const Company = [
        {
            title: "Về Joby inTECH",
            link: "/about",
        },
        {
            title: "Sản phẩm dịch vụ khác",
            link: "/contact",
        },
        {
            title: "Diễn đàn",
            link: "/blog",
        },
        {
            title: "Thỏa thuận sử dụng",
            link: "/",
        },
    ];

    const Services = [
        {
            title: "Tài khoản",
            link: "/account",
        },
        {
            title: "Dánh cho nhà tuyển dụng",
            link: "/tracking",
        },
        {
            title: "Dành cho ứng viên",
            link: "/return",
        },
        {
            title: "Câu hỏi thường gặp",
            link: "/faq",
        },
    ];

    const Information = [
        {
            title: "Quyền truy cập",
            link: "/privacy",
        },
        {
            title: "Chính sách người dùng",
            link: "/term",
        },
        {
            title: "Giấy phép kinh doanh",
            link: "/returnpolicy",
        },

    ];

    return (
        <div>
            <div className="grid md:grid-cols-3 mx-4 sm:mx-6 md:mx-10 my-5 py-5 bg-green-600 rounded-2xl">
                {/* company details  */}
                <div className="py-6 md:py-8 px-6 md:px-20 text-center md:text-left">
                    <Link href="/">
                        <Image
                            src="/Logo/Logo.png"
                            alt="logo"
                            width={200}
                            height={300}
                            className="object-cover"
                        />
                    </Link>
                    <p className="text-white pt-3 text-sm md:text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et facere
                        qui libero.
                    </p>
                    <div className="flex justify-center md:justify-start gap-6 md:gap-10 mt-6 text-xl md:text-2xl">
                        <a href="#" className="hover:text-green-200 transition-colors">
                            <FontAwesomeIcon icon={faFacebook} className="text-white" />
                        </a>
                        <a href="#" className="hover:text-green-200 transition-colors">
                            <FontAwesomeIcon icon={faXTwitter} className="text-white" />
                        </a>
                        <a href="#" className="hover:text-green-200 transition-colors">
                            <FontAwesomeIcon icon={faLinkedin} className="text-white" />
                        </a>
                        <a href="#" className="hover:text-green-200 transition-colors">
                            <FontAwesomeIcon icon={faInstagram} className="text-white" />
                        </a>
                    </div>
                </div>

                {/* footer links  */}
                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="py-4 md:py-8 px-6 md:px-4 text-center sm:text-left">
                        <h1 className="text-lg md:text-xl text-white font-semibold mb-3">
                            Công ty
                        </h1>
                        <ul className="space-y-2 md:space-y-3">
                            {Company.map((data, index) => (
                                <li key={index}>
                                    <a
                                        href={data.link}
                                        className="text-white/80 hover:text-white duration-300 text-sm md:text-base"
                                    >
                                        {data.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="py-4 md:py-8 px-6 md:px-4 text-center sm:text-left">
                        <h1 className="text-lg md:text-xl text-white font-semibold mb-3">
                            Dịch vụ khách hàng
                        </h1>
                        <ul className="space-y-2 md:space-y-3">
                            {Services.map((data, index) => (
                                <li key={index}>
                                    <a
                                        href={data.link}
                                        className="text-white/80 hover:text-white duration-300 text-sm md:text-base"
                                    >
                                        {data.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="py-4 md:py-8 px-6 md:px-4 text-center sm:text-left">
                        <h1 className="text-lg md:text-xl text-white font-semibold mb-3">
                            Quy chế hoạt động
                        </h1>
                        <ul className="space-y-2 md:space-y-3">
                            {Information.map((data, index) => (
                                <li key={index}>
                                    <a
                                        href={data.link}
                                        className="text-white/80 hover:text-white duration-300 text-sm md:text-base"
                                    >
                                        {data.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="py-4 md:py-8 px-6 md:px-4 text-center sm:text-left">
                        <h1 className="text-lg md:text-xl text-white font-semibold mb-3">
                            Liên hệ
                        </h1>
                        <div className="text-white/80 space-y-4 text-sm md:text-base">
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <FontAwesomeIcon icon={faLocation} />
                                <p>HCM-UIT</p>
                            </div>
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <FontAwesomeIcon icon={faPhone} />
                                <p>0987654321</p>
                            </div>
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <FontAwesomeIcon icon={faMailBulk} />
                                <p>@UIT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
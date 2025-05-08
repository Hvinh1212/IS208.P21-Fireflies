"use client"

import Image from "next/image";
import CompanyCard from "./CompanyCard";
import { useContext } from "react";
import { DataContext } from "../AppContexts/Context";

interface Company {
    avatar: string
    name_title: string
    id: number

}

export default function Trending() {
    const context = useContext(DataContext);
    const companies = context[0] as Company[];

    return (
        <div className="py-8 sm:py-12 bg-white">
            <section className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white">
                    {/* Banner */}
                    <div className="relative bg-gradient-to-b from-green-400 to-yellow-300 rounded-xl overflow-hidden h-[300px] md:h-full">
                        <Image
                            src="/Banners/tech.jpg"
                            alt="SeleOff Banner"
                            width={300}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex flex-col justify-around p-6 text-white text-center">
                            <p></p>
                            <p className="text-4xl sm:text-2xl font-bold ">Hơn <span className="text-green-400">2000</span> ứng viên có việc trong tuần qua</p>
                            <button className="mt-4 bg-green-600 px-4 py-2 rounded-full font-bold hover:bg-green-700 transition-colors">
                                Ứng tuyển ngay
                            </button>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="col-span-1 md:col-span-3">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black text-center md:text-left">
                            Thương hiệu <span className="text-green-600">tiêu biểu</span>
                        </h2>
                        <p className="text-gray-500 mb-6 text-center md:text-left text-xl">
                            Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.
                        </p>
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center items-center">
                            {companies.slice(0, 6).map((company, index) => (
                                <CompanyCard key={index} {...company} />
                            ))}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
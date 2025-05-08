"use client";

import CompanyCarousel from "./CompanyCarousel";
import { DataContext } from "../AppContexts/Context";
import { useContext } from "react";



export default function TopCompanies() {
    const [companies] = useContext(DataContext);

    return (
        <section className="py-12 px-auto bg-white ">
            <div className="flex items-center justify-between text-center mx-4 md:mx-12 lg:mx-32">
                <div className="text-left">
                    <h3 className="text-gray-500 uppercase font-semibold">Các công ty hàng đầu</h3>
                    <h2 className="text-4xl font-bold text-black">
                        Khám phá các <span className="text-green-600">đối tác hàng đầu của chúng tôi </span>
                    </h2>
                </div>

            </div>
            <CompanyCarousel companies={companies} />

        </section>
    );
}
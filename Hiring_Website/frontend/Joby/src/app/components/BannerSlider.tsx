// components/BannerSlider.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import banner1 from "../../../public/Banners/b5.jpg";
import banner2 from "../../../public/Banners/b6.jpg";
import banner3 from "../../../public/Banners/b7.jpg";
import banner4 from "../../../public/Banners/b8.png";


const BannerSlider = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto"
        >
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '"></span>';
                    },
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className="w-full rounded-2xl shadow-xl overflow-hidden"
            >
                {[banner1, banner2, banner3, banner4].map((banner, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full aspect-[16/9]">
                            <Image
                                src={banner}
                                alt={`Banner ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
                                priority={idx === 0}
                                quality={100}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <style jsx global>{`
                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    background: white;
                    opacity: 0.5;
                    transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1;
                    background: #00FF00;
                    transform: scale(1.2);
                }
                .swiper-button-next,
                .swiper-button-prev {
                    color: white;
                    background: rgba(0, 0, 0, 0.3);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                    background: rgba(0, 0, 0, 0.5);
                }
                .swiper-button-next:after,
                .swiper-button-prev:after {
                    font-size: 20px;
                }
            `}</style>
        </motion.div>
    );
};

export default BannerSlider;

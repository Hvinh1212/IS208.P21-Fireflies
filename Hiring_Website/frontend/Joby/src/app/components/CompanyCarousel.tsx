"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CompanyCard from "./CompanyCard";


interface Company {
    avatar: string
    name_title: string
    id: number
}

interface CompanyCarouselProps {
    companies: Company[];
}

const CompanyCarousel: React.FC<CompanyCarouselProps> = ({ companies }) => {
    return (
        <div className="mt-8 relative mx-4 md:mx-12 lg:mx-32">
            <div className="mx-auto max-w-[95%] sm:max-w-[90%]">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    centeredSlides={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            centeredSlides: false,
                            spaceBetween: 30
                        },
                        1000: {
                            slidesPerView: 3,
                            centeredSlides: false,
                            spaceBetween: 30
                        },
                        1385: {
                            slidesPerView: 4,
                            centeredSlides: false,
                            spaceBetween: 30
                        },
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    loop={true}
                    className="!px-4"
                >
                    {companies.map((item, index) => (
                        <SwiperSlide key={index} className="flex justify-center items-center py-4">
                            <div className="w-full flex justify-center">
                                <CompanyCard avatar={item.avatar} name_title={item.name_title} id={item.id} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-next !text-green-800 !-right-2"></div>
            <div className="swiper-button-prev !text-green-800 !-left-2"></div>
        </div>
    );
};

export default CompanyCarousel;

"use client";
import Image from "next/image";
import BannerSlider from "./BannerSlider";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <div className="bg-gray-50 shadow-lg px-12">
            <section className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-4 py-12 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left w-full md:w-[45%]"
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mt-4 leading-tight">
                        <span className="bg-gradient-to-r from-yellow-600 to-green-600 text-transparent bg-clip-text">Joby Hiring</span> <br />
                        <span className="text-gray-700">Khởi đầu thành công</span>
                    </h2>
                    <p className="mt-6 text-gray-600 text-lg max-w-lg mx-auto md:mx-0">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, maxime! Voluptate praesentium est beatae! Quo labore consequuntur hic ratione! Sint labore consequatur inventore delectus. Veritatis illo saepe autem perferendis alias?
                    </p>
                    <div className="mt-8 space-y-4 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-center justify-center md:justify-start">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#"
                            className="w-full md:w-auto bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg font-semibold hover:shadow-xl transition-all duration-300 text-center"
                        >
                            Ứng tuyển ngay →
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="#"
                            className="w-full md:w-auto text-gray-700 font-semibold hover:text-green-600 transition-colors duration-300 text-center"
                        >
                            Xem thêm
                        </motion.a>
                    </div>
                    <div className="flex mt-10 items-center space-x-6 justify-center md:justify-start">
                        <div className="flex -space-x-2">
                            <Image src="/Companies/jolibee.jpg" width={45} height={45} className="rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-300" alt="User 1" />
                            <Image src="/Companies/bcons.png" width={45} height={45} className="rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-300" alt="User 2" />
                            <Image src="/Companies/oppo.png" width={45} height={45} className="rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-300" alt="User 3" />
                            <div className="w-11 h-11 bg-green-500 text-white rounded-full flex items-center justify-center text-lg font-bold border-2 border-white shadow-md hover:scale-110 transition-transform duration-300">
                                +
                            </div>
                        </div>
                        <div>
                            <p className="text-black text-xl font-bold">4.9+ ⭐</p>
                            <p className="text-gray-600 text-sm">Hơn 95k+ người dùng tin tưởng</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-[55%] mt-8 md:mt-0"
                >
                    <BannerSlider />
                </motion.div>
            </section>
        </div>
    );
}

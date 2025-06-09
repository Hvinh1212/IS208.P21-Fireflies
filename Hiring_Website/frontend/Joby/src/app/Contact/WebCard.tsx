import React, { useContext } from "react";
import { MdPlace, MdLocalPhone } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

const WebCard = () => {
    return (
        <>
            <div className="w-full h-full flex flex-col items-center gap-5 border rounded-xl p-5">
                <img
                    className="w-1/2 "
                />
                <div className="border-b border-[#bbbbbb] w-3/4"></div>
                <p className="w-full text-white font-bold text-xl mt-5">THÔNG TIN LIÊN HỆ</p>
                <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
                    <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-green-500 flex justify-center items-center rounded-full">
                        <IoMdMail size={30} />
                    </div>
                    <div className="h-[40px] lg:h-[50px] flex flex-col justify-between">
                        <p className="text-[15px] font-medium text-white">Email</p>
                        <p className="text-[16px] font-bold text-green-500">Joby.contact@gmail.com</p>
                    </div>
                </div>
                <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
                    <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-green-500 flex justify-center items-center rounded-full">
                        <MdLocalPhone size={30} />
                    </div>
                    <div className="h-[40px] lg:h-[50px] flex flex-col justify-between">
                        <p className="text-[15px] font-medium text-white">Số điện thoại</p>
                        <p className="text-[16px] font-bold text-green-500">012345689</p>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-1">
                    <div className="w-full flex flex-row items-center gap-2 sm:gap-3">
                        <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] bg-green-500 flex justify-center items-center rounded-full">
                            <MdPlace size={30} />
                        </div>
                        <div className="h-[40px] lg:h-[50px] flex flex-col justify-between">
                            <p className="text-[15px] font-medium text-white">Địa chỉ</p>
                            <p className="text-[16px] font-bold text-green-500">Trường Đại học Công Nghệ Thông Tin</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-center gap-3">
                        <div className="w-[80px]"></div>
                        <a href="https://maps.app.goo.gl/TNkRmH6uTDPtwyL6A" target="_blank"
                            className="text-sm text-white hover:underline italic"
                        >
                            Đường dẫn Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WebCard;
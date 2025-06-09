"use client"
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import WebCard from "./WebCard";
import axios from "axios";

const Contact = () => {

    const userId = localStorage.getItem('id');
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [text, setText] = useState("")
    const notifyError = (message: any) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const sendEmail = () => {
        if (!name) {
            notifyError("Vui lòng nhập tên")
            return
        }
        if (!email) {
            notifyError("Vui lòng nhập email")
            return
        }
        if (!phone) {
            notifyError("Vui lòng nhập số điện thoại")
            return
        }
        if (!address) {
            notifyError("Vui lòng nhập địa chỉ")
            return
        }
        if (!text) {
            notifyError("Vui lòng nhập đánh giá và bình luận của bạn")
            return
        }
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            notifyError("Nhập sai định dạng email")
            return
        }

        const regexPhone = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?\d{3}[\s-]?\d{4}$/;
        if (!regexPhone.test(phone)) {
            notifyError("Nhập sai định dạng số điện thoại")
            return
        }

        axios.post('http://localhost/be-shopbangiay/api/feedback.php', {
            userId: userId,
            name: name,
            email: email,
            phone: phone,
            address: address,
            content: text
        })
            .then(() => {
                toast.success("Gửi phản hồi thành công", {
                    position: "top-right",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        location.reload()
                    }
                });
            })
            .catch(err => {
                console.log(err)
                toast.success("Gửi phản hồi thành công", {
                    position: "top-right",
                    autoClose: 700,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    onClose: () => {
                        location.reload()
                    }
                })
            })
    }
    return (
        <div className="w-full h-auto flex flex-col items-center mb-20 mt-5 ">
            <ToastContainer />
            <div className="w-11/12">
                <div className="relative w-11/12 h-auto bg-white lg:bg-transparent rounded-xl lg:h-screen flex flex-col lg:flex-row  justify-end items-center">
                    <div className="absolute left-30 w-1/3 p-5 h-[90vh] bg-[#020b0b] rounded-xl hidden lg:flex justify-center items-center">
                        <WebCard />
                    </div>
                    <div className="w-full lg:w-4/5 h-full lg:bg-white rounded-xl p-3 gap-10 pb-5 lg:p-0 shadow-2xl border border-gray-300 flex lg:flex-row flex-col items-center justify-end">
                        <div className="w-full h-[80vh] p-3 md:p-5 bg-[#3e3e3e] rounded-xl lg:hidden flex justify-center items-center">
                            <WebCard />
                        </div>
                        <div className="w-full lg:w-3/5 h-[90vh] flex flex-col gap-10 items-center lg:items-start">
                            <p className="text-4xl font-bold text-green-500">Liên hệ với chúng tôi</p>
                            <div className="w-full lg:w-10/12">
                                <div className="w-full mb-1">
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full h-[50px] border border-[#3e3e3e] pl-3 font-medium rounded-lg focus:ring-green-500 focus:outline-green-500"
                                    />
                                    <p className="text-sm italic w-full text-end text-[#ff4343] invisible ">Vui lòng nhập thông tin</p>
                                </div>
                                <div className="w-full mb-1">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[50px] border border-[#3e3e3e] pl-3 font-medium rounded-lg focus:ring-green-500 focus:outline-green-500"
                                    />
                                    <p className="text-sm italic w-full text-end text-[#ff4343] invisible ">Vui lòng nhập thông tin</p>
                                </div>
                                <div className="w-full mb-1">
                                    <input
                                        type="text"
                                        placeholder="Số điện thoại"
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full h-[50px] border border-[#3e3e3e] pl-3 font-medium rounded-lg focus:ring-green-500 focus:outline-green-500"
                                    />
                                    <p className="text-sm italic w-full text-end text-[#ff4343] invisible ">Vui lòng nhập thông tin</p>
                                </div>
                                <div className="w-full mb-1">
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full h-[50px] border border-[#3e3e3e] pl-3 font-medium rounded-lg focus:ring-green-500 focus:outline-green-500"
                                    />
                                    <p className="text-sm italic w-full text-end text-[#ff4343] invisible ">Vui lòng nhập thông tin</p>
                                </div>
                                <textarea onChange={(e) => setText(e.target.value)} className="w-full p-3 border border-[#3e3e3e] resize-none rounded-xl focus:ring-green-500 focus:outline-green-500" name="comment" cols={30} rows={4} placeholder="Viết bình luận của bạn"></textarea>
                            </div>
                            <div className="w-10/12 flex justify-center">
                                <button onClick={sendEmail} className="relative w-1/3 overflow-hidden h-[50px] flex items-center justify-start bg-[#3e3e3e] rounded-xl cursor-pointer  group  duration-700 ease-linear">
                                    <div className="bg-green-500 absolute w-0 h-full rounded-lg group-hover:w-full duration-200"></div>
                                    <p className="text-lg w-full text-white font-bold z-10">
                                        Gửi đi
                                    </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
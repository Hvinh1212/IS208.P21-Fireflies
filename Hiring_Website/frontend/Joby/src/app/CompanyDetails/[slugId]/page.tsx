"use client"

import { faCity, faGlobe, faLocationDot, faMailBulk, faPhone, faShare, faShareNodes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import JobCard, { JobCardProps } from "../../components/JobCard"
import { faFacebookSquare, faLinkedinIn, faTwitterSquare } from "@fortawesome/free-brands-svg-icons"
import { use, useContext, useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { DataContext } from "@/app/AppContexts/Context"
import { Job } from "@/app/components/JobList"


export default function CompayDetails() {

    const params = useParams();
    const slugId = params.slugId as string;

    const extractIdFromSlug = (slug: string): string => {
        const parts = slug.split("-");
        return parts[parts.length - 1];
    };

    const companyId = extractIdFromSlug(slugId);
    console.log("companyId:", companyId);
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState('');
    const [web, setWeb] = useState('');
    const [des, setDes] = useState('');
    const [email, setEmail] = useState('');
    const [jobs, setJobs] = useState<JobCardProps[]>([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/employers/` + companyId).then((res) => {
            setAvatar(res.data.avatar);
            setName(res.data.company_name);
            setWeb(res.data.website);
            setDes(res.data.description);
            setEmail(res.data.email);
            console.log(name)
        })

        axios.get(`http://localhost:5000/posts/employer/` + companyId).then((res) => {
            console.log(res.data)
            setJobs(res.data);
        })
    }, [companyId])


    return (
        <div className="bg-gray-50 ">
            <div className="mx-40 py-10">
                <div className="relative mb-25">
                    <div className="">
                        <Image
                            src="/CompanyBanners/company_cover.png"
                            alt="banner"
                            width={500}
                            height={200}
                            className="w-full object-cover mx-auto rounded-2xl"
                        />
                    </div>
                    <div className="absolute -bottom-5 h-4/10 w-full grid grid-cols-5 gap-5 bg-gradient-to-br from-green-700 to-green-600 rounded-b-2xl z-99">
                        <div className="col-span-1">
                            <Image
                                src={avatar && avatar !== "" ? avatar : "/Companies/nv.png"}
                                alt={name && name !== "" ? name : ""}
                                width={70}
                                height={70}
                                className="w-9/10 object-cover mx-auto rounded-2xl relative -top-30 left-20 bg-white"
                            />
                        </div>
                        <div className="col-span-4 flex flex-col justify-start gap-5 text-white ml-20 pt-5 ">
                            <h1 className="font-semibold">{name}</h1>
                            <div className="flex justify-start gap-6 items-center ">
                                <FontAwesomeIcon icon={faGlobe} />
                                <a href={web} className="hover:underline">{web}</a>
                                <FontAwesomeIcon icon={faCity} />
                                <span>5000+ nhân viên</span>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="grid grid-cols-3  gap-8">
                    <div className="grid col-span-2 gap-8">
                        <div className="rounded-2xl border border-gray-300">
                            <p className="bg-gradient-to-br from-green-800 to-green-500 text-white px-4 py-3 text-xl rounded-t-xl">Giới thiệu công ty</p>
                            <p className="px-4 py-4 whitespace-pre-line">{des.replace(/\\n/g, '\n')}</p>

                        </div>
                        <div className="rounded-2xl border border-gray-300">
                            <p className="bg-gradient-to-br from-green-800 to-green-500 text-white px-4 py-3 text-xl rounded-t-xl ">Tuyển dụng</p>
                            <div className="px-10 py-2 flex flex-col gap-3">
                                {jobs.map((job, index) => (
                                    <JobCard key={index} {...job} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-1 gap-8">
                        <div className=" rounded-2xl border border-gray-300">
                            <p className="bg-gradient-to-br from-green-800 to-green-500 px-4 text-white py-3 text-xl rounded-t-xl">Thông tin liên hệ</p>
                            <p className="py-1 mx-4 mt-2">
                                <FontAwesomeIcon icon={faLocationDot}
                                    className="text-green-500 mr-4" />
                                Địa chỉ công ty: 12 Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh</p>
                            <p className="py-1"> <FontAwesomeIcon icon={faPhone}
                                className="text-green-500 mx-4" />Số điện thoại: 0987654321</p>
                            <p className="py-1"> <FontAwesomeIcon icon={faMailBulk}
                                className="text-green-500 mx-4" />{email}</p>
                        </div>
                        <div className=" rounded-2xl border border-gray-300">
                            <p className="bg-gradient-to-br from-green-800 to-green-500 text-white px-4 py-3 text-xl rounded-t-xl">Chia sẻ thông tin với bạn bè</p>
                            <p className="py-1 px-3 mt-2">
                                <FontAwesomeIcon icon={faShareNodes} className="text-green-500 mr-4" />
                                Thông tin chia sẻ:</p>
                            <input type="text" placeholder={web} readOnly
                                className="border border-gray-300 px-4 py-2 rounded-md mx-4 w-9/10 my-3" />
                            <p className="py-1 px-3">
                                <FontAwesomeIcon icon={faShare} className="text-green-500 mr-4" />
                                Chia sẻ qua mạng xã hội:
                            </p>
                            <div className="flex text-4xl py-1 justify-center gap-10 ">
                                <FontAwesomeIcon icon={faLinkedinIn}
                                    className="hover:text-green-500" />
                                <FontAwesomeIcon icon={faFacebookSquare}
                                    className="hover:text-green-500" />
                                <FontAwesomeIcon icon={faTwitterSquare}
                                    className="hover:text-green-500" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div >
    )
}
"use client"

import { faBriefcase, faCheckCircle, faCircleExclamation, faClock, faCoins, faCube, faGraduationCap, faHeart, faHourglassHalf, faLocationDot, faMedal, faPaperPlane, faUpRightFromSquare, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import JobCard, { JobCardProps } from "@/app/components/JobCard"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import ApplyModal from "@/app/components/ApplyModal"

export default function JobDetails() {

    const params = useParams();
    const slugId = params.slugId as string;

    const extractIdsFromSlug = (slug: string) => {
        const parts = slug.split("-");
        const jobId = parts[parts.length - 2];       // phần áp chót
        const companyId = parts[parts.length - 1];   // phần cuối cùng
        return { jobId, companyId };
    };

    const { jobId, companyId } = extractIdsFromSlug(slugId);

    console.log("jobId:", jobId);
    console.log("companyId:", companyId);

    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState('');
    const [web, setWeb] = useState('');
    const [des, setDes] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [salary_range, setSalary_range] = useState('');
    const [location, setLocation] = useState('');
    const [requirements, setRequirements] = useState('');
    const [company_size, setCompany_size] = useState('');
    const [category_name, setCategory_name] = useState('');
    const [job_type, setJob_type] = useState('');
    const [job_description, setJob_description] = useState('');
    const [deadline, setDeadline] = useState('');

    const [jobs, setJobs] = useState<JobCardProps[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/` + jobId).then((res) => {
            setAvatar(res.data.avatar);
            setName(res.data.company_name);
            setWeb(res.data.website);
            setDes(res.data.description);
            setEmail(res.data.email);
            setTitle(res.data.title)
            setSalary_range(res.data.salary_range)
            setLocation(res.data.location)
            setRequirements(res.data.requirements)
            setCompany_size(res.data.company_size)
            setCategory_name(res.data.category_name)
            setJob_type(res.data.job_type)
            setJob_description(res.data.description)
            setDeadline(new Date(res.data.deadline).toLocaleDateString('vi-VN'))
        })

        axios.get(`http://localhost:5000/posts/employer/` + companyId).then((res) => {
            console.log(res.data)
            setJobs(res.data);
        })
    }, [companyId])

    const [showModal, setShowModal] = useState(false);

    return (

        <div className="bg-gray-50">
            <div className="mx-40 ">
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2 flex flex-col gap-10 mt-10 ">
                        <div className="bg-white rounded-xl pb-5">
                            <h1 className="px-8 font-semibold text-xl mt-5">{title}
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 px-3" />
                            </h1>
                            <div className="flex justify-start px-5 my-5 gap-10">
                                <div className="flex items-center">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mx-3">
                                        <FontAwesomeIcon icon={faCoins} className="text-white text-2xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm">Thu nhập</p>
                                        <p className="font-semibold text-sm">{salary_range}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mx-3">
                                        <FontAwesomeIcon icon={faLocationDot} className="text-white text-2xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm">Địa điểm</p>
                                        <p className="font-semibold text-sm">{location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mx-3">
                                        <FontAwesomeIcon icon={faHourglassHalf} className="text-white text-2xl" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm">Kinh nghiệm</p>
                                        <p className="font-semibold text-sm">{requirements}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="mb-5">
                                <span className="mx-8 py-2 px-2 bg-gray-200 rounded-sm">
                                    <FontAwesomeIcon icon={faClock} className="pr-3" />
                                    Hạn nộp hồ sơ: {deadline}
                                </span>
                            </div>
                            <div className="flex mx-8 gap-5 ">
                                <button className="bg-green-500 rounded-md text-white py-2 cursor-pointer flex-1 hover:bg-green-600"
                                    onClick={() => setShowModal(true)}>
                                    <FontAwesomeIcon icon={faPaperPlane} className="mr-3" />
                                    Ứng tuyển ngay
                                </button>
                                {showModal && <ApplyModal onClose={() => setShowModal(false)} />}
                                <button className="bg-white rounded-md text-green-500 border border-green-500 cursor-pointer px-5 hover:border-green-700">
                                    <FontAwesomeIcon icon={faHeart} className="mr-3" />
                                    Lưu tin
                                </button>

                            </div>
                        </div>
                        <div className="bg-white rounded-xl py-5 mb-5">
                            <p className="border-l-6 border-l-green-500 px-3 font-semibold text-xl mx-8 mb-5">Chi tiết tuyển dụng</p>
                            <div className="px-15 whitespace-pre-line">
                                {job_description.replace(/\\n/g, '\n')}
                            </div>

                            <div className="mx-8 w-4/10 flex justify-between gap-5 my-4">
                                <button className="bg-green-500 rounded-md text-white py-2 cursor-pointer flex-1 hover:bg-green-600"
                                    onClick={() => setShowModal(true)}>
                                    Ứng tuyển ngay
                                </button>
                                <button className="bg-white rounded-md text-green-500 border border-green-500 cursor-pointer px-5 hover:border-green-700">
                                    <FontAwesomeIcon icon={faHeart} className="mr-3" />
                                    Lưu tin
                                </button>
                            </div>
                            <p className="mx-8 bg-gray-100 px-4 py-1 rounded-md" >
                                <FontAwesomeIcon icon={faCircleExclamation}
                                    className="text-green-500 mr-3"
                                />
                                Báo cáo tin tuyển dụng: Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có dấu hiệu lừa đảo,
                                <span className="text-green-500 cursor-pointer hover:text-green-600"> hãy phản ánh với chúng tôi.</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-span-1 flex flex-col gap-10">

                        <div className="bg-white rounded-xl mt-10">
                            <div className="flex items-center gap-5 mt-5 mx-5">
                                <div className="border border-gray-300 rounded-md">
                                    <Image
                                        src={avatar && avatar !== "" ? avatar : "/Companies/vnpay.png"}
                                        alt={name && name !== "" ? name : "YODY"}
                                        width={120}
                                        height={120}
                                        className="rounded-md" />
                                </div>
                                <div className="font-semibold">
                                    {name}
                                </div>
                            </div>
                            <div className="mx-5 mt-3 text-gray-500">
                                <FontAwesomeIcon icon={faUserGroup} className="mr-2" />
                                Quy mô: <span className="text-black">{company_size} nhân viên</span>
                            </div>
                            <div className="mx-5 mt-3 text-gray-500">
                                <FontAwesomeIcon icon={faCube} className="mr-2" />
                                Lĩnh vực: <span className="text-black">{category_name}</span>
                            </div>
                            <div className="mx-5 mt-3 text-gray-500">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                Địa điểm: <span className="text-black">Số 141 Đường Nguyễn Văn Thương, TP. Hồ Chí Minh</span>
                            </div>
                            <div className="text-center my-5">
                                <a href="https://www.uit.edu.vn/" className="text-green-500  cursor-pointer hover:text-green-600 hover:underline">Xem trang công ty
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="text-green-500 ml-3" />
                                </a>
                            </div>


                        </div>
                        <div className="bg-white rounded-xl">
                            <p className="px-8 pt-3 font-semibold text-xl">Thông tin chung</p>
                            <div className="px-8 flex items-center mt-5">
                                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mr-3">
                                    <FontAwesomeIcon icon={faMedal} className="text-white text-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm">Cấp bậc</p>
                                    <p className="font-semibold text-sm">Trưởng/Phó phòng</p>
                                </div>
                            </div>
                            <div className="px-8 flex items-center mt-5">
                                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mr-3">
                                    <FontAwesomeIcon icon={faGraduationCap} className="text-white text-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm">Học vấn</p>
                                    <p className="font-semibold text-sm">Đại học trở lên</p>
                                </div>
                            </div>

                            <div className="px-8 flex items-center mt-5">
                                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mr-3">
                                    <FontAwesomeIcon icon={faUserGroup} className="text-white text-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm">Số lượng tuyển</p>
                                    <p className="font-semibold text-sm">1 người</p>
                                </div>
                            </div>
                            <div className="px-8 flex items-center my-5">
                                <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-b from-green-600 to-green-500 text-center flex justify-center items-center mr-3">
                                    <FontAwesomeIcon icon={faBriefcase} className="text-white text-xl" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm">Hình thức làm việc</p>
                                    <p className="font-semibold text-sm">{job_type}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl py-5">
                            <p className="px-8 font-semibold text-xl">Danh mục nghề liên quan</p>
                            <div className="px-8 text-xs flex gap-3 mt-2">
                                <p className="bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer py-1 px-1">{category_name}</p>
                            </div>

                            <p className="px-8 font-semibold text-xl pt-3">Khu vực</p>
                            <div className="px-8 text-xs flex gap-3 mt-2">
                                <p className="bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer py-1 px-1">{location}</p>
                                <p className="bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer py-1 px-1">Bình Thạnh</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl  my-5">
                            <p className="px-8 font-semibold text-xl py-5">Gợi ý việc làm phù hợp</p>
                            <div className="px-4 flex flex-col gap-1 mb-2 ">
                                {jobs.map((job, index) => (
                                    <JobCard key={index} {...job} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
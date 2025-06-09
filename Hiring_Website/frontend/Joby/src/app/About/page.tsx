"use client"
import { faSearch, faUserTie, faChartLine, faRocket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from 'next/head'
import Image from "next/image"

const features = [
    {
        title: "Kết nối thông minh",
        description: "Nền tảng giúp kết nối nhà tuyển dụng và ứng viên một cách nhanh chóng và hiệu quả thông qua hệ thống gợi ý thông minh.",
    },
    {
        title: "Hồ sơ chuyên nghiệp",
        description: "Xem và quản lý hồ sơ ứng viên, CV trực tuyến với giao diện chuyên nghiệp và dễ sử dụng.",
    },
    {
        title: "Phân tích dữ liệu tuyển dụng",
        description: "Cung cấp báo cáo, thống kê chi tiết để giúp nhà tuyển dụng tối ưu quy trình tuyển dụng.",
    },
]

const teamMembers = [
    {
        name: "Trần Ngọc Minh Trang",
        role: "Nhóm trưởng",
        image: "/Logo/users.jpg"
    },
    {
        name: "Nguyễn Thị Ngọc Trâm",
        role: "Thành viên",
        image: "/Logo/users.jpg"
    },
    {
        name: "Nguyễn Trần Kim Hân",
        role: "Thư ký",
        image: "/Logo/users.jpg"
    },
    {
        name: "Nguyễn Ngọc Thịnh",
        role: "Thành viên",
        image: "/Logo/users.jpg"
    },
    {
        name: "Mai Hoàng Vinh",
        role: "Nhóm phó",
        image: "/Logo/users.jpg"
    },
]

export default function AboutRecruitPlatform() {
    return (
        <div>
            <Head>
                <title>Giới thiệu nền tảng tuyển dụng thông minh</title>
            </Head>

            <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-green-50">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-md overflow-hidden border-[0px] border-green-400 shadow-xl">
                    <Image
                        src="/Logo/logo_wf.jpg"
                        alt="Nền tảng tuyển dụng"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="mt-10 md:mt-0 md:ml-12 max-w-xl text-center md:text-left">
                    <h4 className="text-green-500 text-2xl font-bold">Nền tảng tuyển dụng trực tuyến</h4>
                    <h2 className="text-4xl font-semibold mt-2 text-black">
                        Kết nối ứng viên và nhà tuyển dụng nhanh chóng
                    </h2>
                    <p className="text-gray-600 mt-4 text-xl">
                        Chúng tôi mang đến giải pháp tuyển dụng thông minh, dễ sử dụng, giúp hàng ngàn doanh nghiệp tìm được ứng viên phù hợp mỗi ngày.
                    </p>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-white py-16 px-4 md:px-20">
                <p className="text-center text-2xl text-green-500 font-semibold">Tại sao chọn chúng tôi?</p>
                <p className="font-semibold text-4xl text-center text-">Giải pháp toàn diện cho tuyển dụng hiện đại</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-12 text-center px-4 md:px-10">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faSearch} className="text-3xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Tìm kiếm dễ dàng</h3>
                        <p className="text-gray-600 text-sm">Bộ lọc thông minh giúp tìm ứng viên hoặc công việc phù hợp trong vài giây.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faUserTie} className="text-3xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Hồ sơ chuyên nghiệp</h3>
                        <p className="text-gray-600 text-sm">Nộp CV online chỉ với vài bước đơn giản và nhanh chóng.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faChartLine} className="text-3xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Phân tích hiệu quả</h3>
                        <p className="text-gray-600 text-sm">Thống kê hiệu quả chiến dịch tuyển dụng, tối ưu chi phí.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-500 flex items-center justify-center mb-4">
                            <FontAwesomeIcon icon={faRocket} className="text-3xl" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Tăng trưởng nhanh chóng</h3>
                        <p className="text-gray-600 text-sm">Được hàng ngàn doanh nghiệp tin dùng và đánh giá cao.</p>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 py-16 px-4 md:px-20">
                <p className="text-center text-2xl text-green-500 font-semibold">Tính năng nổi bật</p>
                <p className="font-semibold text-4xl text-center text-">Nâng tầm trải nghiệm tuyển dụng</p>
                <div className="flex flex-wrap gap-8 py-12 justify-center">
                    {features.map((feature, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md border-l-4 border-green-500 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text- mb-2">{feature.title}</h3>
                                <p className="text-gray-700 mb-4">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Our Team */}
            <div className="bg-white py-16 px-4 md:px-20">
                <p className="text-center text-2xl text-green-500 font-semibold">Đội ngũ phát triển</p>
                <p className="font-semibold text-4xl text-center text-">Những người đứng sau nền tảng</p>
                <div className="flex flex-wrap gap-8 py-12 justify-center">
                    {teamMembers.map((member, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <Image
                                src={member.image}
                                alt={member.name}
                                width={180}
                                height={180}
                                className="rounded-full object-cover border-4 border-green-200 shadow-md mb-4"
                            />
                            <p className="font-semibold text-">{member.name}</p>
                            <p className="text-gray-500 text-base">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-green-700 py-16 px-4 md:px-20">
                <p className="text-center text-2xl text-white font-semibold">Bạn đã sẵn sàng?</p>
                <p className="font-semibold text-4xl text-center text-green-100">Trải nghiệm nền tảng tuyển dụng thông minh</p>
                <p className="text-center text-green-100 py-5">Đăng ký tài khoản ngay hôm nay để bắt đầu hành trình kết nối sự nghiệp.</p>
                <div className="flex justify-center gap-5">
                    <input
                        type="text"
                        placeholder="Nhập email của bạn"
                        className="bg-white pr-10 pl-5 py-4 rounded-full focus:ring-green-500 focus:outline-green-500"
                    />
                    <button className="px-9 py-2 bg-green-600 text-white rounded-full cursor-pointer hover:bg-green-800 transition">
                        Bắt đầu
                    </button>
                </div>
            </div>
        </div>
    )
}

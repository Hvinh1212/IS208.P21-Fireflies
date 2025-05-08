"use client"

import ProfessionCard from "./ProfessionCard"
import { FaAtom, FaBalanceScale, FaBookOpen, FaBuilding, FaBullhorn, FaFileInvoiceDollar, FaHandHoldingMedical, FaLaptop } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const professions = [
    {
        id: 1,
        icon: FaLaptop,
        title: "Công nghệ thông tin",
        count: "131.325"
    },
    {
        id: 2,
        icon: FaBullhorn,
        title: "Marketing - Truyền thông",
        count: "131.325"
    },
    {
        id: 4,
        icon: FaBuilding,
        title: "Xây dựng - Kiến trúc",
        count: "131.325"
    },
    {
        id: 5,
        icon: FaBookOpen,
        title: "Giáo dục - Đào tạo",
        count: "131.325"
    },
    {
        id: 6,
        icon: FaHandHoldingMedical,
        title: "Y tế - Dược phẩm",
        count: "131.325"
    },
    {
        id: 7,
        icon: FaBalanceScale,
        title: "Luật - Pháp lý",
        count: "131.325"
    },
    {
        id: 10,
        icon: FaAtom,
        title: "Kỹ thuật - Cơ khí - Điện",
        count: "131.325"
    },

    {
        id: 3,
        icon: FaFileInvoiceDollar,
        title: "Kế toán - Kiểm toán",
        count: "131.325"
    },
]

export default function TopProfession() {
    const router = useRouter();

    const handleProfessionClick = (categoryId: number) => {
        router.push(`/AllJob?category=${categoryId}`);
    };

    return (
        <div className="flex flex-col bg-white px-10">
            <h1 className="font-semibold mx-auto text-xl md:text-4xl py-5">Top ngành nghề nổi bật</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-20">
                {professions.map((prof, index) => (
                    <div
                        key={index}
                        onClick={() => handleProfessionClick(prof.id)}
                        className="cursor-pointer"
                    >
                        <ProfessionCard {...prof} />
                    </div>
                ))}
            </div>
        </div>
    )
}
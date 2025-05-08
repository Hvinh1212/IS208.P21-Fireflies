'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface CompanyCardProps {
    avatar: string
    name_title: string
    id: number
}

export default function CompanyCard({ avatar, name_title, id }: CompanyCardProps) {
    const router = useRouter()

    const handleNavigate = () => {
        router.push(`/CompanyDetails/${encodeURIComponent(name_title)}-${id}`)
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 text-center border border-gray-200 hover:shadow-lg transition cursor-pointer">
            <div className="flex justify-center mb-3">
                <Image
                    src={avatar && avatar !== "" ? avatar : "/Companies/vnpay.png"}
                    alt={name_title && name_title !== "" ? name_title : "YODY"}
                    width={180}
                    height={60}
                    className="object-contain"
                />
            </div>
            <h3 className="font-bold text-gray-800 text-sm uppercase">{name_title}</h3>
            <button
                onClick={handleNavigate}
                className="inline-block mt-2 px-3 py-1 text-sm bg-green-500 text-white font-semibold rounded cursor-pointer"
            >
                Xem việc
            </button>
        </div>
    )
}

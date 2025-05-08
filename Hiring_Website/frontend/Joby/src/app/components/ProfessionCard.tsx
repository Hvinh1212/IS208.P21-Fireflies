"use client"

import { IconType } from 'react-icons';

interface ProfessionCardProps {
    icon: IconType,
    title: string,
    count: string
}

export default function ProfessionCard({ icon: Icon, title, count }: ProfessionCardProps) {
    return (
        <div className="flex flex-col bg-white cursor-pointer">
            <div className="bg-gray-200 rounded-xl text-center hover:shadow-xl hover:bg-white border border-gray-200 hover:border-green-400 space-y-2 py-10 px-10">
                <div className="pb-5" >
                    <Icon size={50} className="text-green-500 mx-auto" />
                </div>
                <h1 className="font-semibold">{title}</h1>
                <p className="text-sm text-green-500">{count} việc làm</p>
            </div>
        </div>
    )
}
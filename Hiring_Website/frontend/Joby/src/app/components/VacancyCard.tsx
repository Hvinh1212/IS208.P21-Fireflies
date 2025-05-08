'use client';

import { FaEye, FaPen } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

interface VacancyCardProps {
    position: string;
    deadline: string;
    views: number;
    applicants: number;
    color: 'blue' | 'red' | 'purple';
    isActive: boolean;
}

export default function VacancyCard({
    position,
    deadline,
    views,
    applicants,
    color,
    isActive,
}: VacancyCardProps) {
    const colorMap = {
        blue: 'text-blue-500 bg-blue-100',
        red: 'text-red-500 bg-red-100',
        purple: 'text-purple-500 bg-purple-100',
    };

    const toggleColor = {
        blue: 'bg-blue-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-md flex flex-col gap-4 w-full ">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-400">Position</p>
                    <h2 className="font-semibold text-lg text-gray-800">{position}</h2>
                </div>
                <div>
                    <button
                        className={`w-10 h-5 flex items-center ${isActive ? toggleColor[color] : 'bg-gray-300'} rounded-full p-1 transition`}
                    >
                        <div
                            className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform ${isActive ? 'translate-x-5' : ''
                                } transition`}
                        />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-1 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span>⏳</span>
                    <span>Deadline: <span className="font-medium">{deadline}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <span>👁️</span>
                    <span>Views: {views}</span>
                </div>
            </div>

            <div className="flex items-center">
                <span className={`text-sm font-semibold rounded-full px-3 py-1 ${colorMap[color]}`}>
                    {applicants} applicants
                </span>
            </div>

            <div className="flex justify-between pt-2 border-t">
                <button className="text-gray-400 hover:text-gray-600">
                    <BsThreeDots size={20} />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                    <FaEye size={20} />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                    <FaPen size={20} />
                </button>
            </div>
        </div>


    );
}

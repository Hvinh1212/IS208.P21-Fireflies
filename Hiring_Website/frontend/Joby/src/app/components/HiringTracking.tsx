'use client';

import { FaSearch, FaUser } from 'react-icons/fa';

const jobs = [
    {
        title: 'Marketer',
        applications: 12,
        stages: [
            { name: 'Chờ xử lý', candidates: 87, color: 'bg-purple-500' },
            { name: 'Đã đánh giá', candidates: 52, color: 'bg-blue-500' },
            { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
            { name: 'Chấp nhận', candidates: 1, color: 'bg-green-500' },
        ],
    },
    {
        title: 'Data Analyst',
        applications: 2,
        stages: [
            { name: 'Chờ xử lý', candidates: 51, color: 'bg-purple-500' },
            { name: 'Đá đánh giá', candidates: 12, color: 'bg-blue-500' },
            { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
            { name: 'Từ chối', candidates: 2, color: 'bg-red-400' },
        ],
    },
    {
        title: 'Marketing Coordinator',
        applications: 32,
        stages: [
            { name: 'Chờ xử lý', candidates: 32, color: 'bg-purple-500' },
            { name: 'Đã đánh giá', candidates: 16, color: 'bg-blue-500' },
            { name: 'Phỏng vấn', candidates: 9, color: 'bg-orange-400' },
            { name: 'Chấp nhận', candidates: 3, color: 'bg-green-500' },
        ],
    },
    {
        title: 'Design Lead',
        applications: 57,
        stages: [
            { name: 'Chờ xử lý', candidates: 72, color: 'bg-purple-500' },
            { name: 'Đã đánh giá', candidates: 33, color: 'bg-blue-500' },
            { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
        ],
    },
    {
        title: 'Project Manager',
        applications: 52,
        stages: [
            { name: 'Chở xử lý', candidates: 19, color: 'bg-purple-500' },
            { name: 'Đã đánh giá', candidates: 8, color: 'bg-blue-500' },
            { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
        ],
    },
];

export default function HiringPipeline() {
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, Vine! ☁️</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Hiring pipeline</h2>
                    <button className="text-blue-500 hover:underline">View all jobs</button>
                </div>

                <div className="relative mb-6">
                    <FaSearch className="absolute left-4 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-sm">
                                <th className="py-2">Jobs</th>
                                <th className="py-2">Stages</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {jobs.map((job, index) => (
                                <tr key={index} className="text-gray-700">
                                    <td className="py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{job.title}</span>
                                            <span className="text-sm text-gray-400">
                                                Total applications: {job.applications}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="py-4">
                                        <div className="flex justify-between gap-2 w-full">
                                            {Array.from({ length: 4 }).map((_, idx) => {
                                                const stage = job.stages[idx];
                                                if (stage) {
                                                    return (
                                                        <div
                                                            key={idx}
                                                            className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl text-white text-sm ${stage.color} flex-1 shadow-md hover:scale-105 hover:brightness-110 transition-all`}
                                                        >
                                                            <span className="truncate">{stage.name}</span>
                                                            <span className="flex items-center justify-center gap-1 text-xs mt-1">
                                                                <FaUser size={12} />
                                                                {stage.candidates}
                                                            </span>
                                                        </div>
                                                    );
                                                } else {
                                                    return <div key={idx} className="flex-1" />;
                                                }
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

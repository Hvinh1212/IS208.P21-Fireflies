'use client';

import React from "react";


//     {
//         title: 'Marketer',
//         applications: 12,
//         stages: [
//             { name: 'Chờ xử lý', candidates: 87, color: 'bg-purple-500' },
//             { name: 'Đã đánh giá', candidates: 52, color: 'bg-blue-500' },
//             { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
//             { name: 'Chấp nhận', candidates: 1, color: 'bg-green-500' },
//             { name: 'Từ chối', candidates: 1, color: 'bg-red-400' },


//         ],
//     },
//     {
//         title: 'Data Analyst',
//         applications: 2,
//         stages: [
//             { name: 'Chờ xử lý', candidates: 51, color: 'bg-purple-500' },
//             { name: 'Đá đánh giá', candidates: 12, color: 'bg-blue-500' },
//             { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
//             { name: 'Từ chối', candidates: 2, color: 'bg-red-400' },
//         ],
//     },
//     {
//         title: 'Marketing Coordinator',
//         applications: 32,
//         stages: [
//             { name: 'Chờ xử lý', candidates: 32, color: 'bg-purple-500' },
//             { name: 'Đã đánh giá', candidates: 16, color: 'bg-blue-500' },
//             { name: 'Phỏng vấn', candidates: 9, color: 'bg-orange-400' },
//             { name: 'Chấp nhận', candidates: 3, color: 'bg-green-500' },
//         ],
//     },
//     {
//         title: 'Design Lead',
//         applications: 57,
//         stages: [
//             { name: 'Chờ xử lý', candidates: 72, color: 'bg-purple-500' },
//             { name: 'Đã đánh giá', candidates: 33, color: 'bg-blue-500' },
//             { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
//         ],
//     },
//     {
//         title: 'Project Manager',
//         applications: 52,
//         stages: [
//             { name: 'Chở xử lý', candidates: 19, color: 'bg-purple-500' },
//             { name: 'Đã đánh giá', candidates: 8, color: 'bg-blue-500' },
//             { name: 'Phỏng vấn', candidates: 2, color: 'bg-orange-400' },
//         ],
//     },
// ];

interface stage {
    name: string;
    candidates: number;
    color: string;
}

export interface job {
    id: string;
    title: string;
    applications: number;
    stages: stage[];
}

interface HiringPipelineProps {
    jobs: job[];
    onJobSelect: (jobId: string) => void;
}

const HiringPipeline: React.FC<HiringPipelineProps> = ({ jobs, onJobSelect }) => {
    return (
        <div className="space-y-6">
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => onJobSelect(job.id)}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                        <span className="text-sm text-gray-500">{job.applications} ứng viên</span>
                    </div>
                    <div className="flex space-x-4">
                        {job.stages.map((stage, index) => (
                            <div key={index} className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-600">{stage.name}</span>
                                    <span className="text-sm text-gray-500">{stage.candidates}</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                        className={`h-full rounded-full ${stage.color}`}
                                        style={{ width: `${(stage.candidates / job.applications) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HiringPipeline;

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface JobCardProps {
    avatar: string;
    title: string;
    company_name: string;
    salary_range: string;
    location: string;
    name_title: string
    job_type: string
    job_id: number
    employer_id: number
    requirements: string
    deadline: string

}


export default function JobCard({ avatar, title, company_name, salary_range, location, name_title, job_type, job_id, employer_id }: JobCardProps) {
    const router = useRouter()
    const handleNavigate = () => {
        router.push(`/JobDetails/${encodeURIComponent(name_title)}-${job_id}-${employer_id}`)
    }
    return (
        <div className="flex items-start gap-4 bg-white border rounded-xl p-4 hover:shadow transition cursor-pointer border-gray-400 hover:border-green-600"
            onClick={handleNavigate}>
            <div className="w-12 h-12 flex-shrink-0 relative my-auto">
                <Image src={avatar && avatar !== "" ? avatar : "/Companies/nvpay.png"}
                    alt={company_name && company_name !== "" ? company_name : ""}
                    fill className="object-contain" />
            </div>
            <div className="flex-1 my-auto ">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight hover:text-green-500">{title}</h3>
                <p className="text-xs text-gray-500 mb-2">{company_name}</p>
                <div className="flex gap-2 flex-wrap text-xs">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{salary_range}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{location}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{job_type}</span>
                </div>
            </div>
            <button className="ml-auto mt-1 text-green-500 hover:text-green-600">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
            6.5 3.5 5 5.5 5c1.54 0 3.04.99 3.57 
            2.36h1.87C13.46 5.99 14.96 5 16.5 
            5 18.5 5 20 6.5 20 8.5c0 3.78-3.4 
            6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </button>
        </div>
    );
}

'use client';

import { useContext, useState } from 'react';
import JobCard from './JobCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from '../AppContexts/Context';
import Link from 'next/link';

export interface Job {
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
    category_id: number
}

const ITEMS_PER_PAGE = 9;

export default function JobList() {
    const context = useContext(DataContext);
    const jobs = context[2] as Job[];

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);

    const paginatedJobs = jobs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };



    return (
        <section className="px-30 bg-gray-50 py-10 ">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-gray-500 uppercase font-semibold">Việc làm tốt nhất</h3>
                    <h2 className="text-4xl font-bold text-black pb-8">
                        Công việc tốt nhất <span className="text-green-600">theo khu vực </span>
                    </h2>
                </div>
                <button className="px-6 py-2 bg-green-600 text-white rounded-full cursor-pointer hover:bg-green-700"
                >
                    <Link href="/AllJob">
                        Xem thêm
                    </Link>
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedJobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 gap-2 text-sm">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-default disabled:hover:border-black cursor-pointer hover:border-green-500"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-default disabled:hover:border-black cursor-pointer hover:border-green-500"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </section>
    );
}

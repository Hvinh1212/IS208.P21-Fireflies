"use client"

import CategoryRadioCheckBox from "../components/Filter/CategoryRadioCheckbox"
import { DataContext } from '../AppContexts/Context';
import { useContext, useState } from "react";
import { Job } from "../components/JobList";
import JobCard from "../components/JobCard";
import { useSearchParams } from "next/navigation";
import LocationCheckbox from "../components/Filter/LocationCheckbox";
import JobTypeCheckbox from "../components/Filter/JobTypeCheckbox";

interface Category {
    id: number
    category_name: string
}

interface Location {
    location: string
}

interface JobType {
    job_type: string
}

export default function AllJob() {
    const context = useContext(DataContext);
    const jobs = context[2] as Job[];
    const categories = context[4] as Category[];
    const locations = context[6] as Location[];
    const job_types = context[8] as JobType[];

    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 10;

    const [categoryOption, setCategoryOption] = useState<Category | null>(
        searchParams.get("category")
            ? categories.find(cat => String(cat.id) === searchParams.get("category")) || null
            : null
    );

    const [locationOptions, setLocationOptions] = useState<Location[]>(
        searchParams.get("locations")
            ? locations.filter(loc => searchParams.get("locations")!.split(",").includes(loc.location))
            : []
    );

    const [jobtypeOptions, setJobtypeOptions] = useState<JobType[]>(
        searchParams.get("jobtypes")
            ? job_types.filter(j => searchParams.get("jobtypes")!.split(",").includes(j.job_type))
            : []
    );

    const filteredJobs = jobs.filter(job => {
        const matchCategory = !categoryOption || job.category_id === categoryOption.id;
        const matchLocation = locationOptions.length === 0 || locationOptions.some(loc => loc.location === job.location);
        const matchJobType = jobtypeOptions.length === 0 || jobtypeOptions.some(jt => jt.job_type === job.job_type);

        return matchCategory && matchLocation && matchJobType;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleClearFilters = () => {
        setCategoryOption(null);
        setLocationOptions([]);
        setJobtypeOptions([]);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Section */}
                    <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Bộ lọc</h2>
                        <div className="space-y-6 ">
                            <div className="">
                                <CategoryRadioCheckBox
                                    dropdownName="Danh mục nghề"
                                    options={categories}
                                    selectedOption={categoryOption}
                                    setSelectedOption={setCategoryOption}
                                />
                            </div>

                            <div>
                                <JobTypeCheckbox
                                    dropdownName="Loại công việc"
                                    options={job_types}
                                    selectedOptions={jobtypeOptions}
                                    setSelectedOptions={setJobtypeOptions}
                                />
                            </div>

                            <div>
                                <LocationCheckbox
                                    dropdownName="Khu vực"
                                    options={locations}
                                    selectedOptions={locationOptions}
                                    setSelectedOptions={setLocationOptions}
                                />
                            </div>

                            <button
                                onClick={handleClearFilters}
                                className="w-full rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600 transition-colors"
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    </div>

                    {/* Job List Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mx-10">
                                    <span className="text-green-500">{filteredJobs.length} công việc</span> được tìm thấy
                                </h2>
                            </div>

                            <div className="space-y-4 mx-10">
                                {currentJobs.map((job, index) => (
                                    <JobCard key={index} {...job} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                                        >
                                            Trước
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-1 rounded-md ${currentPage === page
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
                                        >
                                            Sau
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
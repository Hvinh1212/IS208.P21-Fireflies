'use client';

import HiringPipeline from "../components/HiringTracking";
import SideNavbar from "../components/SidebarNav";
import { useEffect, useState } from "react";
import { job } from "../components/HiringTracking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faFileAlt, faUser, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface RawJob {
    id: number;
    candidate_id: number;
    job_id: number;
    cover_letter: string;
    status: string;
    applied_at: string;
    resume: string;
    email: string | null;
    apply_phone: string | null;
    name: string | null;
    employer_id: number;
    branch_id: number;
    category_id: number;
    title: string;
    description: string;
    requirements: string;
    salary_range: string;
    job_type: string;
    location: string;
    posted_at: string;
    deadline: string;
    applicants: string;
}


const CandidateCard = ({ candidate }: { candidate: RawJob }) => {
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const handleContact = async () => {
        try {
            const response = await fetch('http://localhost:5000/mailtime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Gửi email liên hệ thành công!');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Gửi email liên hệ thất bại!');
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error('Đã xảy ra lỗi khi gửi yêu cầu!');
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        try {
            const response = await fetch(`http://localhost:5000/applications/${candidate.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                toast.success('Cập nhật trạng thái thành công!');
                // Refresh the page to show updated status
                window.location.reload();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Cập nhật trạng thái thất bại!');
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error('Đã xảy ra lỗi khi cập nhật trạng thái!');
        }
        setIsStatusOpen(false);
    };

    const statusOptions = [
        { value: 'chờ xử lý', label: 'Chờ xử lý' },
        { value: 'đã đánh giá', label: 'Đã đánh giá' },
        { value: 'phỏng vấn', label: 'Phỏng vấn' },
        { value: 'chấp nhận', label: 'Chấp nhận' },
        { value: 'từ chối', label: 'Từ chối' },
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-green-600 text-xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{candidate.name || 'Chưa cập nhật'}</h3>
                        <p className="text-sm text-gray-500">Ứng viên #{candidate.candidate_id}</p>
                    </div>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setIsStatusOpen(!isStatusOpen)}
                        className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${candidate.status === 'chờ xử lý' ? 'bg-orange-100 text-orange-600' :
                            candidate.status === 'đã đánh giá' ? 'bg-blue-100 text-blue-600' :
                                candidate.status === 'phỏng vấn' ? 'bg-purple-100 text-purple-600' :
                                    candidate.status === 'chấp nhận' ? 'bg-green-100 text-green-600' :
                                        'bg-red-100 text-red-600'
                            }`}
                    >
                        {candidate.status}
                    </button>
                    {isStatusOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <div className="py-1">
                                {statusOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleStatusChange(option.value)}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 w-5" />
                    <span className="text-gray-600">{candidate.email || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-400 w-5" />
                    <span className="text-gray-600">{candidate.apply_phone || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faFileAlt} className="text-gray-400 w-5" />
                    <a
                        href={candidate.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-700 underline"
                    >
                        Xem CV
                    </a>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-700 mb-2">Thư giới thiệu</h4>
                <p className="text-gray-600 text-sm line-clamp-3">{candidate.cover_letter}</p>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                    Xem chi tiết
                </button>
                <button className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
                    onClick={handleContact}>
                    Liên hệ
                </button>
            </div>
        </div>
    );
};

export default function HiringTracking() {
    const [rawJobs, setRawJobs] = useState<RawJob[]>([]);
    const [roleId, setRoleId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);

    useEffect(() => {
        const storedRoleId = localStorage.getItem("role_id");
        if (storedRoleId) {
            setRoleId(storedRoleId);
        }
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!roleId) return;

            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/applications/employer/${roleId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRawJobs(data);
                } else {
                    setRawJobs([]);
                    setError('Invalid data format received');
                }
            } catch (error) {
                console.error('Failed to fetch applications:', error);
                setError('Failed to load applications');
                setRawJobs([]);
            }
        };
        fetchJobs();
    }, [roleId]);

    const jobs: job[] = Array.isArray(rawJobs) ? Array.from(
        new Map(
            rawJobs.map(application => [
                application.job_id.toString(),
                application.title
            ])
        ).entries()
    ).map(([job_id, title]) => {
        const applicationsForJob = rawJobs.filter(app => app.job_id.toString() === job_id);

        return {
            id: job_id,
            title,
            applications: applicationsForJob.length,
            stages: [
                {
                    name: "Chờ xử lý",
                    candidates: applicationsForJob.filter(app => app.status === "chờ xử lý").length,
                    color: "bg-orange-400",
                },
                {
                    name: "Đã đánh giá",
                    candidates: applicationsForJob.filter(app => app.status === "đã đánh giá").length,
                    color: "bg-blue-500",
                },
                {
                    name: "Phỏng vấn",
                    candidates: applicationsForJob.filter(app => app.status === "phỏng vấn").length,
                    color: "bg-purple-500",
                },
                {
                    name: "Chấp nhận",
                    candidates: applicationsForJob.filter(app => app.status === "chấp nhận").length,
                    color: "bg-green-500",
                },
                {
                    name: "Từ chối",
                    candidates: applicationsForJob.filter(app => app.status === "từ chối").length,
                    color: "bg-red-500",
                },
            ],
        };
    }) : [];

    const selectedJobCandidates = selectedJob
        ? rawJobs.filter(job => job.job_id.toString() === selectedJob)
        : [];

    if (error) {
        return (
            <div className="flex bg-gray-100 py-5 px-10 gap-10 min-h-screen">
                <SideNavbar />
                <div className="flex-1 w-full max-h-screen overflow-y-auto pr-4">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-red-500 text-lg">{error}</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-100 py-5 px-10 gap-10 min-h-screen">
            <SideNavbar />
            <div className="flex-1 w-full max-h-screen overflow-y-auto pr-4">
                <HiringPipeline jobs={jobs} onJobSelect={setSelectedJob} />

                {selectedJob && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Danh sách ứng viên
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {selectedJobCandidates.map((candidate) => (
                                <CandidateCard key={candidate.id} candidate={candidate} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

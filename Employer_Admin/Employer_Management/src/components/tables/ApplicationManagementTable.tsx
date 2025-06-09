"use client"

import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check, X, ShieldCheck } from "lucide-react";
import axios from "axios";

interface Employer {
    job_id: number;
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
    status: string;
    company_name: string;
    industry: string;
    company_size: string;
    website: string;
    avatar: string;
    name_title: string;
    email: string;
    user_id: number;
    full_name: string;
    is_verify: boolean
}

export default function ApplicationManagementTable() {
    const [employers, setEmployers] = useState<Employer[]>([]);
    const [selectedJob, setSelectedJob] = useState<string | null>(null);
    const [showJobDialog, setShowJobDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5000/postsAD');
                const normalized = response.data.map((app: any) => ({
                    ...app,
                    is_verify: app.is_verify === true || app.is_verify === 1 || app.is_verify === "true",
                }));
                setEmployers(normalized);
                setError(null);
            } catch (err) {
                setError('Không thể tải dữ liệu nhà tuyển dụng. Vui lòng thử lại sau.');
                console.error('Error fetching applications:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployers();
    }, []);

    const handleStatusChange = async (jobId: number, verify: boolean) => {
        try {
            await axios.put(`http://localhost:5000/posts/${jobId}/verify`, {
                is_verify: verify
            });

            setEmployers(employers.map(emp =>
                emp.job_id === jobId
                    ? { ...emp, is_verify: verify }
                    : emp
            ));
        } catch (err) {
            console.error('Error updating job status:', err);
            setError('Không thể cập nhật trạng thái. Vui lòng thử lại sau.');
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="w-full">
            {error && (
                <div className="mb-4 p-4 text-red-600 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Mã nhà tuyển dụng
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Tên nhà tuyển dụng
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Tên công ty
                                </TableCell>

                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Bài đăng
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Thao tác
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employers.map((employer) => (
                                <TableRow key={employer.job_id}>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {employer.employer_id}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {employer.full_name}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {employer.company_name}
                                    </TableCell>


                                    <TableCell className="px-5 py-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-2"
                                            onClick={() => {
                                                setSelectedJob(employer.title);
                                                setShowJobDialog(true);
                                            }}
                                        >
                                            <span className="text-sm">Xem tin</span>
                                        </Button>
                                    </TableCell>
                                    <TableCell className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            {!employer.is_verify && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                    onClick={() => handleStatusChange(employer.job_id, true)}
                                                >
                                                    <Check className="h-4 w-4" />
                                                    <span className="text-sm">Duyệt</span>
                                                </Button>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                onClick={() => handleStatusChange(employer.job_id, false)}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="text-sm">Từ chối</span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Job Details Dialog */}
            <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center gap-2">
                                Chi tiết bài đăng
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    {selectedJob && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={employers.find(emp => emp.title === selectedJob)?.avatar}
                                    alt="Company Logo"
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{selectedJob}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {employers.find(emp => emp.title === selectedJob)?.company_name}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">Mô tả công việc</h4>
                                    <p className="whitespace-pre-line text-gray-600 dark:text-gray-400 text-xs">
                                        {employers.find(emp => emp.title === selectedJob)?.description.replace(/\\n/g, '\n')}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Yêu cầu</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {employers.find(emp => emp.title === selectedJob)?.requirements}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Mức lương</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {employers.find(emp => emp.title === selectedJob)?.salary_range}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Loại công việc</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {employers.find(emp => emp.title === selectedJob)?.job_type}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
} 
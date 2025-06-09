"use client";

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

interface Application {
    id: number;
    candidate_id: number;
    name: string | null;
    email: string | null;
    apply_phone: string | null;
    job_id: number;
    cover_letter: string | null;
    resume: string | null;
    is_verify: boolean;
    applied_at: string;
    title: string;
    employer_id: number;
}

export default function ApplicationManagementTable() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedResume, setSelectedResume] = useState<string | null>(null);
    const [showResumeDialog, setShowResumeDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:5000/applications');
                const normalized = response.data.map((app: any) => ({
                    ...app,
                    is_verify: app.is_verify === true || app.is_verify === 1 || app.is_verify === "true",
                }));
                setApplications(normalized);
                setError(null);
            } catch (err) {
                setError('Không thể tải dữ liệu ứng viên. Vui lòng thử lại sau.');
                console.error('Error fetching applications:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []);


    const handleVerifyChange = async (applicationId: number, verify: boolean) => {
        try {
            await axios.put(`http://localhost:5000/applications/${applicationId}/verify`, {
                is_verify: verify
            });

            setApplications(applications.map(app =>
                app.id === applicationId
                    ? { ...app, is_verify: verify }
                    : app
            ));
        } catch (err) {
            console.error('Error updating verification status:', err);
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
                                    Mã ứng viên
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Tên ứng viên
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Tên công việc
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Ngày ứng tuyển
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Resume
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Trạng thái xác thực
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Thao tác
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((application) => (
                                <TableRow key={application.id}>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {application.candidate_id}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {application.name || 'N/A'}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {application.title}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {formatDate(application.applied_at)}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {application.resume ? (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-2"
                                                onClick={() => {
                                                    setSelectedResume(application.resume);
                                                    setShowResumeDialog(true);
                                                }}
                                            >
                                                <span className="text-sm">Xem Resume</span>
                                            </Button>
                                        ) : (
                                            <span className="text-gray-500">Không có</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        {application.is_verify ? (
                                            <Badge color="success" className="flex items-center gap-1">
                                                <ShieldCheck className="h-3 w-3" />
                                                Đã duyệt
                                            </Badge>
                                        ) : (
                                            <Badge color="warning" className="flex items-center gap-1">
                                                Chưa duyệt
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                        <div className="flex items-center gap-2">
                                            {/* Chỉ hiển thị nút "Duyệt" nếu chưa được xác thực */}
                                            {!application.is_verify && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex items-center gap-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                    onClick={() => handleVerifyChange(application.id, true)}
                                                >
                                                    <Check className="h-4 w-4" />
                                                    <span className="text-sm">Duyệt</span>
                                                </Button>
                                            )}

                                            {/* Nút "Từ chối" luôn hiển thị */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                                onClick={() => handleVerifyChange(application.id, false)}
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

            {/* Resume Dialog */}
            <Dialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center gap-2">
                                Resume của ứng viên
                            </div>
                        </DialogTitle>
                    </DialogHeader>
                    {selectedResume && (
                        <iframe
                            src={selectedResume}
                            className="w-full h-[80vh] border-0"
                            title="Resume"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

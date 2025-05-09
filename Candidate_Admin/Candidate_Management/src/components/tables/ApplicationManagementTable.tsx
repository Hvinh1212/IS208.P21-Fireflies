"use client"

import React, { useState } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface Application {
    id: string;
    candidateName: string;
    jobTitle: string;
    status: "pending" | "reviewed" | "interview" | "accepted" | "rejected";
    email: string;
    phone: string;
    resumeUrl: string;
}

// Sample data - replace with actual data from your backend
const initialData: Application[] = [
    {
        id: "APP001",
        candidateName: "Trần Ngọc Minh Trang",
        jobTitle: "Frontend Developer",
        status: "pending",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        resumeUrl: "/resumes/candidate1.pdf"
    },
    {
        id: "APP002",
        candidateName: "Nguyễn Thị Ngọc Trâm",
        jobTitle: "Frontend Developer",
        status: "pending",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        resumeUrl: "/resumes/candidate1.pdf"
    },
    {
        id: "APP003",
        candidateName: "Nguyễn Trần Kim Hân",
        jobTitle: "Frontend Developer",
        status: "pending",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        resumeUrl: "/resumes/candidate1.pdf"
    },
    {
        id: "APP004",
        candidateName: "Nguyễn Ngọc Thịnh",
        jobTitle: "Frontend Developer",
        status: "pending",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        resumeUrl: "/resumes/candidate1.pdf"
    },
    {
        id: "APP005",
        candidateName: "Mai Hoàng Vinh",
        jobTitle: "Frontend Developer",
        status: "pending",
        email: "nguyenvana@email.com",
        phone: "0123456789",
        resumeUrl: "/resumes/candidate1.pdf"
    },
    // Add more sample data as needed
];

export default function ApplicationManagementTable() {
    const [applications, setApplications] = useState<Application[]>(initialData);
    const [selectedResume, setSelectedResume] = useState<string | null>(null);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

    const handleStatusChange = (applicationId: string, newStatus: Application["status"]) => {
        setApplications(applications.map(app =>
            app.id === applicationId ? { ...app, status: newStatus } : app
        ));
    };

    const getStatusColor = (status: Application["status"]) => {
        switch (status) {
            case "pending":
                return "warning";
            case "reviewed":
                return "info";
            case "interview":
                return "primary";
            case "accepted":
                return "success";
            case "rejected":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusText = (status: Application["status"]) => {
        switch (status) {
            case "pending":
                return "Đang xử lý";
            case "reviewed":
                return "Đã đánh giá";
            case "interview":
                return "Phỏng vấn";
            case "accepted":
                return "Chấp nhận";
            case "rejected":
                return "Từ chối";
            default:
                return status;
        }
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
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
                                Email
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Số điện thoại
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Resume
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Trạng thái
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {applications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {application.id}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {application.candidateName}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {application.jobTitle}
                                </TableCell>

                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {application.email}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {application.phone}
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedResume(application.resumeUrl);
                                            setIsResumeOpen(true);
                                        }}
                                    >
                                        <span className="text-sm">Xem Resume</span>
                                    </Button>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Select
                                        value={application.status}
                                        onValueChange={(value: Application["status"]) =>
                                            handleStatusChange(application.id, value)
                                        }
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue>
                                                <Badge color={getStatusColor(application.status)}>
                                                    {getStatusText(application.status)}
                                                </Badge>
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                <Badge color="warning">Đang xử lý</Badge>
                                            </SelectItem>
                                            <SelectItem value="reviewed">
                                                <Badge color="info">Đã đánh giá</Badge>
                                            </SelectItem>
                                            <SelectItem value="interview">
                                                <Badge color="primary">Phỏng vấn</Badge>
                                            </SelectItem>
                                            <SelectItem value="accepted">
                                                <Badge color="success">Chấp nhận</Badge>
                                            </SelectItem>
                                            <SelectItem value="rejected">
                                                <Badge color="error">Từ chối</Badge>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Resume của ứng viên</DialogTitle>
                    </DialogHeader>
                    {selectedResume && (
                        <iframe
                            src={selectedResume}
                            className="w-full h-[600px]"
                            title="Resume PDF"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
} 
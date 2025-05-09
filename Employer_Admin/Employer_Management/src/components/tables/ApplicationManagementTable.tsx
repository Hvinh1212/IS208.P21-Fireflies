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

interface Employer {
    id: string;
    employerName: string;
    branch: string;
    email: string;
    phone: string;
    jobPost: string;
    status: "active" | "inactive";
}

// Sample data - replace with actual data from your backend
const initialData: Employer[] = [
    {
        id: "EMP001",
        employerName: "Công ty TNHH ABC",
        branch: "Hà Nội",
        email: "contact@abc.com",
        phone: "02412345678",
        jobPost: "Frontend Developer",
        status: "active"
    },
    {
        id: "EMP002",
        employerName: "Công ty XYZ",
        branch: "TP.HCM",
        email: "hr@xyz.com",
        phone: "02898765432",
        jobPost: "Backend Developer",
        status: "active"
    },
    {
        id: "EMP003",
        employerName: "Công ty DEF",
        branch: "Đà Nẵng",
        email: "career@def.com",
        phone: "02361234567",
        jobPost: "Full Stack Developer",
        status: "inactive"
    },
    {
        id: "EMP004",
        employerName: "Công ty GHI",
        branch: "Hải Phòng",
        email: "info@ghi.com",
        phone: "02251234567",
        jobPost: "UI/UX Designer",
        status: "active"
    },
    {
        id: "EMP005",
        employerName: "Công ty JKL",
        branch: "Cần Thơ",
        email: "contact@jkl.com",
        phone: "02921234567",
        jobPost: "DevOps Engineer",
        status: "inactive"
    }
];

export default function ApplicationManagementTable() {
    const [employers, setEmployers] = useState<Employer[]>(initialData);

    const [selectedResume, setSelectedResume] = useState<string | null>(null);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const handleStatusChange = (employerId: string, newStatus: Employer["status"]) => {
        setEmployers(employers.map(emp =>
            emp.id === employerId ? { ...emp, status: newStatus } : emp
        ));
    };

    const getStatusColor = (status: Employer["status"]) => {
        switch (status) {
            case "active":
                return "success";
            case "inactive":
                return "error";
            default:
                return "default";
        }
    };

    const getStatusText = (status: Employer["status"]) => {
        switch (status) {
            case "active":
                return "Đang hiển thị";
            case "inactive":
                return "Đang ẩn";
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
                                Mã nhà tuyển dụng
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Tên nhà tuyển dụng
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Chi nhánh
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Email
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Số điện thoại
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Bài đăng
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Trạng thái
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {employers.map((employer) => (
                            <TableRow key={employer.id}>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {employer.id}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {employer.employerName}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {employer.branch}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {employer.email}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    {employer.phone}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-gray-800 dark:text-white/90">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedResume(employer.jobPost);
                                            setIsResumeOpen(true);
                                        }}
                                    >
                                        Xem tin
                                    </Button>
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                    <Select
                                        value={employer.status}
                                        onValueChange={(value: Employer["status"]) =>
                                            handleStatusChange(employer.id, value)
                                        }
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue>
                                                <Badge color={getStatusColor(employer.status)}>
                                                    {getStatusText(employer.status)}
                                                </Badge>
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">
                                                <Badge color="success">Đang hiển thị</Badge>
                                            </SelectItem>
                                            <SelectItem value="inactive">
                                                <Badge color="error">Đang ẩn</Badge>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
} 
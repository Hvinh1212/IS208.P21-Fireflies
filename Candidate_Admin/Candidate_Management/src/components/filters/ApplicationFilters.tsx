'use client';

import React from "react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function ApplicationFilters() {
    const [status, setStatus] = React.useState("all");
    const [position, setPosition] = React.useState("all");
    const [searchQuery, setSearchQuery] = React.useState("");
    const [date, setDate] = React.useState("");

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Tìm kiếm
                    </label>
                    <Input
                        type="text"
                        placeholder="Tìm theo tên, email..."
                        className="w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Trạng thái
                    </label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue>Tất cả trạng thái</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả trạng thái</SelectItem>
                            <SelectItem value="pending">Đang xử lý</SelectItem>
                            <SelectItem value="reviewed">Đã đánh giá</SelectItem>
                            <SelectItem value="interview">Phỏng vấn</SelectItem>
                            <SelectItem value="accepted">Chấp nhận</SelectItem>
                            <SelectItem value="rejected">Từ chối</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Vị trí
                    </label>
                    <Select value={position} onValueChange={setPosition}>
                        <SelectTrigger>
                            <SelectValue>Tất cả vị trí</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả vị trí</SelectItem>
                            <SelectItem value="frontend">Frontend Developer</SelectItem>
                            <SelectItem value="backend">Backend Developer</SelectItem>
                            <SelectItem value="fullstack">Fullstack Developer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ngày ứng tuyển
                    </label>
                    <Input
                        type="date"
                        className="w-full"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
} 
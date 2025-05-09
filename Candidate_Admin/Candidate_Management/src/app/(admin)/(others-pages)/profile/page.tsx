import ApplicationManagementTable from "@/components/tables/ApplicationManagementTable";
import ApplicationFilters from "@/components/filters/ApplicationFilters";
import { Metadata } from "next";
import React from "react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quản lý ứng tuyển",
  description: "Trang quản lý ứng tuyển cho hệ thống tuyển dụng",
};

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý ứng tuyển
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý và theo dõi các đơn ứng tuyển của ứng viên
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Xuất Excel
          </Button>
          <Button>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 21v-8H7v8"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 3v5h10V3"
              />
            </svg>
            Lưu cập nhật
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <ApplicationFilters />

      {/* Table Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <ApplicationManagementTable />
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Hiển thị 1-10 của 100 kết quả
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Trước
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}

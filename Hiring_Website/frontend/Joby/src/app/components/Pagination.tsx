"use client";

import React from "react";

type PaginateProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Paginate: React.FC<PaginateProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        const maxPageNumbersToShow = 5;

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 3) pageNumbers.push("...");

            const start = Math.max(currentPage - 1, 2);
            const end = Math.min(currentPage + 1, totalPages - 1);
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (currentPage < totalPages - 2) pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="flex justify-center space-x-2 mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md transition ${currentPage === 1 ? "bg-gray-300 text-gray-600" : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
            >
                Trước
            </button>

            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== "..." && handlePageChange(Number(page))}
                    disabled={page === "..."}
                    className={`px-3 py-1 rounded-md transition ${page === currentPage
                            ? "bg-blue-500 text-white"
                            : page === "..."
                                ? "text-gray-500 cursor-default"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md transition ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
            >
                Sau
            </button>
        </div>
    );
};

export default Paginate;

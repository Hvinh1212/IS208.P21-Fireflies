"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Application = {
  applied_at: string;
};

interface MonthlyTargetProps {
  applications: Application[];
}

export default function MonthlyTarget({ applications }: MonthlyTargetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const series = [75.55];

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const todayCount = applications.filter((a) => {
    const date = new Date(a.applied_at);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  }).length;

  const monthCount = applications.filter((a) => {
    const date = new Date(a.applied_at);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  }).length;

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: { size: "80%" },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: { lineCap: "round" },
    labels: ["Progress"],
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Mục tiêu tháng
            </h3>
            <p className="mt-1 font-normal text-gray-500 text-theme-sm dark:text-gray-400">
              Chưa đặt mục tiêu tháng này
            </p>
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
            <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
              <DropdownItem onItemClick={closeDropdown}>View More</DropdownItem>
              <DropdownItem onItemClick={closeDropdown}>Delete</DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="relative ">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            +10%
          </span>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          {todayCount} lượt ứng tuyển hôm nay, nhiều hơn tháng trước
        </p>
      </div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Mục tiêu
          </p>
          <p className="text-base font-semibold text-center text-gray-800 dark:text-white/90 sm:text-lg">
            50
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Thực tế
          </p>
          <p className="text-base font-semibold text-center text-gray-800 dark:text-white/90 sm:text-lg">
            {monthCount}
          </p>
        </div>

        <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

        <div>
          <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
            Hôm nay
          </p>
          <p className="text-base font-semibold text-center text-gray-800 dark:text-white/90 sm:text-lg">
            {todayCount}
          </p>
        </div>
      </div>
    </div>
  );
}

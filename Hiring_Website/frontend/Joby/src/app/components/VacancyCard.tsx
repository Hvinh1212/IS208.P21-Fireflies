"use client";

import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import {
  faEye,
  faHourglassHalf,
  faToggleOff,
  faToggleOn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export interface VacancyCardProps {
  title: string;
  deadline: string;
  views: number;
  applicants: number;
  color: "blue" | "red" | "purple";
  status: string
  job_id: string;
  employer_id: string;
  name_title: string;
  is_verify: boolean;
  onDelete: (job_id: string) => void;
  onShow: (job_id: string) => void;
  onHide: (job_id: string) => void;
}

export default function VacancyCard({
  title,
  deadline,
  views,
  applicants,
  status,
  job_id,
  employer_id,
  name_title,
  is_verify,
  onDelete,
  onShow,
  onHide,
}: VacancyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShow, setIsShow] = useState(status === "đang hiển thị" ? true : false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowVacancy = () => {
    onShow(job_id);
    setIsShow(true);
    closeModal();
  };

  const handleHideVacancy = () => {
    onHide(job_id);
    setIsShow(false);
    closeModal();
  };

  return (
    <>
      <div className={`${!isShow ? 'opacity-50' : ''} bg-white rounded-xl p-4 shadow-md flex flex-col gap-4 w-full`}>
        {isModalOpen ? (
          <div className="inset-0 flex items-center justify-center bg-opacity-100">
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                {isShow ? "Ẩn" : "Hiện"} tin tuyển dụng
              </h2>
              <p className="mb-3">
                Bạn có chắc chắn muốn {isShow ? "ẩn" : "hiện"} tin tuyển dụng này không?
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
                  onClick={isShow ? handleHideVacancy : handleShowVacancy}
                >
                  {isShow ? "Ẩn tin" : "Hiện tin"}
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer"
                  onClick={closeModal}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        ) : (<div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-400">Vị trí</p>
              <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
              <br />
            </div>
            <div>
              {is_verify ? (
                <button>
                  {isShow ? (
                    <FontAwesomeIcon
                      icon={faToggleOn}
                      className="text-2xl cursor-pointer text-green-500"
                      onClick={openModal}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faToggleOff}
                      className="text-2xl cursor-pointer text-gray-500"
                      onClick={openModal}
                    />
                  )}
                </button>
              ) : (
                <span className="text-red-500 font-semibold">Chờ phê duyệt</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon icon={faHourglassHalf} />
              </span>
              <span>
                Deadline:{" "}
                <span className="font-medium">
                  {deadline.split("T")[0].split("-").reverse().join("-")}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span>Views: {views}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span>Applicants: {applicants}</span>
            </div>
          </div>

          <div className="flex justify-center pt-2 border-t">
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <Link href={`/JobDetails/${name_title}-${job_id}-${employer_id}`}>
                <FaEye size={20} />
              </Link>
            </button>
          </div>
        </div>)}


      </div>
    </>
  );
}

"use client";

import VacancyCard, { VacancyCardProps } from "../components/VacancyCard";
import SideNavbar from "../components/SidebarNav";
import { useState, useEffect } from "react";
import AddVacancyModal from "../components/AddVacancyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function VacancyList() {
  const [vacancies, setVacancies] = useState<VacancyCardProps[]>([]);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const storedRoleId = localStorage.getItem("role_id");
    if (storedRoleId) {
      setRoleId(storedRoleId);
    }
  }, []);

  useEffect(() => {
    if (!roleId) return;

    setIsLoading(true);

    fetch(`http://localhost:5000/posts/employer/${roleId}`)
      .then((res) => res.json())
      .then((data) => setVacancies(data))
      .catch((err) => console.error("Lỗi khi fetch bài tuyển dụng:", err))
      .finally(() => setIsLoading(false));
  }, [roleId]);

  const vacancy_update = vacancies.map((vacancy) => ({
    ...vacancy,
    views: Math.floor(Math.random() * 10000),
  }));

  const handleDeleteVacancy = (job_id: string) => {
    setVacancies((prev) => prev.filter((vacancy) => vacancy.job_id !== job_id));
  };

  const handleShowVacacy = (job_id: string) => {
    fetch(`http://localhost:5000/posts/show/${job_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleHideVacancy = (job_id: string) => {
    fetch(`http://localhost:5000/posts/hide/${job_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const handleAddVacancy = async (vacancyData: any) => {
    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...vacancyData,
          employer_id: roleId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add vacancy');
      }

      const newVacancy = await response.json();
      setVacancies(prev => [...prev, newVacancy]);
    } catch (error) {
      console.error('Error adding vacancy:', error);
    }
  };

  return (
    <div className="flex bg-gray-100 py-5 px-10 gap-10 min-h-screen">
      <SideNavbar />
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tin tuyển dụng</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
            Thêm tin tuyển dụng
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vacancies.length > 0 ? (
            vacancy_update.map((vacancy, index) => (
              <VacancyCard
                key={index}
                {...vacancy}
                onDelete={handleDeleteVacancy}
                onShow={handleShowVacacy}
                onHide={handleHideVacancy}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              Không có tin tuyển dụng
            </div>
          )}
        </div>
      </div>
      {showAddModal && (
        <AddVacancyModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddVacancy}
        />
      )}
    </div>
  );
}

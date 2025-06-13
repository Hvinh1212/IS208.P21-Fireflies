"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import SideNavbar from '../components/SidebarNav';
import { useRouter } from 'next/navigation';

interface JobTest {
    id: number;
    job_id: number;
    title: string
    test_name: string;
    test_description: string;
    duration: number;
}

interface TestQuestion {
    id: number;
    test_id: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    mark: number;
}

export default function JobTests() {
    const router = useRouter()
    const [tests, setTests] = useState<JobTest[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedTest, setSelectedTest] = useState<JobTest | null>(null);
    const [questions, setQuestions] = useState<TestQuestion[]>([]);

    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');
    const [duration, setDuration] = useState(30);
    const [jobId, setJobId] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTestId, setDeleteTestId] = useState<number | null>(null);

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:5000/jobtest');
            setTests(response.data);
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const handleCreateTest = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/jobtest', {
                job_id: parseInt(jobId),
                test_name: testName,
                test_description: testDescription,
                duration: duration
            });
            setShowCreateModal(false);
            fetchTests();
            resetForm();
        } catch (error) {
            console.error('Error creating test:', error);
        }
    };

    const handleDeleteTest = (testId: number) => {
        setDeleteTestId(testId);
        setShowDeleteModal(true);
    };

    const handleEdit = (testId: number) => {
        router.push(`/JobTests/${testId}/questions`);
    }

    const confirmDeleteTest = async () => {
        if (deleteTestId == null) return;
        try {
            await axios.delete(`http://localhost:5000/jobtest/${deleteTestId}`);
            fetchTests();
        } catch (error) {
            console.error('Error deleting test:', error);
        } finally {
            setShowDeleteModal(false);
            setDeleteTestId(null);
        }
    };

    const resetForm = () => {
        setTestName('');
        setTestDescription('');
        setDuration(30);
        setJobId('');
    };

    return (
        <div className="flex bg-gray-100 py-5 px-10 gap-10 min-h-screen">
            <SideNavbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Kiểm tra đầu vào</h1>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Thêm bài kiểm tra
                    </button>
                </div>

                {/* Tests Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bài kiểm tra</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã công việc</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Công việc</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời lượng (phút)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tests.map((test) => (
                                <tr key={test.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{test.test_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{test.job_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{test.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{test.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex gap-5">
                                            <button
                                                onClick={() => {
                                                    handleEdit(test.id);
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>

                                            <button
                                                onClick={() => handleDeleteTest(test.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Create Test Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
                            <h2 className="text-xl font-bold mb-4">Thêm bài kiểm tra</h2>
                            <form onSubmit={handleCreateTest}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Mã công việc
                                    </label>
                                    <input
                                        type="number"
                                        value={jobId}
                                        onChange={(e) => setJobId(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Tên bài kiểm tra
                                    </label>
                                    <input
                                        type="text"
                                        value={testName}
                                        onChange={(e) => setTestName(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Mô tả
                                    </label>
                                    <textarea
                                        value={testDescription}
                                        onChange={(e) => setTestDescription(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Thời lượng (phút)
                                    </label>
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(parseInt(e.target.value))}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            resetForm();
                                        }}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* View Test Modal */}
                {showViewModal && selectedTest && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 w-full max-w-4xl">
                            <h2 className="text-xl font-bold mb-4">{selectedTest.test_name}</h2>
                            <div className="mb-4">
                                <p className="text-gray-700">{selectedTest.test_description}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-gray-700">Duration: {selectedTest.duration} phút</p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirm Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 w-full max-w-sm">
                            <h2 className="text-xl font-bold mb-4 text-red-600">Xác nhận xóa</h2>
                            <p className="mb-6">Bạn có chắc chắn muốn xóa bài test này không?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={confirmDeleteTest}
                                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

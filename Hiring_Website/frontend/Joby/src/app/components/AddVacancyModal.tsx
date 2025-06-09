import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface AddVacancyModalProps {
    onClose: () => void;
    onAdd: (vacancyData: any) => void;
}

interface Branch {
    branch_id: string;
    name: string;
}

interface Category {
    category_id: string;
    name: string;
}

export default function AddVacancyModal({ onClose, onAdd }: AddVacancyModalProps) {
    const [formData, setFormData] = useState({
        title: '',
        salary_range: '',
        location: '',
        requirements: '',
        job_type: '',
        description: '',
        branch_id: '',
        category_id: '',
        deadline: '',
    });

    const [branches, setBranches] = useState<Branch[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/branches')
            .then(res => res.json())
            .then(data => setBranches(data))
            .catch(err => console.error('Error fetching branches:', err));

        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedDescription = formData.description.replace(/\n/g, '\\n');

        onAdd({
            ...formData,
            description: formattedDescription,
            deadline: formData.deadline,
        });

        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-10 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 w-[800px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Thêm tin tuyển dụng mới</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mức lương</label>
                        <input
                            type="text"
                            name="salary_range"
                            value={formData.salary_range}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Địa điểm</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Yêu cầu</label>
                        <textarea
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hình thức làm việc</label>
                        <select
                            name="job_type"
                            value={formData.job_type}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        >
                            <option value="">Chọn hình thức</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="freelance">Freelance</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngành nghề</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        >
                            <option value="">Chọn ngành nghề</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Chi nhánh</label>
                        <select
                            name="branch_id"
                            value={formData.branch_id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        >
                            <option value="">Chọn chi nhánh</option>
                            {branches.map(branch => (
                                <option key={branch.branch_id} value={branch.branch_id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô tả công việc và Quyền lợi</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={8}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hạn nộp hồ sơ</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Thêm tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
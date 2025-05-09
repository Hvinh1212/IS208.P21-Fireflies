import React, { useState, ChangeEvent } from "react";
import { useParams } from "next/navigation"
import axios from "axios";


interface ApplyModalProps {
    onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ onClose }) => {

    const [resume, setResume] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [apply_phone, setApply_Phone] = useState("");
    const [cover_letter, setCover_Letter] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResume(e.target.files[0]);
        }
    };

    const params = useParams();
    const slugId = params.slugId as string;

    const extractIdsFromSlug = (slug: string) => {
        const parts = slug.split("-");
        const job_id = parts[parts.length - 2];
        const companyId = parts[parts.length - 1];
        return { job_id, companyId };
    };

    const { job_id, companyId } = extractIdsFromSlug(slugId);
    const role_id = localStorage.getItem('role_id')
    console.log('role_id: ', role_id)
    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('role_id', role_id || '');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('apply_phone', apply_phone);
            formData.append('job_id', job_id);
            formData.append('cover_letter', cover_letter);
            if (resume) {
                formData.append('resume', resume);
            }

            const response = await axios.post('http://localhost:5000/upload/apply', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    onClose();
                }, 2000);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại!');
        }
    };

    return (
        <>
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] animate-fadeIn">
                    <div className="bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-300 ease-in-out animate-slideUp">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ứng tuyển thành công!</h3>
                            <p className="text-gray-600">Cảm ơn bạn đã ứng tuyển. Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative transform transition-all duration-300 ease-in-out animate-slideUp flex flex-col max-h-[90vh]">
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 z-10"
                        onClick={onClose}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-8 overflow-y-auto">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-green-700 mb-2">
                                    Ứng tuyển vị trí
                                </h2>
                                <h3 className="text-xl text-green-900 font-semibold">
                                    C&B Supervisor (Giám Sát Tiền Lương & Phúc Lợi)
                                </h3>
                                <p className="text-green-600 mt-1">Thu Nhập Hấp Dẫn</p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-green-100">
                                <div className="space-y-6">
                                    <div className="relative">
                                        <label className="block font-semibold text-gray-700 mb-3">
                                            Chọn CV để ứng tuyển
                                        </label>
                                        <div className="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-400 transition-colors duration-200">
                                            <div className="text-5xl mb-3">📄</div>
                                            <p className="text-gray-600 font-medium">
                                                {resume ? resume.name : "Tải lên CV từ máy tính"}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Hỗ trợ định dạng .doc, .docx, pdf &lt; 5MB
                                            </p>
                                            <input
                                                type="file"
                                                accept=".doc,.docx,.pdf"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Họ và tên <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nhập họ và tên của bạn"
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Nhập email của bạn"
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Số điện thoại <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="Nhập số điện thoại của bạn"
                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                                value={apply_phone}
                                                onChange={(e) => setApply_Phone(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-green-100">
                                <label className="font-semibold text-gray-700 flex items-center gap-2 mb-3">
                                    <span className="text-green-600">✍️</span> Thư giới thiệu
                                </label>
                                <p className="text-sm text-gray-600 mb-4">
                                    Một thư giới thiệu ngắn gọn, chỉn chu sẽ giúp bạn trở nên chuyên nghiệp và gây ấn tượng hơn với nhà tuyển dụng.
                                </p>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                                    rows={4}
                                    placeholder="Viết giới thiệu ngắn gọn về bản thân (điểm mạnh, điểm yếu) và nêu rõ mong muốn..."
                                    value={cover_letter}
                                    onChange={(e) => setCover_Letter(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 p-6 bg-white rounded-b-2xl">
                        <div className="flex flex-col sm:flex-row justify-end gap-4">
                            <button
                                onClick={onClose}
                                className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                <span>Hủy</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30"
                            >
                                <span>Nộp hồ sơ ứng tuyển</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 text-center mt-4">
                            Bằng cách nhấn nút "Nộp hồ sơ ứng tuyển", bạn đồng ý với các điều khoản và điều kiện của chúng tôi
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplyModal;

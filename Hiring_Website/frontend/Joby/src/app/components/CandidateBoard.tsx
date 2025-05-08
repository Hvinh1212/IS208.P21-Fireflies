import { useState } from 'react';

const stages = [
    { title: 'Chờ xử lý', color: 'border-purple-500' },
    { title: 'Đã đánh giá', color: 'border-blue-500' },
    { title: 'Phỏng vấn', color: 'border-orange-500' },
    { title: 'Chấp nhận', color: 'border-green-500' },
    { title: 'Từ chối', color: 'border-red-500' },

];

const candidates = [
    { name: 'Mason Hayes', stage: 'Chờ xử lý', stars: 5 },
    { name: 'Ethan Fisher', stage: 'Đã đánh giá', stars: 4 },
    { name: 'Mateo Ramirez', stage: 'Phỏng vấn', stars: 4.5 },
    { name: 'Samuel Clarke', stage: 'Chấp nhận', stars: 4 },
    { name: 'Luca Rossi', stage: 'Từ chối', stars: 5 },
    { name: 'Mason Hayes', stage: 'Chờ xử lý', stars: 5 },
    { name: 'Ethan Fisher', stage: 'Đã đánh giá', stars: 4 },
    { name: 'Mateo Ramirez', stage: 'Phỏng vấn', stars: 4.5 },
    { name: 'Samuel Clarke', stage: 'Chấp nhận', stars: 4 },
    { name: 'Luca Rossi', stage: 'Từ chối', stars: 5 },
    { name: 'Mason Hayes', stage: 'Chờ xử lý', stars: 5 },
    { name: 'Ethan Fisher', stage: 'Đã đánh giá', stars: 4 },
    { name: 'Mateo Ramirez', stage: 'Phỏng vấn', stars: 4.5 },
    { name: 'Samuel Clarke', stage: 'Chấp nhận', stars: 4 },
    { name: 'Luca Rossi', stage: 'Từ chối', stars: 5 },
    // Add thêm data tùy thích
];

const CandidateBoard = () => {
    const [search, setSearch] = useState('');

    const filteredCandidates = candidates.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="px-4">
            <h1 className="text-3xl font-bold pb-2">Tổng quan</h1>
            <div className='mb-3 font-semibold '>Tổng số ứng viên <span className='bg-gray-200 p-1 rounded-md mx-2 font-normal'>12</span> </div>

            <div className="grid grid-cols-5 gap-6">
                {stages.map(stage => (
                    <div key={stage.title} className="bg-white rounded-lg shadow p-4">
                        <div className={`border-b-4 ${stage.color} pb-2 mb-4`}>
                            <h3 className="text-lg font-semibold">{stage.title}</h3>
                            <p className="text-sm text-gray-500">
                                {filteredCandidates.filter(c => c.stage === stage.title).length} ứng viên
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {filteredCandidates.filter(c => c.stage === stage.title).map((c, idx) => (
                                <div key={idx} className="p-3 border rounded shadow-sm">
                                    <div className="font-medium border-b pb-4 border-gray-300">{c.name}</div>
                                    <div className='flex justify-between'>
                                        <div className="text-yellow-500">
                                            {'★'.repeat(Math.floor(c.stars))}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">2d</div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateBoard;

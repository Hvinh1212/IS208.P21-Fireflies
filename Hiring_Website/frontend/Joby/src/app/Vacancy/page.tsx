import VacancyCard from '../components/VacancyCard';
import SideNavbar from "../components/SidebarNav"


const vacancies = [
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'red',
        isActive: false,
    },
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'red',
        isActive: false,
    },
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'purple',
        isActive: false,
    },
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'blue',
        isActive: false,
    },
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'red',
        isActive: false,
    },
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'purple',
        isActive: false,
    },
    {
        position: "UI/UX Designer",
        deadline: "MAR 4 2024",
        views: 6728,
        applicants: 293,
        color: 'blue',
        isActive: false,
    },
] as const


export default function VacancyList() {
    return (
        <div className="flex bg-gray-100 py-5 px-10 gap-10 min-h-screen">
            <SideNavbar />
            <div className="flex-1 w-full">
                <h1 className="text-3xl font-bold mb-8">Tin tuyển dụng</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {vacancies.map((vacan, index) => (
                        <VacancyCard key={index} {...vacan} />
                    ))}
                </div>
            </div>
        </div>
    );
}


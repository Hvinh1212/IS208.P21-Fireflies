"use client";
import BlogCard from "./BlogCard";

export default function BlogSection() {
    const blogPosts = [
        {
            image: "/Banners/tech.jpg",
            category: "Kinh doanh",
            author: "Hoàng Vinh",
            date: "13 Dec 2024",
            title: "Xu hướng kinh doanh 2025. Còn trở ngại nào đối với doanh nghiệp Việt Nam?",
            excerpt:
                "Những biến động gần đây ảnh hưởng ít nhiều đến xu hướng phát triển kinh tế trong và ngoài nước...",
            link: "#",
        },
        {
            image: "/Banners/b8.png",
            category: "Chứng khoán",
            author: "Hoàng Vinh",
            date: "12 Dec 2024",
            title: "BTC: Có nên đầu tư theo quỹ phòng hộ tài chính?",
            excerpt:
                "Thời gian qua, BTC và thị trường tiền ảo đang trải qua những biến động chưa từng có...",
            link: "#",
        },
        {
            image: "/Banners/b5.jpg",
            category: "Việc làm",
            author: "Hoàng Vinh",
            date: "11 Dec 2024",
            title: "Top những ngành nghề dự đoán bùng nổ nhân lực trong 5 năm sắp tới",
            excerpt:
                "Thị trường lao động đầu năm 2025 đang có sự chuyển đổi đáng kể...",
            link: "#",
        }];

    return (
        <section className="py-12 bg-white">
            {/* Tiêu đề chính */}
            <div className="flex items-center justify-between text-center mx-4 md:mx-12 lg:mx-32">
                <div className="text-left">
                    <h3 className="text-gray-500 uppercase font-semibold">Tin tức</h3>
                    <h2 className="text-4xl font-bold text-black">
                        Tin tức <span className="text-green-600"> mới nhất</span>
                    </h2>
                </div>
                <button className="px-6 py-2 bg-green-600 text-white rounded-full cursor-pointer hover:bg-green-700">
                    View All Blogs
                </button>
            </div>

            {/* Danh sách bài viết */}
            <div className="mt-8 flex flex-wrap justify-center gap-6 mx-4 md:mx-12 lg:mx-32">
                {/* Danh sách bài viết (chỉ hiển thị 3 blog) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
                    {blogPosts.slice(0, 3).map((post, index) => (
                        <BlogCard
                            key={index}
                            imageSrc={post.image}
                            tag={post.category}
                            author={post.author}
                            date={post.date}
                            title={post.title}
                            excerpt={post.excerpt}
                            href={post.link}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

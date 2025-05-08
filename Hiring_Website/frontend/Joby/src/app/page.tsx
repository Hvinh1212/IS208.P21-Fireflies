import BlogSection from "./components/BlogSection";
import Hero from "./components/Hero";
import JobList from "./components/JobList";
import TopCompanies from "./components/TopCompanies";
import TopProfession from "./components/TopProfession";
import Trending from "./components/Trending";


export default function Home() {
  return (
    <div>
      <Hero />
      <TopCompanies />
      <JobList />
      <TopProfession />
      <Trending />
      <BlogSection />
    </div>
  )
}
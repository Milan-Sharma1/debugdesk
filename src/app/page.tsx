import HeroSection from "../components/home/HeroSection";
import LatestQuestions from "../components/home/LatestQuestions";
import TopContributers from "../components/home/TopContributers";

export default function Home() {
    return (
        <>
            <HeroSection />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-12 items-start">
                <LatestQuestions />
                <div className="flex justify-center flex-col items-center py-5">
                    <span className="text-2xl pb-3">Top Contributers</span>
                    <TopContributers />
                </div>
            </div>
        </>
    );
}

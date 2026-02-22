import MusicDiscoveryCard from "../../component/card/MusicDiscoveryCard";
import Footer from "../../component/footer/Footer";

export default function Home() {
    return (
        <div className="flex h-full w-full bg-[#121212] text-white overflow-hidden">
            <main
                className={`
                    flex-1 w-full overflow-y-auto overflow-x-hidden
                    transition-all duration-300 ease-in-out
                    scrollbar-hover overflow-x-hidden
                `}
            >
                <div className="w-full h-full">
                    <MusicDiscoveryCard />
                    <Footer />
                </div>
            </main>
        </div>
    );
}
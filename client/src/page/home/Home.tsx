import HomeSidebar from "../../component/sidebar/HomeSidebar";
import Header from "../../component/header/Header";
import MusicDiscovery from "../../component/card/card";

export default function Home() {
    return (
        <div className="flex flex-col h-screen w-full bg-black overflow-hidden">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <HomeSidebar />

                <main className="flex-1 overflow-y-auto bg-[#121212] scroll-smooth">
                    <div className="p-8 max-w-[1400px] mx-auto">
                        <MusicDiscovery />
                    </div>
                </main>
            </div>
        </div>
    );
}
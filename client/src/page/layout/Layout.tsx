import HomeSidebar from "../../component/sidebar/HomeSidebar";
import Header from "../../component/header/Header";
import PlayerFooter from "../../component/footer/PlayerFooter";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-black">
            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <HomeSidebar />
                    <main className="lg:ps-2 flex-1 overflow-y-hidden bg-[#121212] scroll-smooth">
                        <div className="max-w-[1400px] mx-auto h-full">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>

            <div className="shrink-0 z-50">
                <PlayerFooter />
            </div>

        </div>
    );
}
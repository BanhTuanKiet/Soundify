import HomeSidebar from "../../component/sidebar/HomeSidebar";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <HomeSidebar />

                <main className="lg:ps-2 flex-1 overflow-y-auto bg-[#121212] scroll-smooth">
                    <div className="max-w-[1400px] mx-auto">
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
import HomeSidebar from "../../component/sidebar/HomeSidebar";
import Header from "../../component/header/Header";

export default function Home() {
    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Header ở trên */}
            <Header />

            {/* Body */}
            <div className="flex flex-1">
                {/* Sidebar bên trái */}
                <HomeSidebar />

                {/* Main content */}
                <div className="flex-1 bg-neutral-900">
                    {/* main content */}
                </div>
            </div>
        </div>
    );
}

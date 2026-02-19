import { Instagram, LucideFacebook, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-gray-400 py-16 px-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap justify-between gap-8 mb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 flex-grow">
                        <div>
                            <h3 className="text-white font-bold uppercase mb-4 text-[13px] tracking-widest">
                                Company
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Jobs</a></li>
                                <li><a href="#" className="hover:text-white transition">For the Record</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold uppercase mb-4 text-[13px] tracking-widest">
                                Communities
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">For Artists</a></li>
                                <li><a href="#" className="hover:text-white transition">Developers</a></li>
                                <li><a href="#" className="hover:text-white transition">Advertising</a></li>
                                <li><a href="#" className="hover:text-white transition">Investors</a></li>
                                <li><a href="#" className="hover:text-white transition">Vendors</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold uppercase mb-4 text-[13px] tracking-widest">
                                Useful links
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">Support</a></li>
                                <li><a href="#" className="hover:text-white transition">Free Mobile App</a></li>
                                <li><a href="#" className="hover:text-white transition">Popular by Country</a></li>
                                <li><a href="#" className="hover:text-white transition">Import your music</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-bold uppercase mb-4 text-[13px] tracking-widest">
                                Spotify Plans
                            </h3>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition">Premium Individual</a></li>
                                <li><a href="#" className="hover:text-white transition">Premium Student</a></li>
                                <li><a href="#" className="hover:text-white transition">Spotify Free</a></li>
                            </ul>
                        </div>

                    </div>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="w-10 h-10 bg-[#292929] rounded-full flex items-center justify-center hover:bg-gray-600 transition"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-[#292929] rounded-full flex items-center justify-center hover:bg-gray-600 transition"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-[#292929] rounded-full flex items-center justify-center hover:bg-gray-600 transition"
                        >
                            <LucideFacebook size={20} />
                        </a>
                    </div>
                </div>

                <hr className="border-gray-800 mb-8" />

                <div className="flex flex-wrap justify-between items-center text-xs text-gray-400 gap-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <a href="#" className="hover:text-white transition">Legal</a>
                        <a href="#" className="hover:text-white transition">Safety & Privacy Center</a>
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Cookies</a>
                        <a href="#" className="hover:text-white transition">About Ads</a>
                        <a href="#" className="hover:text-white transition">Accessibility</a>
                    </div>
                    <p>&copy; 2026 Spotify AB</p>
                </div>
            </div>
        </footer>
    )
};
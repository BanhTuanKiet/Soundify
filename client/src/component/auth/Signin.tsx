import { useState } from "react";

const SpotifyLogo = () => (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
);

const GoogleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

const AppleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1877F2]" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v12z" />
    </svg>
);

const GreenButton = ({
    children,
    onClick,
    type = "button",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
}) => (
    <button
        type={type}
        onClick={onClick}
        className="w-full py-3.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] active:scale-[0.98] transition-all duration-150 font-bold text-black text-sm tracking-wider"
    >
        {children}
    </button>
);

const SocialButton = ({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) => (
    <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-[#3e3e3e] hover:border-white transition-colors duration-150 text-white text-sm font-semibold"
    >
        <span className="w-5 flex-shrink-0">{icon}</span>
        <span>{label}</span>
    </button>
);

const Divider = () => (
    <div className="flex items-center gap-4 my-1">
        <div className="flex-1 h-px bg-[#2a2a2a]" />
        <span className="text-[#a7a7a7] text-sm">hoặc</span>
        <div className="flex-1 h-px bg-[#2a2a2a]" />
    </div>
);

export const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
            <div className="w-full max-w-[450px] flex flex-col items-center gap-6 py-12">
                {/* Logo */}
                <div className="mb-2">
                    <SpotifyLogo />
                </div>

                {/* Heading */}
                <h1 className="text-white text-4xl font-extrabold tracking-tight text-center leading-tight">
                    Đăng ký để<br />bắt đầu nghe
                </h1>

                {/* Email Field */}
                <div className="w-full flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold">Địa chỉ email</label>
                    <input
                        type="email"
                        placeholder="name@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-[#121212] border border-[#3e3e3e] text-white placeholder-[#6a6a6a] focus:outline-none focus:border-white transition-colors text-sm"
                    />
                    <button
                        type="button"
                        className="text-[#1DB954] text-sm underline underline-offset-2 self-start hover:text-[#1ed760] transition-colors"
                    >
                        Dùng số điện thoại.
                    </button>
                </div>

                {/* Next Button */}
                <div className="w-full">
                    <GreenButton type="submit">Tiếp theo</GreenButton>
                </div>

                <Divider />

                {/* Social Buttons */}
                <div className="w-full flex flex-col gap-3">
                    <SocialButton icon={<GoogleIcon />} label="Đăng ký với Google" />
                    <SocialButton icon={<AppleIcon />} label="Đăng ký với Apple" />
                </div>

                {/* Divider line */}
                <div className="w-full h-px bg-[#2a2a2a] mt-2" />

                {/* Switch to Login */}
                <p className="text-[#a7a7a7] text-sm">
                    Bạn đã có tài khoản?{" "}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-white font-bold underline underline-offset-2 hover:text-[#1DB954] transition-colors"
                    >
                        Đăng nhập
                    </button>
                </p>
            </div>
        </div>
    );
};

export const LoginForm = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => {
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
            <div className="w-full max-w-[450px] flex flex-col items-center gap-5 py-12">
                <div className="mb-2">
                    <SpotifyLogo />
                </div>

                <h1 className="text-white text-4xl font-extrabold tracking-tight text-center leading-tight">
                    Chào mừng<br />trở lại!
                </h1>

                <div className="w-full flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold">Email hoặc tên người dùng</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-[#121212] border border-[#3e3e3e] text-white placeholder-[#6a6a6a] focus:outline-none focus:border-white transition-colors text-sm"
                    />
                </div>

                <div className="w-full">
                    <GreenButton>Tiếp tục</GreenButton>
                </div>

                <Divider />

                <div className="w-full flex flex-col gap-3">
                    <SocialButton icon={<PhoneIcon />} label="Tiếp tục bằng số điện thoại" />
                    <SocialButton icon={<GoogleIcon />} label="Tiếp tục với Google" />
                    <SocialButton icon={<FacebookIcon />} label="Tiếp tục qua Facebook" />
                    <SocialButton icon={<AppleIcon />} label="Tiếp tục với Apple" />
                </div>

                <div className="w-full h-px bg-[#2a2a2a] mt-2" />

                <p className="text-[#a7a7a7] text-sm">
                    Bạn chưa có tài khoản?{" "}
                    <button
                        onClick={onSwitchToRegister}
                        className="text-white font-bold underline underline-offset-2 hover:text-[#1DB954] transition-colors"
                    >
                        Đăng ký Spotify
                    </button>
                </p>
            </div>
        </div>
    );
};

import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppleIcon, Divider, GoogleIcon, GreenButton, SocialButton, SpotifyLogo } from "../../util/Icon";
import { UserContext } from "../../context/UserContext";
// import type { UserLogin } from "../../model/User";
// import { CircleAlert } from "lucide-react";
// import WarningNotice from "../../component/WarningNotice";
import { SignupStep1 } from "./SignupStep1";

type signupStatus = "true" | "false" | "email_exists";

export const Signup = () => {
    const { googleSignup } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [searchParams] = useSearchParams();

    const status = searchParams.get("status") as signupStatus | null;

    if (status) {
        return <SignupStep1 status={status} />;
    }

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
            <div className="w-full max-w-[450px] flex flex-col items-center gap-6 py-12">
                <div className="mb-2">
                    <SpotifyLogo />
                </div>

                <h1 className="text-white text-4xl font-extrabold tracking-tight text-center leading-tight">
                    Sign up to<br />start listening
                </h1>

                <div className="w-full flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold">Email address</label>
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
                        Use phone number.
                    </button>
                </div>

                <div className="w-full">
                    <GreenButton type="button" onClick={() => navigate("?status=false")}>
                        Next
                    </GreenButton>
                </div>

                <Divider />

                <div className="w-full flex flex-col gap-3">
                    <SocialButton icon={<GoogleIcon />} label="Sign up with Google" onClick={googleSignup} />
                    <SocialButton icon={<AppleIcon />} label="Sign up with Apple" onClick={googleSignup} />
                </div>

                <div className="w-full h-px bg-[#2a2a2a] mt-2" />

                <p className="text-[#a7a7a7] text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/signin")}
                        className="text-white font-bold underline underline-offset-2 hover:text-[#1DB954] transition-colors"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

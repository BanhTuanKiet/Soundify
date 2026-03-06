import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Divider, FacebookIcon, GoogleIcon, GreenButton, SocialButton, SpotifyLogo } from "../../util/Icon";
import { AppleIcon, PhoneIcon } from "lucide-react";

export const Signin = () => {
    const { googleSignup } = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
            <div className="w-full max-w-[450px] flex flex-col items-center gap-5 py-12">
                <div className="mb-2">
                    <SpotifyLogo />
                </div>

                <h1 className="text-white text-4xl font-extrabold tracking-tight text-center leading-tight">
                    Welcome<br />back!
                </h1>

                <div className="w-full flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold">Email or username</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-md bg-[#121212] border border-[#3e3e3e] text-white placeholder-[#6a6a6a] focus:outline-none focus:border-white transition-colors text-sm"

                    />
                </div>

                <div className="w-full">
                    <GreenButton>Continue</GreenButton>
                </div>

                <Divider />

                <div className="w-full flex flex-col gap-3">
                    <SocialButton icon={<PhoneIcon />} label="Continue with phone number" onClick={googleSignup} />
                    <SocialButton icon={<GoogleIcon />} label="Continue with Google" onClick={googleSignup} />
                    <SocialButton icon={<FacebookIcon />} label="Continue via Facebook" onClick={googleSignup} />
                    <SocialButton icon={<AppleIcon />} label="Continue with Apple" onClick={googleSignup} />
                </div>

                <div className="w-full h-px bg-[#2a2a2a] mt-2" />

                <p className="text-[#a7a7a7] text-sm">
                    Don't have an account yet?{" "}
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-white font-bold underline underline-offset-2 hover:text-[#1DB954] transition-colors"
                    >
                        Sign up for Spotify
                    </button>
                </p>
            </div>

        </div>
    );
};
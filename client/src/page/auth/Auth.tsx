import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppleIcon, Divider, FacebookIcon, GoogleIcon, GreenButton, PhoneIcon, SocialButton, SpotifyLogo } from "../../util/Icon";
import { UserContext } from "../../context/UserContext";

export const RegisterForm = () => {
    const { googleSignup } = useContext(UserContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("");

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
                    <GreenButton type="submit">Next</GreenButton>
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

                        onClick={() => navigate("/register")}

                        className="text-white font-bold underline underline-offset-2 hover:text-[#1DB954] transition-colors"

                    >
                        Sign up for Spotify

                    </button>
                </p>
            </div>

        </div>

    );
};

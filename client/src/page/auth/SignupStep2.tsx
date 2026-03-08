import { useState } from "react";
import { GreenButton, SpotifyLogo } from "../../util/Icon";
import { CircleAlert } from "lucide-react";
import type { UserLogin } from "../../model/User";
import axios from "../../config/AxiosConfig";

type SignupStep2Props = {
    onHideStep2: (value: boolean) => void;
    formData: Partial<UserLogin>
    setFormData: React.Dispatch<React.SetStateAction<Partial<UserLogin>>>
};

export const SignupStep2 = ({ onHideStep2, formData, setFormData }: SignupStep2Props) => {
    const [errors, setErrors] = useState({
        marketingOptOut: "",
        shareData: ""
    });

    const handleBackStep1 = () => {
        onHideStep2(false)
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let isValid = true;
        const newErrors = {
            marketingOptOut: "",
            shareData: ""
        };

        if (!formData.marketingOptOut) {
            newErrors.marketingOptOut = "Please confirm your marketing preference.";
            isValid = false;
        }

        if (!formData.shareData) {
            newErrors.shareData = "You must agree to share registration data.";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return

        const response = await axios.post(`/user/signin-google/confirm`, formData)
        console.log(response.data)


    };

    return (
        <div className="min-h-screen bg-[#121212] flex flex-col items-center pt-8 px-4">
            <div className="w-full max-w-[450px]">
                <div className="flex justify-center mb-8">
                    <SpotifyLogo />
                </div>

                <div className="w-full h-0.5 bg-[#1ed760] mb-8"></div>

                <div className="flex items-start gap-4 mb-10">
                    <button
                        onClick={handleBackStep1}
                        className="mt-1 text-[#a7a7a7] hover:text-white transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <div>
                        <p className="text-[#a7a7a7] text-sm font-medium">Step 2 of 2</p>
                        <h2 className="text-white text-base font-bold">Terms & Conditions</h2>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2 mb-8">
                        <label className="flex gap-4 p-4 bg-[#242424] rounded-md cursor-pointer hover:bg-[#2a2a2a] transition-colors items-start">
                            <input
                                type="checkbox"
                                name="marketingOptOut"
                                className="mt-1 w-4 h-4 accent-[#1ed760]"
                                checked={formData.marketingOptOut}
                                onChange={(e) => handleCheck(e)}
                            />
                            <span className="text-white text-sm font-medium">
                                I would prefer not to receive marketing messages from Spotify
                            </span>
                        </label>

                        {errors.marketingOptOut && (
                            <div className="text-[#e91429] flex items-center gap-1.5 text-sm px-4">
                                <CircleAlert size={16} /> {errors.marketingOptOut}
                            </div>
                        )}

                        <label className="flex gap-4 p-4 bg-[#242424] rounded-md cursor-pointer hover:bg-[#2a2a2a] transition-colors items-start">
                            <input
                                type="checkbox"
                                name="shareData"
                                className="mt-1 w-4 h-4 accent-[#1ed760]"
                                checked={formData.shareData}
                                onChange={(e) => handleCheck(e)}
                            />
                            <span className="text-white text-sm font-medium">
                                Share my registration data with Spotify's content providers for marketing purposes.
                            </span>
                        </label>

                        {errors.shareData && (
                            <div className="text-[#e91429] flex items-center gap-1.5 text-sm px-4">
                                <CircleAlert size={16} /> {errors.shareData}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 text-white text-sm leading-relaxed mb-10">
                        <p>Spotify is a personalised service.</p>

                        <p>
                            By clicking on sign-up, you agree to Spotify's{" "}
                            <span className="text-[#1ed760] hover:underline cursor-pointer">
                                Terms and Conditions of Use
                            </span>.
                        </p>

                        <p>
                            By clicking on sign-up, you confirm that you have read how we process your personal data in our{" "}
                            <span className="text-[#1ed760] hover:underline cursor-pointer">
                                Privacy Policy
                            </span>.
                        </p>

                        <p className="text-[#a7a7a7]">
                            We may occasionally send you service-based messages.
                        </p>
                    </div>

                    <div className="w-full">
                        <GreenButton type="submit">
                            Sign up
                        </GreenButton>
                    </div>
                </form>

                <p className="text-center text-[11px] text-[#a7a7a7] mt-8 px-8">
                    This site is protected by reCAPTCHA and the Google{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
                    <span className="underline cursor-pointer">Terms of Service</span> apply.
                </p>
            </div>
        </div>
    );
};
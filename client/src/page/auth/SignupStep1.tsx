import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SpotifyLogo, GreenButton } from "../../util/Icon";
import type { UserLogin, DateOfBirth } from "../../model/User";
import { CircleAlert } from "lucide-react";
import { MONTHS } from "../../util/Time";
import { SignupStep2 } from "./SignupStep2";
import ExistEmail from "../../component/card/ExistEmail";

interface SignupStep1Props {
    status: string | null;
}

export const SignupStep1 = ({ status }: SignupStep1Props) => {
    const isLocked = status === "email_exists";
    const [isShowStep2, setIsShowStep2] = useState(false)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const emailFromUrl = searchParams.get("email") || "";
    const nameFromUrl = searchParams.get("name") || "";

    const [formData, setFormData] = useState<Partial<UserLogin>>({
        email: isLocked ? "" : emailFromUrl,
        name: isLocked ? "" : nameFromUrl,
        dateOfBirth: { day: "", month: "", year: "" },
        sex: true
    });

    const [errors, setErrors] = useState({
        email: "",
        name: "",
        dateOfBirth: "",
        sex: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleDobChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            dateOfBirth: {
                ...(prev.dateOfBirth as DateOfBirth),
                [name]: value
            }
        }));

        if (errors.dateOfBirth) {
            setErrors(prev => ({ ...prev, dateOfBirth: "" }));
        }
    };

    const nextStep = (e: React.FormEvent) => {
        e.preventDefault();

        if (isLocked) return;

        let isValid = true;
        const newErrors = { email: "", name: "", dateOfBirth: "", sex: "" };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "You need to enter your email.";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "This email is invalid. Make sure it's written like example@email.com";
            isValid = false;
        }

        if (!formData.name || formData.name.trim() === "") {
            newErrors.name = "Enter a name for your profile.";
            isValid = false;
        }

        const dob = formData.dateOfBirth;
        const currentYear = new Date().getFullYear();
        if (!dob?.day || !dob?.month || !dob?.year) {
            newErrors.dateOfBirth = "Please enter a complete date of birth.";
            isValid = false;
        } else {
            const dayNum = parseInt(dob.day, 10);
            const yearNum = parseInt(dob.year, 10);
            if (
                isNaN(dayNum) || dayNum < 1 || dayNum > 31 ||
                isNaN(yearNum) || yearNum < 1900 || yearNum > currentYear
            ) {
                newErrors.dateOfBirth = "Please enter a valid date of birth.";
                isValid = false;
            }
        }

        setErrors(newErrors);

        if (isValid) {
            setIsShowStep2(true)
        }
    };

    if (isShowStep2) {
        return (
            <SignupStep2 onHideStep2={setIsShowStep2} formData={formData as UserLogin} setFormData={setFormData} />
        )
    }

    return (
        <div className="min-h-screen bg-[#121212] flex flex-col items-center pt-8 px-4">
            <div className="w-full max-w-[450px]">
                <div className="flex justify-center mb-8">
                    <SpotifyLogo />
                </div>

                <div className="w-full h-0.5 bg-[#404040] mb-8">
                    <div className="w-1/2 h-full bg-[#1ed760]"></div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                    <button onClick={() => navigate(-1)} className="mt-1 text-[#a7a7a7] hover:text-white">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <div>
                        <p className="text-[#a7a7a7] text-sm font-medium">Step 1 of 2</p>
                        <h2 className="text-white text-base font-bold">Account creation process</h2>
                    </div>
                </div>

                {isLocked && <ExistEmail />}

                <form noValidate className="flex flex-col gap-5" onSubmit={nextStep}>
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-bold">Email address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="name@domain.com"
                            className={`w-full px-3 py-2.5 rounded bg-[#121212] border text-white placeholder-[#727272] outline-none transition-all ${errors.email ? "border-[#e91429] focus:border-[#e91429]" : "border-[#727272] focus:border-[#1ed760]"}`}
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLocked}
                        />
                        {errors.email && (
                            <div className="text-[#e91429] flex items-center gap-1.5 text-sm">
                                <CircleAlert size={16} /> {errors.email}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-white text-sm font-bold">Name</label>
                        <p className="text-[#a7a7a7] text-[13px]">This name will appear on your profile.</p>
                        <input
                            name="name"
                            type="text"
                            className={`w-full px-3 py-2.5 rounded bg-[#121212] border text-white outline-none transition-all mt-1 ${errors.name ? "border-[#e91429] focus:border-[#e91429]" : "border-[#727272] focus:border-[#1ed760]"}`}
                            value={formData.name}
                            onChange={handleChange}
                            disabled={isLocked}
                        />
                        {errors.name && (
                            <div className="text-[#e91429] flex items-center gap-1.5 text-sm mt-1">
                                <CircleAlert size={16} /> {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-bold">Date of birth</label>
                        <p className="text-[#a7a7a7] text-[13px]">Why do we need to know your date of birth? <span className="underline cursor-pointer">Learn more</span>.</p>
                        <div className="flex gap-3">
                            <input
                                name="day"
                                placeholder="dd"
                                value={formData.dateOfBirth?.day}
                                onChange={handleDobChange}
                                className={`w-1/4 px-3 py-2.5 rounded bg-[#121212] border text-white text-center outline-none ${errors.dateOfBirth ? "border-[#e91429] focus:border-[#e91429]" : "border-[#727272] focus:border-[#1ed760]"}`}
                                disabled={isLocked}
                            />
                            <select
                                name="month"
                                value={formData.dateOfBirth?.month}
                                onChange={handleDobChange}
                                className={`w-2/4 px-3 py-2.5 rounded bg-[#121212] border text-white outline-none appearance-none ${errors.dateOfBirth ? "border-[#e91429] focus:border-[#e91429]" : "border-[#727272] focus:border-[#1ed760]"}`}
                                disabled={isLocked}
                            >
                                <option value="" disabled>Month</option>
                                {MONTHS.map((month, idx) => (
                                    <option value={(idx + 1).toString().padStart(2, "0")}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <input
                                name="year"
                                placeholder="yyyy"
                                value={formData.dateOfBirth?.year}
                                onChange={handleDobChange}
                                className={`w-1/4 px-3 py-2.5 rounded bg-[#121212] border text-white text-center outline-none ${errors.dateOfBirth ? "border-[#e91429] focus:border-[#e91429]" : "border-[#727272] focus:border-[#1ed760]"}`}
                                disabled={isLocked}
                            />
                        </div>
                        {errors.dateOfBirth && (
                            <div className="text-[#e91429] flex items-center gap-1.5 text-sm">
                                <CircleAlert size={16} /> {errors.dateOfBirth}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 mt-2">
                        <label className="text-white text-sm font-bold">Sex</label>
                        <p className="text-[#a7a7a7] text-[13px] leading-tight">Your gender helps us provide you with content recommendations and ads that are relevant to you.</p>
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-1">
                            {[
                                { label: "Male", value: true },
                                { label: "Female", value: false }
                            ].map((item) => (
                                <label
                                    key={item.label}
                                    className="flex items-center gap-2 text-white text-sm cursor-pointer capitalize"
                                >
                                    <input
                                        type="radio"
                                        name="sex"
                                        value={item.value.toString()}
                                        checked={formData.sex === item.value}
                                        className="accent-[#1ed760] w-4 h-4"
                                        onChange={(e) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                sex: e.target.value === "true"
                                            }));
                                            if (errors.sex) {
                                                setErrors(prev => ({ ...prev, sex: "" }));
                                            }
                                        }}
                                        disabled={isLocked}
                                    />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <GreenButton type="submit">Next</GreenButton>
                    </div>
                </form>

                <p className="text-center text-[11px] text-[#a7a7a7] mt-8 px-8">
                    This site is protected by reCAPTCHA and the Google <span className="underline">Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
                </p>
            </div>
        </div>
    );
};
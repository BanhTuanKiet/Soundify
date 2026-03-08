import { CircleAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ExistEmail() {
    const navigate = useNavigate()

    return (
        <div className="bg-[#e91429] p-3 rounded flex items-center gap-3 mb-6">
            <div className="shrink-0 text-white">
                <CircleAlert size={22} />
            </div>
            <p className="text-white text-sm font-semibold">
                This email address is already linked to an account.{" "}
                <button onClick={() => navigate("/signin")} className="underline hover:text-gray-200">
                    Log in
                </button>.
            </p>
        </div>
    )
}

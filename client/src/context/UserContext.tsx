import axios from "../config/AxiosConfig";
import {
    createContext,
    useRef,
    useState,
} from "react";
import type { ReactNode } from "react";

type UserContextType = {
    user: string;
    setUser: (user: string) => void;
    isLoading: boolean;

    googleSignup: () => void;

    email: string
    emailError: string
    validEmail: (value: string) => void
    emailSignup: () => Promise<boolean>
};

const UserContext = createContext<UserContextType>({
    user: "",
    setUser: () => { },
    isLoading: false,

    googleSignup: () => { },

    email: "",
    emailError: "",
    validEmail: () => { },
    emailSignup: async () => false
});

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    const isSubmittingRef = useRef(false);

    const googleSignup = async () => {
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setIsLoading(true);

        try {
            const apiUrl = "http://localhost:5165/user/signin-google";
            window.location.href = apiUrl
        } finally {
            isSubmittingRef.current = false;
            setIsLoading(false);
        }
    }

    const validEmail = (value: string) => {

        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let newError = ""

        if (value.length === 0) {
            newError = "You need to enter your email.";
        } else if (!emailRegex.test(value)) {
            newError =
                "This email is invalid. Make sure it's written like example@email.com";
        }

        setEmail(value)
        setEmailError(newError)
    }

    const emailSignup = async () => {
        if (emailError.length > 0) return false

        if (isSubmittingRef.current) return false

        isSubmittingRef.current = true
        setIsLoading(true)

        try {
            await axios.post(`/user/signup-email`, {
                email: email
            })

            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            isSubmittingRef.current = false
            setIsLoading(false)
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                googleSignup,
                email,
                emailError,
                validEmail,
                emailSignup
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
export { UserContext, UserProvider };
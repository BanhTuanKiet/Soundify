import axios from "axios";
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
    handleSignup: () => void;
    handleSignin: () => void;
    googleSignup: () => void
};

const UserContext = createContext<UserContextType>({
    user: "",
    setUser: () => { },
    isLoading: false,
    handleSignup: () => { },
    handleSignin: () => { },
    googleSignup: () => {}
});

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isSubmittingRef = useRef(false);

    const googleSignup = async () => {
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setIsLoading(true);
console.log("AAAAAAA")
        try {
            const apiUrl = "http://localhost:5165/user/signin-google";
            // const response = await axios.get(`/users/signin-google`)
            // console.log(response.data)
            window.location.href = apiUrl
        } finally {
            isSubmittingRef.current = false;
            setIsLoading(false);
        }
    }

    const handleSignup = async () => {
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setIsLoading(true);

        try {
            const response = await axios.post(`/users`)
            console.log(response.data)
        } finally {
            isSubmittingRef.current = false;
            setIsLoading(false);
        }
    };

    const handleSignin = async () => {
        if (isSubmittingRef.current) return;

        isSubmittingRef.current = true;
        setIsLoading(true);

        try {
            // await authApi.signup(...)
        } finally {
            isSubmittingRef.current = false;
            setIsLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, handleSignup, handleSignin, googleSignup }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
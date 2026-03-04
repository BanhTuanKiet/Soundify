import {
    createContext,
    // useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import type { ReactNode } from "react";

type SearchContextType = {
    keyword: string,
    setKeyword: (keyword: string) => void,
    isSearching: boolean,
    setIsSearching: (isSearching: boolean) => void
}

const SearchContext = createContext<SearchContextType>({
    keyword: "",
    setKeyword: () => { },
    isSearching: false,
    setIsSearching: () => { },
})

const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [keyword, setKeyword] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!keyword.trim()) return;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setIsSearching(true);

            console.log("Searching:", keyword);

            // setIsSearching(false);
        }, 500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [keyword]);

    return (
        <SearchContext.Provider value={{ keyword, setKeyword, isSearching, setIsSearching }}>
            {children}
        </SearchContext.Provider>
    );
}

export { SearchContext, SearchProvider }
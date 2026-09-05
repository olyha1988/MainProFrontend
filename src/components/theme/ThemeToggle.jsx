import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    // some changes happend

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                border
                border-slate-300
                bg-white
                transition
                hover:bg-slate-100
                dark:border-slate-700
                dark:bg-slate-800
                dark:hover:bg-slate-700
            "
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <FaSun className="text-yellow-400" size={18} />
            ) : (
                <FaMoon className="text-slate-700" size={18} />
            )}
        </button>
    );
}
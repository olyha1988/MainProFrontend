import { FaMoon } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-gray-800">
      <h1 className="text-xl font-semibold">
        Dashboard
      </h1>

      <button className="rounded-lg bg-gray-100 p-3 hover:bg-gray-200">
        <FaMoon />
      </button>
    </header>
  );
}

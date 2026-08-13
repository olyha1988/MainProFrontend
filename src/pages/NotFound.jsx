import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold">404</h1>

      <p className="my-4">Page Not Found</p>

      <Link
        to="/dashboard"
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Go Dashboard
      </Link>
    </div>
  );
}



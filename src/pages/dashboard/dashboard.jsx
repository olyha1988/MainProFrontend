export default function Dashboard() {
  return (
    <div>
      <h2 className="mb-4 text-3xl font-bold">
        Dashboard
      </h2>

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          Total Projects
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          Total Tasks
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          Pending
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          Completed
        </div>
      </div>
    </div>
  );
}

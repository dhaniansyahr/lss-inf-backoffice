import Link from "next/link";

export default function Container() {
  return (
    <section className="w-full">
      <div className="mx-auto w-[90%] px-4 py-8">
        <h1 className="mb-4">Dashboard</h1>
        <Link href="/api/logout">
          <button className="rounded-md bg-blue-400 px-8 py-2 text-white">
            Logout
          </button>
        </Link>
      </div>
    </section>
  );
}

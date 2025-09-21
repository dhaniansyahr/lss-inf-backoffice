import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Container() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-3 p-10">
            <div className="w-full max-w-2xl">
                <Image
                    src="/401.svg"
                    alt="401"
                    width={1000}
                    height={1000}
                    className="h-auto w-full object-contain"
                />
            </div>

            <div className="flex items-center justify-center gap-3">
                <Link href="/dashboard">
                    <Button variant="default">Dashboard</Button>
                </Link>
                <Link href="/login">
                    <Button variant="default">Login</Button>
                </Link>
            </div>
        </div>
    );
}

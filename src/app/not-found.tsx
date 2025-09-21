import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-3 p-10">
            <div className="w-full max-w-2xl">
                <Image
                    src="/404.svg"
                    alt="404"
                    width={1000}
                    height={1000}
                    className="h-auto w-full object-contain"
                />
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
                <Link href="/dashboard">
                    <Button variant="default">Go to Dashboard</Button>
                </Link>
            </div>
        </div>
    );
}

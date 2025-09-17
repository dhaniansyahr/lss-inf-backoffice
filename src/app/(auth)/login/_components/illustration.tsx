import Image from "next/image";

export default function Illustration() {
    return (
        <section className="h-[calc(100vh-2rem)] w-full lg:col-span-2 rounded-2xl overflow-hidden relative">
            <Image
                src="/app/background.jpg"
                alt="Background Image"
                width={1000}
                height={10000}
                className="w-full h-full object-cover object-center rounded-2xl"
            />

            {/* gradient inset */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-2xl" />

            {/* Title */}
            <div className="absolute bottom-10 left-0 p-4">
                <h1 className="text-6xl font-bold text-white">
                    LSS - INFORMATIKA
                </h1>
                <p className="text-lg text-white">
                    Welcome to the Lab Scheduling System - your efficient
                    solution for managing lab resources and scheduling.
                    Streamline your lab operations with ease and precision.
                </p>
            </div>
        </section>
    );
}

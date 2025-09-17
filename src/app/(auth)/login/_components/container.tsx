import LoginForm from "./form";
import Illustration from "./illustration";

export default function Container() {
    return (
        <main className="h-screen w-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
            <Illustration />
            <LoginForm />
        </main>
    );
}

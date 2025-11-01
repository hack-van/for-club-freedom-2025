import { SignIn } from "../../components/auth/signin";
export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24 px-8 gap-y-12 max-w-screen-md mx-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">
          sign in
        </h1>
      </div>
      <SignIn />
    </main>
  );
}

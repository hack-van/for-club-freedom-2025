"use client"
import { RequestPasswordResetForm } from "@/components/auth/request-password-reset-form";
export default function RequestPasswordResetPage() {
  return (
    <>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold py-24 gap-y-12">
            Request Password Reset
          </h1>
        </div>
        <div className="flex justify-center"><RequestPasswordResetForm /></div>
    </>
  );
}

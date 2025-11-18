import ResetPasswordForm from '@/components/auth/password-reset-form'
import {Suspense} from 'react'
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordForm/>
    </Suspense>
  )
}
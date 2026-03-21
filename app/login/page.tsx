import { Metadata } from 'next';
import LoginCard from '@mod/auth/components/login-card';

export const metadata: Metadata = {
    title: 'Login | CoreMart Admin',
    description: 'Login to CoreMart Admin dashboard',
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginCard />
      </div>
    </div>
  )
}

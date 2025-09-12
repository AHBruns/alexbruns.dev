import {
  ClerkProvider,
  OrganizationProfile,
  OrganizationSwitcher,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Alex Bruns",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider waitlistUrl="/">
      <html lang="en">
        <body className="antialiased">
          <div className="divide-y divide-gray-300 h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 gap-4 h-16">
              <Link className="text-xl font-bold text-gray-900" href="/">
                AlexBruns.dev
              </Link>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <Link href="/sign-in" className="text-gray-900 text-md">
                    Login
                  </Link>
                </SignedOut>
                <SignedIn>
                  <OrganizationSwitcher />
                  <div className="bg-gray-900 p-px rounded-full grid place-items-center">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </header>
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

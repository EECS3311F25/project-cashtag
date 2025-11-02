import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ backgroundColor: "#9BC5DD" }} className="p-4 flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/sign-up">Login</Link>
          <Link href="/message">Message</Link>
          <Link href="/about">About</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}

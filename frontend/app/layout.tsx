import "./globals.css";
import Navbar from "./components/Navbar";
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <Navbar></Navbar>
            <body className="bg-[#101010]">{children}</body>
        </html>
    );
}

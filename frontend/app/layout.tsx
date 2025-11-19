import "./globals.css";
import { Toaster } from "sonner";
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="bg-[#0a0a0a]">
                <Toaster />
                {children}
            </body>
        </html>
    );
}

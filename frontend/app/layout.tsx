import "./globals.css";
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="bg-[#0a0a0a]">{children}</body>
        </html>
    );
}

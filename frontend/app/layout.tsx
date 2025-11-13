import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className="bg-[#0a0a0a]">
                <div className="flex flex-col h-screen">
                    <Navbar></Navbar>
                    {children}
                    <Footer></Footer>
                </div>
            </body>
        </html>
    );
}

import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/Modal/Modal";
import SocialIcons from "@/components/socialIcons/SocialIcons";
import Footer from "@/components/Footer/Footer";
import { Josefin_Sans } from "next/font/google";
import { CartProvider } from "@/CartContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Life Etc.",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`${josefin.className}`}
          suppressHydrationWarning={true}
        >
          <CartProvider>
            <div className="container">
              <Navbar />
              {children}
            </div>
            <Modal />
            <SocialIcons />
            <Footer />
          </CartProvider>
        </body>
      </UserProvider>
    </html>
  );
}

import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D Shoe Customizer - Twixers",
  description:
    "Twixers is a 3D shoe customization tool that allows users to create their own personal shoe design. Users can change mesh colors and add textures, offering a simple, intuitive interface for model personalization.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-897K03VZG5"
        ></Script>
        <Script id="" strategy="lazyOnload">
          {`  window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-897K03VZG5');`}
        </Script>
      </head>

      <body className={`${inter.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}

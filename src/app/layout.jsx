import Script from "next/script";

import "./globals.css";

export const metadata = {
  title: "Twixers",
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

      <body className="min-h-screen flex justify-center items-stretch ">
        {children}
      </body>
    </html>
  );
}

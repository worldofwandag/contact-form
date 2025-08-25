import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";


const karla = localFont({
  src: [
    {
      path: './assets/fonts/Karla-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: './assets/fonts/Karla-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-karla',
  display: 'swap',
})


export const metadata: Metadata = {
  title: "contact form",
  description: "worldofwandag",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${karla.variable} antialiased bg-[#E0F1E8] `}
      >
        {children}
      </body>
    </html>
  );
}


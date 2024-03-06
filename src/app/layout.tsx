"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./../store/store";
import Header from "@/components/header/header";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="bg-lime-50">
          <Header />
          <div>
            {children} 
          </div>
        </body>
      </Provider>
    </html>
  );
}

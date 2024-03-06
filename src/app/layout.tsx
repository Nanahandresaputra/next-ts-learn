"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { persistStored, store } from "./../store/store";
import Header from "@/components/header/header";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-lime-50">
        <Provider store={store}>
          <PersistGate persistor={persistStored}>
            <Header />
            <div>{children}</div>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

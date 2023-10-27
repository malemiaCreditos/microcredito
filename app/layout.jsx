import React from "react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import Provider from "../components/Provider";

export const metadata = {
  title: "Malemia Microcredito",
  description: "Plataforma de Gestao de Credito",
};

function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;

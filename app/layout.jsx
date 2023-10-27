import React from "react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import Provider from "../components/Provider";

export const metadata = {
  title: "Systems Manager",
  description: "Sistema de Gestão Empresarial Integrado",
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

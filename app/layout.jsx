import React from "react";
import "../styles/globals.css";
import Nav from "../components/Nav";
import Provider from "../components/Provider";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;

"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Provider from "./Provider";

function Nav() {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <div className="flex-between w-full mb-16 pt-3">
      <Link className="flex gap-2 flex-center" href={"/"}>
        <Image
          src={"/assets/images/malamiaG.png"}
          alt={"Systems Manager Logo"}
          width={80}
          height={80}
          className="object-contain"
        />
      </Link>
      {/* Destop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            {session?.user.email === "coutinhocoutinholucas@gmail.com" ? (
                <>
                    <Link color="foreground" href="/emprestimos">
                      Empréstimos
                    </Link>
                    <Link href="/lancamentos" aria-current="page">
                      Lançamentos
                    </Link>
                    <Link color="foreground" href="/entradaSaida">
                      Entradas/Saídas
                    </Link>
                </>
              ) : (
                <>
                    <Link color="foreground" href="/solicitarEmprestimo">
                      Solicitar Emprestimo
                    </Link>
                    <Link color="foreground" href="#">
                      Meus Emprestimos
                    </Link>
                </>
              )}
            <button type={"button"} onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href={"#"}>
              <Image
                className="rounded-full"
                alt="Profilo Pic"
                src={session?.user.image}
                width={37}
                height={37}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              alt="Profilo Pic"
              src={session?.user.image}
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href={"#"}
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Perfil
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;

"use client";
import React from "react";
import Table3 from "../../components/Table3";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Emprestimos() {
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/emprestimoSolicitado`, {next: { revalidate: 60 },});
      const data = await response.json();
      setEmprestimoLista(data);
      console.log(data);
    }; 
    if (session?.user) fetchPosts();
  }, [session?.user]);
  return (
    <>
      <div className="glassmorphism  w-full">
        <Table3 emprestimoLista = {emprestimoLista}/>
      </div>
    </>
  );
}

export default Emprestimos;

"use client";
import React from "react";
import Table3 from "../../components/Table3";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Emprestimos() {
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/emprestimoSolicitado`);
      const data = await response.json();
      setEmprestimoLista(data);
    }; 
    fetchPosts();
  }, );
  return (
    <>
      <div className="glassmorphism  w-full">
      <div id="table_wrapper">
        <table id="customers" className="mt-4">
          <tr>
            <th>Nome Cliente</th>
            <th>Gênero</th>
            <th>Contacto</th>
            <th>BI</th>
            <th>NUIT</th>
            <th>Nascimento</th>
            <th>Endereço</th>
            <th>Nr. Casa</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Distrito</th>
            <th>Provincia</th>
            <th>Nome do Pai</th>
            <th>Nome da Mãe</th>
            <th>Emp. Solicitado</th>
            <th>Font. Rendimento</th>
            <th>Gar. Pagamento</th>
            <th>Status</th>
            <th>...</th>
          </tr>

          {emprestimoLista.length > 0 &&
            emprestimoLista.map((ddf) => (
              <>
                <tr>
                  <td>{ddf.nomeCompleto}</td>
                  <td>{ddf.genero2}</td>
                  <td>{ddf.contacto}</td>
                  <td>{ddf.bI}</td>
                  <td>{ddf.nUIT}</td>
                  <td>{ddf.dataNascimento}</td>
                  <td>{ddf.endereco}</td>
                  <td>{ddf.numeroCasa}</td>
                  <td>{ddf.bairro}</td>
                  <td>{ddf.cidade}</td>
                  <td>{ddf.distrito}</td>
                  <td>{ddf.provincia}</td>
                  <td>{ddf.nomePai}</td>
                  <td>{ddf.nomeMae}</td>
                  <td>{ddf.saldo}</td>
                  <td>{ddf.fonteRendimento}</td>
                  <td>{ddf.garantias}</td>
                  <td>{ddf.status}</td>
                  <td>
                    <button
                      type={"button"}
                      onClick={() => updateEmprestimo(ddf._id)}
                      className="outline_btn"
                    >
                      <div className="flex flex-row p-1">
                        {ddf.status === "Pendente" ? (
                          <>
                            <>Aprovar</>
                          </>
                        ) : (
                          <>...</>
                        )}
                      </div>
                    </button>
                  </td>
                </tr>
              </>
            ))}
        </table>
      </div>
      </div>
    </>
  );
}

export default Emprestimos;

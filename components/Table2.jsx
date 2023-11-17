import React from "react";
import "./ts.css";
import { toast } from "react-toastify";

function Table2({ entradaSaidaLista }) {
  async function deleteUser(id) {
    toast(`Processando`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const response = await fetch(`/api/entradaSaida`);
    try {
      const response = await fetch(`api/entradaSaida/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      toast(`Erro: ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      toast(`Lançamento removido com secesso! Actualize a página para ver os efeitos...`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <>
      <div id="table_wrapper">
        <table id="customers" className="mt-4">
          <tr>
            <th>Data</th>
            <th>Nome Cliente</th>
            <th>Operação</th>
            <th>Saldo</th>
            <th>...</th>
          </tr>

          {entradaSaidaLista.length > 0 &&
            entradaSaidaLista.map((ddf) => (
              <>
                <tr>
                  <td>{ddf.dataEmprestimo}</td>
                  <td>{ddf.nomeCliente}</td>
                  <td>{ddf.operacao}</td>
                  <td>{ddf.saldo}</td>
                  <td>
                    <div onClick={() => deleteUser(ddf._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </div>                    
                  </td>
                </tr>
              </>
            ))}
        </table>
      </div>
    </>
  );
}

export default Table2;

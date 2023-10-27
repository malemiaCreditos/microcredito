import React from "react";
import "./ts.css";

function Table2({ entradaSaidaLista }) {
  return (
    <>
      <div id="table_wrapper">
        <table id="customers" className="mt-4">
          <tr>
            <th>Data</th>
            <th>Nome Cliente</th>
            <th>Operação</th>
            <th>Saldo</th>
          </tr>

          {entradaSaidaLista.length > 0 &&
            entradaSaidaLista.map((ddf) => (
              <>
                <tr>
                  <td>{ddf.dataEmprestimo}</td>
                  <td>{ddf.nomeCliente}</td>
                  <td>{ddf.operacao}</td>
                  <td>{ddf.saldo}</td>
                </tr>
              </>
            ))}
        </table>
      </div>
    </>
  );
}

export default Table2;

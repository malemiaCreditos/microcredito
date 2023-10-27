import React from "react";
import "./ts.css";

function Table1({ emprestimoLista }) {
  return (
    <>
      <div id="table_wrapper">
        <table id="customers" className="mt-4">
          <tr>
            <th>Data</th>
            <th>Nome Cliente</th>
            <th>Empréstimo</th>
            <th>Juros(%)</th>
            <th>Juros(Mt)</th>
            <th>Dívida Total</th>
            <th>Multa % Dia</th>
            <th>Parcelas</th>
            <th>P. Quitadas</th>
            <th>Parcela(Mt)</th>
            <th>Rec. Amort</th>
            <th>Rec. Juros</th>
            <th>T Atrasos</th>
            <th>Atrasado</th>
            <th>Dívida Actual</th>
          </tr>

          {emprestimoLista.length > 0 &&
            emprestimoLista.map((ddf) => (
              <>
                <tr>
                  <td>{ddf.dataEmprestimo}</td>
                  <td>{ddf.nomeCliente}</td>
                  <td>{ddf.emprestimo}</td>
                  <td>{ddf.jurosPercentual}</td>
                  <td>{ddf.jurosMetical}</td>
                  <td>{ddf.dividaTotal}</td>
                  <td>{ddf.multaPercentualDia}</td>
                  <td>{ddf.parcelas}</td>
                  <td>{ddf.pQuitadas}</td>
                  <td>{ddf.pagamentoPParcela}</td>
                  <td>{ddf.rAmortizacao}</td>
                  <td>{ddf.rJuros}</td>
                  <td>{ddf.tAtrasos}</td>
                  <td>{ddf.atrasado}</td>
                  <td>{ddf.dividaActual}</td>
                </tr>
              </>
            ))}
        </table>
      </div>
    </>
  );
}

export default Table1;

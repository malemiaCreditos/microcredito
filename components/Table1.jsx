import React from "react";
import "./ts.css";
import { useState, useEffect } from "react";
import ExtractoPDF from "../components/ExtractoPDF";
var extractoListaVolatel = [];
function Table1({ emprestimoLista, entradaSaidaLista }) {
  const [extractoLista, setExtractoLista] = useState([]);

  function gatilhoTTT() {
    ExtractoPDF({
      extractoListaVolatel,
      });
  }

  async function gerarExtracto(id) {
    extractoListaVolatel = [];
    entradaSaidaLista.map((f) => {
      if (id === f.nomeCliente) {
        console.log(f);
        extractoListaVolatel.push({
          _id: f._id,
          dataEmprestimo: f.dataEmprestimo,
          nomeCliente: f.nomeCliente,
          operacao: f.operacao,
          saldo: f.saldo,
          saldo1: f.saldo1,
        });
      }      
    });   
    gatilhoTTT();
  }
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
            <th>Extracto</th>
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
                  <td>
                  <div className="flex flex-row gap-4">
                              <div onClick={() => gerarExtracto(ddf.nomeCliente)} className="cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                  </svg>
                                </div> 
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

export default Table1;
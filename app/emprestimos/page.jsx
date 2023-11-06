"use client";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PDFContrato from "../../components/PDFContrato";

function Emprestimos() {
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeCompletoA, setNomeCompletoA] = useState("");
  const [bI, setBI] = useState("");
  const [bIA, setBIA] = useState("");
  const [contacto, setContacto] = useState("");
  const [contactoA, setContactoA] = useState("");
  const [saldo, setSaldo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [estadoCivilA, setEstadoCivilA] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [numeroCasaA, setNumeroCasaA] = useState("");
  const [quarteirao, setQuarteirao] = useState("");
  const [quarteiraoA, setQuarteiraoA] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [bairroA, setBairroA] = useState("");
  const [cidadeA, setCidadeA] = useState("");
  const [distritoA, setDistritoA] = useState("");
  const [fonteRendimento, setFonteRendimento] = useState("");
  const [nUIT, setNUIT] = useState("");
  const [nUITA, setNUITA] = useState("");
  const [garantias, setGarantias] = useState("");
  const [status, setStatus] = useState("");
  const [gatilho, setGatilho] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/emprestimoSolicitado`);
      const data = await response.json();
      setEmprestimoLista(data);
    }; 
    fetchPosts();
  },[]);
  function gatilhoTTT() {
    PDFContrato({
      nomeCompleto, 
      bI,
      bIA, 
      cidade,
      cidadeA,
      distrito,
      distritoA, 
      bairro,
      bairroA,
      quarteirao,
      quarteiraoA,
      numeroCasa,
      numeroCasaA,
      fonteRendimento,
      contacto,
      nUIT,
      nUITA,
      saldo,
      nomeCompletoA,
      estadoCivil,
      estadoCivilA,
      contactoA
      });
  }
  async function updateEmprestimo(id) {
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
    const response = await fetch(`/api/emprestimoSolicitado`);
    const data = await response.json();
    data.map(async (tt) => {
      if (tt._id === id) {
        try {
          const response = await fetch(`api/emprestimoSolicitado/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
              nomeCompleto: tt.nomeCompleto,
              bI: tt.bI,
              contacto: tt.contacto,
              saldo: tt.saldo,
              nomeMae: tt.nomeMae,
              endereco: tt.endereco,
              numeroCasa: tt.numeroCasa,
              bairro: tt.bairro,
              cidade: tt.cidade,
              distrito: tt.distrito,
              provincia: tt.provincia,
              fonteRendimento: tt.fonteRendimento,
              garantias: tt.garantias,
              genero2: tt.genero2,
              nUIT: tt.nUIT,
              dataNascimento: tt.dataNascimento,
              nomePai: tt.nomePai,
              senha: tt.senha,
              status: "Aprovado",
              userId: tt.userId,
            }),
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
          toast(`Emprestimo da(o) ${tt.nomeCompleto} foi aprovado`, {
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
    });
  }
  async function gerarContrato(id) {
    const response = await fetch(`/api/emprestimoSolicitado`);
      const data = await response.json();
      data.map((f) => {
        if (f._id === id) {
          setStatus(f.status);
          setNomeCompleto(f.nomeCompleto);
          setNomeCompletoA(f.nomeCompletoA);
          setSaldo(f.saldo);
          setBI(f.bI);
          setBIA(f.bIA);
          setCidade(f.cidade);
          setCidadeA(f.cidadeA);
          setDistrito(f.distrito);
          setDistritoA(f.distritoA);
          setStatus(f.status);
          setBairro(f.bairro);
          setBairroA(f.bairroA);
          setQuarteirao(f.quarteirao);
          setQuarteiraoA(f.quarteiraoA);
          setEstadoCivil(f.estadoCivil);
          setEstadoCivilA(f.estadoCivilA);
          setNumeroCasa(f.numeroCasa);
          setNumeroCasaA(f.numeroCasaA);
          setNUIT(f.nUIT);
          setNUITA(f.nUITA);
          setContacto(f.contacto);
          setContactoA(f.contactoA);
          setFonteRendimento(f.fonteRendimento);
          setGarantias(f.garantias);
          gatilhoTTT();
        }
      });
  }
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
            <th>Quarteirão</th>
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
                  <td>{ddf.quarteirao}</td>
                  <td>{ddf.saldo}</td>
                  <td>{ddf.fonteRendimento}</td>
                  <td>{ddf.garantias}</td>
                  <td>{ddf.status}</td>
                  <td>
                  {ddf.status === "Pendente" ? (
                          <>
                            <button
                              type={"button"}
                              onClick={() => updateEmprestimo(ddf._id)}
                              className="outline_btn"
                            >
                              <div className="flex flex-row p-1">
                              Aprovar
                              </div>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type={"button"}
                              onClick={() => gerarContrato(ddf._id)}
                              className="outline_btn"
                            >
                              <div className="flex flex-row p-1">
                                Contrato
                              </div>
                            </button>
                          </>
                        )}
                    
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

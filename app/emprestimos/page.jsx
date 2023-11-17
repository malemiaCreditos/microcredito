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
    try {
      const response = await fetch(`api/emprestimoSolicitado/${id}`, {
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
      toast(`Lançamento removido com secesso!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const fetchPosts = async () => {
        const response = await fetch(`/api/emprestimoSolicitado`,{
          cache:"no-cache"
        });
        const data = await response.json();
        setEmprestimoLista(data);
      }; 
      fetchPosts();
    }
  }
  return (
    <>
      <div className="glassmorphism  w-full divWithScroll">
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
                            <div className="flex flex-row gap-4">
                              <div onClick={() => gerarContrato(ddf._id)} className="cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                  </svg>
                                </div> 
                                <div onClick={() => deleteUser(ddf._id)} className="cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                </div>
                            </div>                   
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

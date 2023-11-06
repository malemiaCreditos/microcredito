/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Card,
  Spacer,
  Divider,
  Input,
  Textarea,
  Link,
  Image,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { genero } from "../entradaSaida/data";
import { estadoCivild } from "../entradaSaida/data";
import { toast } from "react-toastify";
import Table1 from "../../components/Table1";
import PDFContrato from "../../components/PDFContrato";

function SolicitarEmprestimo() {
  var volatelEmpr = [];
  var incrMet = 0;
  var investTotal = 0;
  var jurosFuturo = 0;
  var recPrincipalTotal = 0;
  var recJurosTotal = 0;
  var totalDivida = 0;
  var totalDividaAtrasado = 0;
  const { data: session } = useSession();
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const [processando, setProcessando] = useState(false);
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [nomeCompletoA, setNomeCompletoA] = useState("");
  const [bI, setBI] = useState("");
  const [bIA, setBIA] = useState("");
  const [contacto, setContacto] = useState("");
  const [contactoA, setContactoA] = useState("");
  const [saldo, setSaldo] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [estadoCivilA, setEstadoCivilA] = useState("");
  const [endereco, setEndereco] = useState("");
  const [enderecoA, setEnderecoA] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [numeroCasaA, setNumeroCasaA] = useState("");
  const [quarteirao, setQuarteirao] = useState("");
  const [quarteiraoA, setQuarteiraoA] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [provincia, setProvincia] = useState("");
  const [bairroA, setBairroA] = useState("");
  const [cidadeA, setCidadeA] = useState("");
  const [distritoA, setDistritoA] = useState("");
  const [provinciaA, setProvinciaA] = useState("");
  const [fonteRendimento, setFonteRendimento] = useState("");
  const [garantias, setGarantias] = useState("");
  const [genero2, setGenero2] = useState("");
  const [genero2A, setGenero2A] = useState("");
  const [nUIT, setNUIT] = useState("");
  const [nUITA, setNUITA] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/emprestimoSolicitado`);
      const data = await response.json();
      data.map((f) => {
        if (f.userId === session?.user.email) {
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
        }
      });
    };
    fetchPosts();
  }, [session?.user]);
  useEffect(() => {
    volatelEmpr = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/lancamento`);
      const data = await response.json();
      data.map((f) => {
        investTotal += parseFloat(f.emprestimo);
        var jr = parseFloat(f.emprestimo) * parseFloat(f.jurosPercentual);
        var jrT = parseFloat(f.emprestimo) + jr;
        jurosFuturo += jr;
        var fEmprestimo = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(f.emprestimo);

        var fJuros = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(jr);

        var fJurosTotal = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(jrT);
        var pQit = 0;
        var patrasoFF = 0;
        if (f.pQuitadas) {
          pQit += parseInt(f.pQuitadas);
        }
        var pagaParc = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(jrT / parseInt(f.parcelas));
        totalDivida += jrT - (jrT / parseInt(f.parcelas)) * pQit;
        if (f.atrasado) {
          patrasoFF += parseInt(f.atrasado);
        }
        var valAtrasado =
          parseFloat(f.emprestimo) *
          parseFloat(f.multaPercentualDia) *
          patrasoFF;
        totalDividaAtrasado += valAtrasado;
        var dividaActual2 = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(jrT - (jrT / parseInt(f.parcelas)) * pQit + valAtrasado);
        var atrasoMetic = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(valAtrasado);
        recPrincipalTotal +=
          (jrT / parseInt(f.parcelas) -
            (jrT / parseInt(f.parcelas)) * parseFloat(f.jurosPercentual)) *
          pQit;
        var recAmortizacao = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(
          (jrT / parseInt(f.parcelas) -
            (jrT / parseInt(f.parcelas)) * parseFloat(f.jurosPercentual)) *
            pQit
        );
        recJurosTotal +=
          (jrT / parseInt(f.parcelas)) * parseFloat(f.jurosPercentual) * pQit;
        var recJuros = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(
          (jrT / parseInt(f.parcelas)) * parseFloat(f.jurosPercentual) * pQit
        );
        if (f.nomeCliente === nomeCompleto) {
          volatelEmpr.push({
            _id: f._id,
            dataEmprestimo: f.dataEmprestimo,
            nomeCliente: f.nomeCliente,
            emprestimo: fEmprestimo,
            jurosPercentual: f.jurosPercentual,
            jurosMetical: fJuros,
            dividaTotal: fJurosTotal,
            multaPercentualDia: f.multaPercentualDia,
            parcelas: f.parcelas,
            pQuitadas: pQit,
            pagamentoPParcela: pagaParc,
            rAmortizacao: recAmortizacao,
            rJuros: recJuros,
            tAtrasos: patrasoFF,
            atrasado: atrasoMetic,
            dividaActual: dividaActual2,
          });
        }
      });
      setEmprestimoLista(volatelEmpr);
    };
    if (session?.user) fetchPosts();
  }, [session?.user]);
  function novoLancamento() {
    setProcessando(true);
    toast("Enviando Solicitação de Emprestimo", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (
      nomeCompleto === "" ||
      bI === "" ||
      contacto === "" ||
      nomeCompletoA === "" ||
      bIA === "" ||
      contactoA === "" ||
      saldo === "" ||
      endereco === "" ||
      numeroCasa === "" ||
      bairro === "" ||
      cidade === "" ||
      distrito === "" ||
      provincia === "" ||
      enderecoA === "" ||
      numeroCasaA === "" ||
      bairroA === "" ||
      cidadeA === "" ||
      distritoA === "" ||
      provinciaA === "" ||
      fonteRendimento === "" ||
      garantias === "" ||
      genero2 === "" ||
      nUIT === "" ||
      genero2A === "" ||
      nUITA === "" ||
      dataNascimento === "" ||
      senha === "" ||
      quarteiraoA === "" ||
      estadoCivil === "" ||
      estadoCivilA === "" ||
      quarteirao === ""
    ) {
      toast("Todos os campos devem ser preenchidos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setProcessando(false);
    } else {
      try {
        const response = fetch("/api/emprestimoSolicitado/new", {
          method: "POST",
          body: JSON.stringify({
            nomeCompleto,
            bI,
            contacto,
            nomeCompletoA,
            bIA,
            contactoA,
            enderecoA,
            numeroCasaA,
            bairroA,
            cidadeA,
            distritoA,
            provinciaA,
            genero2A,
            nUITA,
            quarteiraoA,
            estadoCivil,
            estadoCivilA,
            saldo,
            endereco,
            numeroCasa,
            bairro,
            cidade,
            distrito,
            provincia,
            fonteRendimento,
            garantias,
            genero2,
            nUIT,
            dataNascimento,
            quarteirao,
            senha,
            status: "Pendente",
            userId: session?.user.email,
          }),
        });
        setProcessando(false);
        setFormularioEnviado(true);
        toast("Solicitação Enviada", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } catch (error) {
        console.log(error);
        setProcessando(false);
      }
    }
  }
  return (
    <>
      {session?.user && (
        <div className="glassmorphism">
          {status === "Pendente" ? (
            <>
              <h2 className="text-center text-yellow-500 text-2xl">
                Olá {nomeCompleto}
              </h2>
              <h2 className="text-center text-white text-2xl">
                A sua solicitação de Emprestimo ainda está em avaliação,
                entraremos em contacto através do contacto fornecido por si no
                formulário de registro para mais informações...
              </h2>
            </>
          ) : (
            <>
              {status === "Aprovado" ? (
                <>
                  <div className=" flex flex-col w-full">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="bg-yellow-700">
                          <div className="bg-yellow-800 py-4">
                            <div className="">
                              <Image
                                className="rounded-full"
                                alt="Profilo Pic"
                                src={session?.user.image}
                                width={80}
                                height={80}
                              />
                            </div>
                              
                              <div className="flex flex-col ml-2">
                                <p className="text-lg">{nomeCompleto}</p>
                                <p className="text-small text-default-500">
                                  {session?.user.email}
                                </p>
                              </div>
                          </div>
                          <Divider />
                          <div className="ml-2">
                          <p>
                              {" "}
                              <small className="font-bold text-lg">
                                Status:
                              </small>{" "}
                              {status}
                            </p>
                            <p>
                              {" "}
                              <small className="font-bold text-lg">
                                Contacto:
                              </small>{" "}
                              {contacto}
                            </p>
                            <p>
                              {" "}
                              <small className="font-bold text-lg">
                                Fonte de Rendimento:
                              </small>{" "}
                              {fonteRendimento}
                            </p>
                            <p>
                              {" "}
                              <small className="font-bold text-lg">
                                Garantias do Emprestimo:
                              </small>{" "}
                              {garantias}
                            </p>
                            <p className="flex flex-row gap-4">
                              {" "}
                              <small className="font-bold text-lg">
                                Pagar a Parcela:
                              </small>{" "}
                              <div className="bg-orange-600 rounded-full p-1">
                                <button type="button" onClick={() => {}}>
                                  <div className="px-2">Via Banco</div>
                                </button>
                              </div>
                            </p>
                          </div>
                            
                          <Divider />
                          <div className="flex flex-row justify-between bg-yellow-800 py-4 px-2">
                              <Link href="#">
                                <p className="font-bold text-black text-2xl">
                                  Emprestimo:{" "}
                                  {Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "MZN",
                                  }).format(parseFloat(saldo))}
                                </p>
                              </Link>
                              <div className="bg-orange-600 rounded-full p-1">
                                <button type="button" onClick={() => PDFContrato({
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
                                  })}>
                                  <div className="px-2">Contrato</div>
                                </button>
                              </div>
                          </div>
                      </div>
                      <div className="flex text-center w-full">
                        <Table1 emprestimoLista={emprestimoLista} />
                      </div>
                    </div>
                    <div></div>
                  </div>
                </>
              ) : (
                <>
                  {formularioEnviado ? (
                    <>
                      <h2 className="text-center text-yellow-500 text-2xl">
                        O Fomulário de Pré-Registro Para Solicitação de
                        Emprestimo Foi Enviado Com Sucesso
                      </h2>
                      <h2 className="text-center text-white text-2xl">
                        Estamos a avaliar a sua solicitação de Emprestimo,
                        entraremos em contacto através do contacto fornecido por
                        si no formulário de registro para mais informações...
                      </h2>
                    </>
                  ) : (
                    <>
                      <div className="w-full flex justify-center content-center">
                        <div className="flex flex-row w-full gap-4 justify-center">
                          <div className="w-4/5">
                            <h2 className="text-center text-yellow-500 text-2xl">
                              Fomulário de Pré-Registro Para Solicitação de
                              Emprestimo
                            </h2>
                                <Spacer y={1} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Nome Completo"
                                        type="text"
                                        value={nomeCompleto}
                                        onChange={(e) =>
                                          setNomeCompleto(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Número de BI"
                                        type="number"
                                        value={bI}
                                        onChange={(e) => setBI(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="NUIT"
                                        type="number"
                                        value={nUIT}
                                        onChange={(e) =>
                                          setNUIT(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Contacto"
                                        type="number"
                                        value={contacto}
                                        onChange={(e) =>
                                          setContacto(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={2} />
                                <div className="flex flex-row">
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <h2 className="text-center text-white w-full">
                                          Data de Nascimento:
                                        </h2>
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Saldo"
                                          type="date"
                                          value={dataNascimento}
                                          onChange={(e) =>
                                            setDataNascimento(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-row">
                                      <select 
                                        className="rounded-full p-1 w-full"
                                        value={genero2}
                                        onChange={(e) =>
                                        setGenero2(e.target.value)
                                        }>
                                          <option value="Gênero">Gênero</option>
                                          {genero.length > 0 && genero.map((animal) => (
                                            <>
                                              <option value={animal.label}>{animal.label}</option>
                                            </>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-row">
                                      <select 
                                        className="rounded-full p-1 w-full"
                                        value={estadoCivil}
                                        onChange={(e) =>
                                        setEstadoCivil(e.target.value)
                                        }>
                                          <option value="Estado Civil">Estado Civil</option>
                                          {estadoCivild.length > 0 && estadoCivild.map((animal) => (
                                            <>
                                              <option value={animal.label}>{animal.label}</option>
                                            </>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Senha"
                                          type="password"
                                          value={senha}
                                          onChange={(e) =>
                                            setSenha(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={2} />
                                <div className="flex flex-row">
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Endereço"
                                        type="text"
                                        value={endereco}
                                        onChange={(e) =>
                                          setEndereco(e.target.value)
                                        }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Quarteirão"
                                          type="text"
                                          value={quarteirao}
                                          onChange={(e) =>
                                            setQuarteirao(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Número da Casa"
                                          type="text"
                                          value={numeroCasa}
                                          onChange={(e) =>
                                            setNumeroCasa(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={2} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Bairro"
                                        type="text"
                                        value={bairro}
                                        onChange={(e) =>
                                          setBairro(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Cidade"
                                        type="text"
                                        value={cidade}
                                        onChange={(e) =>
                                          setCidade(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Distrito"
                                        type="text"
                                        value={distrito}
                                        onChange={(e) =>
                                          setDistrito(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Provincia"
                                        type="text"
                                        value={provincia}
                                        onChange={(e) =>
                                          setProvincia(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={2} />
                                <div className="flex flex-row">
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Saldo Solicitado"
                                          type="number"
                                          value={saldo}
                                          onChange={(e) =>
                                            setSaldo(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Qual é a sua fonte de rendimento mensal?"
                                          type="Text"
                                          value={fonteRendimento}
                                          onChange={(e) =>
                                            setFonteRendimento(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Descreva as garantias de pagamento do saldo solicitado por si...."
                                          value={garantias}
                                          onChange={(e) =>
                                            setGarantias(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={1} />
                              <Divider />
                              <h2 className="text-center text-white text-2xl">
                                Dados do Avalista
                              </h2>
                              <Spacer y={1} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Nome Completo"
                                        type="text"
                                        value={nomeCompletoA}
                                        onChange={(e) =>
                                          setNomeCompletoA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Número de BI"
                                        type="number"
                                        value={bIA}
                                        onChange={(e) => setBIA(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="NUIT"
                                        type="number"
                                        value={nUITA}
                                        onChange={(e) =>
                                          setNUITA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Contacto"
                                        type="number"
                                        value={contactoA}
                                        onChange={(e) =>
                                          setContactoA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={2} />
                                <div className="flex flex-row">
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-row">
                                      <select 
                                        className="rounded-full p-1 w-full"
                                        value={genero2A}
                                        onChange={(e) =>
                                        setGenero2A(e.target.value)
                                        }>
                                          <option value="Gênero">Gênero</option>
                                          {genero.length > 0 && genero.map((animal) => (
                                            <>
                                              <option value={animal.label}>{animal.label}</option>
                                            </>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-row">
                                      <select 
                                        className="rounded-full p-1 w-full"
                                        value={estadoCivilA}
                                        onChange={(e) =>
                                        setEstadoCivilA(e.target.value)
                                        }>
                                          <option value="Estado Civil">Estado Civil</option>
                                          {estadoCivild.length > 0 && estadoCivild.map((animal) => (
                                            <>
                                              <option value={animal.label}>{animal.label}</option>
                                            </>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Endereço"
                                        type="text"
                                        value={enderecoA}
                                        onChange={(e) =>
                                          setEnderecoA(e.target.value)
                                        }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Quarteirão"
                                          type="text"
                                          value={quarteiraoA}
                                          onChange={(e) =>
                                            setQuarteiraoA(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-full text-center">
                                    <div className="rounded-full p-1">
                                      <div className="flex flex-col">
                                        <Input
                                          className="max-w-ml"
                                          placeholder="Número da Casa"
                                          type="text"
                                          value={numeroCasaA}
                                          onChange={(e) =>
                                            setNumeroCasaA(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <Spacer y={2} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Bairro"
                                        type="text"
                                        value={bairroA}
                                        onChange={(e) =>
                                          setBairroA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Cidade"
                                        type="text"
                                        value={cidadeA}
                                        onChange={(e) =>
                                          setCidadeA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Distrito"
                                        type="text"
                                        value={distritoA}
                                        onChange={(e) =>
                                          setDistritoA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Provincia"
                                        type="text"
                                        value={provinciaA}
                                        onChange={(e) =>
                                          setProvinciaA(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              <Spacer y={1} />
                              <Divider />
                              <Spacer y={1} />
                  <div className="flex flex-row gap-4">
                  <div className="w-[120px]">
                                  <div className="bg-black rounded-full p-1 text-center">
                                    <button
                                      type={"button"}
                                      onClick={() => novoLancamento()}
                                      className="outline_btn"
                                    >
                                      <div className="flex flex-row p-1">
                                        {processando ? (
                                          <>
                                            {/* <CircularProgress
                                              color="warning"
                                              aria-label="Loading..."
                                            /> */}
                                          </>
                                        ) : (
                                          <><div className="text-white">Confirmar</div></>
                                        )}
                                      </div>
                                    </button>
                                  </div>
                                </div>
                                <h2 className="text-center text-white w-1/2">
                                  A sua solicitação do emprestimo passará por um
                                  processo de avaliação prévia! Será notificado
                                  através do número de telemóvel...
                                </h2>
                  </div>
                                
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default SolicitarEmprestimo;

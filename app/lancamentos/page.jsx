/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  Divider,
  Input,
  Spacer,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Table1 from "../../components/Table1";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

function Lancamentos() {
  const router = useRouter();
  var volatelEmpr = [];
  var incrMet = 0;
  var investTotal = 0;
  var jurosFuturo = 0;
  var recPrincipalTotal = 0;
  var recJurosTotal = 0;
  var totalDivida = 0;
  var totalDividaAtrasado = 0;
  const { data: session } = useSession();
  const [novaOperacao, setNovaOperacao] = useState(false);
  const [processando, setProcessando] = useState(false);
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [emprestimo, setEmprestimo] = useState("");
  const [jurosPercentual, setJurosPercentual] = useState("");
  const [multaPercentualDia, setMultaPercentualDia] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const [numeroAumne, setNumeroAumne] = useState(0);
  const [totalInvestido, setTotalInvestido] = useState(0);
  const [totalJurosFuturo, setTotalJurosFuturo] = useState(0);
  const [totalRecPrincipal, setTotalRecPrincipal] = useState(0);
  const [totalRecJuros, setTotalRecJuros] = useState(0);
  const [totalDividaTT, setTotalDividaTT] = useState(0);
  const [totalDividaAtrasadoF, setTotalDividaAtrasadoF] = useState(0);
// Status
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
      });
      setEmprestimoLista(volatelEmpr);
      setTotalInvestido(investTotal);
      setTotalJurosFuturo(jurosFuturo);
      setTotalRecPrincipal(recPrincipalTotal);
      setTotalRecJuros(recJurosTotal);
      setTotalDividaTT(totalDivida);
      setTotalDividaAtrasadoF(totalDividaAtrasado);
    };
    if (session?.user) fetchPosts();
  }, [numeroAumne]);
  function actualizar() {
    incrMet += 1;
    setNumeroAumne(incrMet);
  }
  function novoLancamento() {
    setProcessando(true);
    if (
      dataEmprestimo === "" ||
      nomeCliente === "" ||
      emprestimo === "" ||
      jurosPercentual === "" ||
      multaPercentualDia === "" ||
      parcelas === ""
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
        const response = fetch("/api/lancamento/new", {
          method: "POST",
          body: JSON.stringify({
            dataEmprestimo,
            nomeCliente,
            emprestimo,
            jurosPercentual,
            multaPercentualDia,
            parcelas,
            userId: session?.user.name,
          }),
        });
        setProcessando(false);
        setNovaOperacao(false);
        incrMet += 1;
        setNumeroAumne(incrMet);
      } catch (error) {
        console.log(error);
        setProcessando(false);
      }
    }
  }
  return (
    <>
      <div className="glassmorphism  flex-grow w-full">
        {novaOperacao ? (
          <>
            <div className="w-full flex justify-center content-center">
              <div className="flex flex-row w-full gap-4 justify-center">
                <div className="w-[120px]">
                  <div className="bg-yellow-900 rounded-full p-1">
                    <button
                      type={"button"}
                      onClick={() => setNovaOperacao(false)}
                      className="outline_btn"
                    >
                      <div className="flex flex-row px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Ver Lista
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-4/5">
                    
                      <div className="flex flex-row">
                        <div className="w-1/2 text-center">
                          <div className="bg-yellow-900 rounded-full p-1">
                            <Input
                              className="max-w-ml"
                              placeholder="Nome do Cliente"
                              type="text"
                              value={nomeCliente}
                              onChange={(e) => setNomeCliente(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="bg-yellow-900 rounded-full p-1">
                            <Input
                              className="max-w-ml"
                              type="date"
                              value={dataEmprestimo}
                              onChange={(e) =>
                                setDataEmprestimo(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-1/2 text-center">
                          <div className="bg-yellow-900 rounded-full p-1">
                            <Input
                              className="max-w-ml"
                              placeholder="Saldo (Emprestimo)"
                              type="number"
                              value={emprestimo}
                              onChange={(e) => setEmprestimo(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <Spacer y={4} />
                      <div className="flex flex-row">
                        <div className="w-1/2 text-center">
                          <div className="bg-yellow-900 rounded-full p-1">
                            <Input
                              className="max-w-ml"
                              placeholder="Juros (%)"
                              type="number"
                              value={jurosPercentual}
                              onChange={(e) =>
                                setJurosPercentual(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-1/2 text-center">
                          <div className="bg-yellow-900 rounded-full p-1">
                            <Input
                              className="max-w-ml"
                              placeholder="Multa/Dia (%)"
                              type="number"
                              value={multaPercentualDia}
                              onChange={(e) =>
                                setMultaPercentualDia(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="w-1/2 text-center">
                          <div className="bg-yellow-900 rounded-full p-1">
                            <Input
                              className="max-w-ml"
                              placeholder="Parcelas"
                              type="number"
                              value={parcelas}
                              onChange={(e) => setParcelas(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    
                    <Divider />
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
                                  <CircularProgress
                                    color="warning"
                                    aria-label="Loading..."
                                  />
                                </>
                              ) : (
                                <>Confirmar</>
                              )}
                            </div>
                          </button>
                        </div>
                      </div>
                  
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-4">
              <div className="w-1/2">
                
                  
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">TOTAL INVESTIDO</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalInvestido)}
                        </p>
                      </div>
                    </div>
                  
                
              </div>
              <div className="w-1/2">
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">REC. PRINCIPAL</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalRecPrincipal)}
                        </p>
                      </div>
                    </div>
                  
              </div>
              <div className="w-1/2">
                
                  
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">REC. JUROS</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalRecJuros)}
                        </p>
                      </div>
                    </div>
                  
                
              </div>
              <div className="w-1/2">
                
                  
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">PROV. JUROS</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalJurosFuturo)}
                        </p>
                      </div>
                    </div>
                  
                
              </div>
              <div className="w-1/2">
                
                  
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">ATRASADO</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalDividaAtrasadoF)}
                        </p>
                      </div>
                    </div>
                  
                
              </div>
              <div className="w-1/2">
                
                  
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">TOTAL A RECEBER</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalDividaTT)}
                        </p>
                      </div>
                    </div>
                  
                
              </div>
              <div className="w-[150px]">
                <div className="text-center">
                  <button
                    type={"button"}
                    onClick={() => setNovaOperacao(true)}
                    className="outline_btn"
                  >
                    <div className="flex flex-row">+</div>
                  </button>
                </div>
                <div className="text-center mt-2">
                  <button
                    type={"button"}
                    onClick={() => actualizar()}
                    className="outline_btn"
                  >
                    <div className="flex flex-row">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <Table1 emprestimoLista={emprestimoLista} />
          </>
        )}
      </div>
    </>
  );
}

export default Lancamentos;

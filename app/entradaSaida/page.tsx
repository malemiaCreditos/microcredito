/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React from "react";
import Table2 from "../../components/Table2";
import { useState, useEffect } from "react";
import { animals } from "./data";
import {
  Card,
  Divider,
  Input,
  Spacer,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

function EntradaSaida() {
  const router = useRouter();
  var incrMet = 0;
  var incrEmprestado = 0;
  var incrRecebido = 0;
  var volatelEmpr = [];
  var volatelEntradaSaida = [];
  const { data: session } = useSession();
  const [novaOperacao, setNovaOperacao] = useState(false);
  const [emprestimoLista, setEmprestimoLista] = useState([]);
  const [entradaSaidaLista, setEntradaSaidaLista] = useState([]);
  const [nomeCliente, setNomeCliente] = useState("");
  const [processando, setProcessando] = useState(false);
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [operacao, setOperacao] = useState("");
  const [saldo, setSaldo] = useState("");
  const [numeroAumne, setNumeroAumne] = useState(0);
  const [totalRecebido, setTotalRecebido] = useState(0);
  const [totalEmprestado, setTotalEmprestado] = useState(0);
  useEffect(() => {
    volatelEmpr = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/lancamento`,{
        cache:"no-cache"
      });
      const data = await response.json();
      data.map((f) => {
        volatelEmpr.push({
          _id: f._id,
          label: f.nomeCliente,
          value: f.nomeCliente,
        });
      });
      setEmprestimoLista(volatelEmpr);
    };
    if (session?.user) fetchPosts();
  }, [numeroAumne]);
  useEffect(() => {
    volatelEntradaSaida = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/entradaSaida`,{
        cache:"no-cache"
      });
      const data = await response.json();

      data.map((f) => {
        var fEmprestimo = Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "MZN",
        }).format(f.saldo);
        if (f.operacao === "Entrada") {
          incrRecebido += parseFloat(f.saldo);
        } else {
          incrEmprestado += parseFloat(f.saldo);
        }
        volatelEntradaSaida.push({
          _id: f._id,
          dataEmprestimo: f.dataEmprestimo,
          nomeCliente: f.nomeCliente,
          operacao: f.operacao,
          saldo: fEmprestimo,
        });
      });
      setEntradaSaidaLista(volatelEntradaSaida);
      setTotalRecebido(incrRecebido);
      setTotalEmprestado(incrEmprestado);
    };
    if (session?.user) fetchPosts();
  }, [numeroAumne]);
  useEffect(() => {
    volatelEntradaSaida = [];
    const fetchPosts = async () => {
      const response = await fetch(`/api/entradaSaida`,{
        cache:"no-cache"
      });
      const data = await response.json();

      data.map((f) => {
        if (nomeCliente === f.nomeCliente) {
          var fEmprestimo = Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "MZN",
          }).format(f.saldo);
          if (f.operacao === "Entrada") {
            incrRecebido += parseFloat(f.saldo);
          } else {
            incrEmprestado += parseFloat(f.saldo);
          }
          volatelEntradaSaida.push({
            _id: f._id,
            dataEmprestimo: f.dataEmprestimo,
            nomeCliente: f.nomeCliente,
            operacao: f.operacao,
            saldo: fEmprestimo,
          });
        }        
      });
      setEntradaSaidaLista(volatelEntradaSaida);
      setTotalRecebido(incrRecebido);
      setTotalEmprestado(incrEmprestado);
    };
    if (session?.user) fetchPosts();
  }, [nomeCliente]);
  async function novoLancamento() {
    setProcessando(true);
    if (
      dataEmprestimo === "" ||
      nomeCliente === "" ||
      operacao === "" ||
      saldo === ""
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
        const response = fetch("/api/entradaSaida/new", {
          method: "POST",
          body: JSON.stringify({
            dataEmprestimo,
            nomeCliente,
            operacao,
            saldo,
            userId: session?.user.name,
          }),
        });
        const response2 = await fetch(`/api/lancamento`);
        const data2 = await response2.json();
        let currentDate = new Date().toJSON().slice(0, 10);
        data2.map(async (fg) => {
          var pQit = 0;
          var atrasoM = 0;
          if (fg.nomeCliente === nomeCliente) {
            if (fg.pQuitadas) {
              pQit += parseInt(fg.pQuitadas) + 1;
            } else {
              pQit += 1;
            }
            if (`${dataEmprestimo}` === `${currentDate}`) {
            } else {
              if (fg.atrasado) {
                atrasoM += parseInt(fg.atrasoM) + 1;
              } else {
                atrasoM += 1;
              }
            }

            try {
              const response = await fetch(`api/lancamento/${fg._id}`, {
                method: "PATCH",
                body: JSON.stringify({
                  dataEmprestimo: fg.dataEmprestimo,
                  nomeCliente: fg.nomeCliente,
                  emprestimo: fg.emprestimo,
                  jurosPercentual: fg.jurosPercentual,
                  multaPercentualDia: fg.multaPercentualDia,
                  parcelas: fg.parcelas,
                  pQuitadas: pQit,
                  atrasado: atrasoM,
                  userId: session?.user.name,
                }),
              });
            } catch (error) {
              console.log(error);
            } finally {
              setProcessando(false);
            }
          }
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
  function actualizar() {
    incrMet += 1;
    setNumeroAumne(incrMet);
  }
  return (
    <>
    <div className="glassmorphism divWithScroll">
    {novaOperacao ? (
        <>
          <div className="w-full flex justify-center content-center">
            <div className="flex flex-row w-full gap-4 justify-center">
              <div className="w-[120px]">
                <div className="rounded-full p-1 mb-4">
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
                <div className="rounded-full p-1 text-center">
                  <button
                    type={"button"}
                    onClick={() => actualizar()}
                    className="outline_btn"
                  >
                    <div className="flex flex-row p-1">
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
              <div className="w-4/5">
                    <div className="flex flex-row">
                      <div className="w-1/2 text-center">
                        <div className="rounded-full p-1">
                          <select 
                          className="rounded-full p-1 w-full"
                          value={nomeCliente}
                              onChange={(e) => setNomeCliente(e.target.value)}>
                            <option value="Nome do Cliente">Nome do Cliente</option>
                            {emprestimoLista.length > 0 && emprestimoLista.map((animal) => (
                                <>
                                <option value={animal.label}>{animal.label}</option>
                                </>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="rounded-full p-1  w-full">
                          <Input
                            className="max-w-ml"
                            type="date"
                            value={dataEmprestimo}
                            onChange={(e) => setDataEmprestimo(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <Spacer y={1} />
                    <div className="flex flex-row">
                      <div className="w-1/2 text-center">
                        <div className="rounded-full p-1  w-full">
                          <Input
                            className="max-w-ml"
                            placeholder="Saldo"
                            type="number"
                            value={saldo}
                            onChange={(e) => setSaldo(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-1/2 text-center">
                        <div className="rounded-full p-1">
                        <select 
                        className="rounded-full p-1 w-full"
                        value={operacao}
                            onChange={(e) => setOperacao(e.target.value)}>
                          <option value="Operação">Operação</option>
                          {animals.length > 0 && animals.map((animal) => (
                              <>
                              <option value={animal.label}>{animal.label}</option>
                              </>
                            ))}
                        </select>
                        </div>
                      </div>
                    </div>
                    <Spacer y={1} />
                  <Divider />
                  <Spacer y={1} />
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full">
            <div className="flex flex-row gap-4">
              <div className="w-1/2 ">
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-12 h-12"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">EMPRESTADO</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalEmprestado)}
                        </p>
                      </div>
                    </div>
              </div>
              <div className="w-1/2 ">
                    <div className="flex flex-row gap-2">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-12 h-12"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">RECEBIDO</p>
                        <p className="text-sm text-default-500">
                          {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "MZN",
                          }).format(totalRecebido)}
                        </p>
                      </div>
                    </div>
              </div>
              {novaOperacao ? (
                <></>
              ) : (
                <>
                  <div className="w-1/2">
                    <div className="flex rounded-full p-1 justify-center">
                      <button
                        type={"button"}
                        onClick={() => setNovaOperacao(true)}
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
                              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                            />
                          </svg>
                          Add
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="w-1/2 text-center">
              <div className="rounded-full p-1">
                          <select 
                          className="rounded-full p-1 w-full"
                          value={nomeCliente}
                              onChange={(e) => setNomeCliente(e.target.value)}>
                            <option value="Nome do Cliente">Nome do Cliente</option>
                            {emprestimoLista.length > 0 && emprestimoLista.map((animal) => (
                                <>
                                <option value={animal.label}>{animal.label}</option>
                                </>
                              ))}
                          </select>
                        </div>
              </div>
            </div>
            <div className="w-[100px] rounded-full p-1 text-center mt-4">
              <button
                type={"button"}
                onClick={() => actualizar()}
                className="outline_btn"
              >
                <div className="flex flex-row p-1">
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
            <Table2 entradaSaidaLista={entradaSaidaLista} />
          </div>
        </>
      )}
    </div>      
    </>
  );
}

export default EntradaSaida;

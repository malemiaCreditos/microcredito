/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Spacer,
  Divider,
  CardFooter,
  CircularProgress,
  Input,
  Textarea,
  CardHeader,
  Link,
  Image,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import React from "react";
import { genero } from "../entradaSaida/data";
import { toast } from "react-toastify";
import Table1 from "../../components/Table1";

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
  const [bI, setBI] = useState("");
  const [contacto, setContacto] = useState("");
  const [saldo, setSaldo] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [distrito, setDistrito] = useState("");
  const [provincia, setProvincia] = useState("");
  const [fonteRendimento, setFonteRendimento] = useState("");
  const [garantias, setGarantias] = useState("");
  const [genero2, setGenero2] = useState("");
  const [nUIT, setNUIT] = useState("");
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
          setSaldo(f.saldo);
          setStatus(f.status);
          setContacto(f.contacto);
          setFonteRendimento(f.fonteRendimento);
          setGarantias(f.garantias);
        }
      });
    };
    if (session?.user) fetchPosts();
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
      saldo === "" ||
      nomeMae === "" ||
      endereco === "" ||
      numeroCasa === "" ||
      bairro === "" ||
      cidade === "" ||
      distrito === "" ||
      provincia === "" ||
      fonteRendimento === "" ||
      garantias === "" ||
      genero2 === "" ||
      nUIT === "" ||
      dataNascimento === "" ||
      senha === "" ||
      nomePai === ""
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
            saldo,
            nomeMae,
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
            nomePai,
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
        <div>
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
                  <div className="w-full">
                    <div className="flex flex-row gap-4 w-[1400px]">
                      <div className="bg-yellow-800">
                        <Card className="w-[400px]">
                          <div className="bg-yellow-900">
                            <CardHeader className="flex gap-3">
                              <Image
                                className="rounded-full"
                                alt="Profilo Pic"
                                src={session?.user.image}
                                width={40}
                                height={40}
                              />
                              <div className="flex flex-col">
                                <p className="text-lg">{nomeCompleto}</p>
                                <p className="text-small text-default-500">
                                  {session?.user.email}
                                </p>
                              </div>
                            </CardHeader>
                          </div>
                          <Divider />
                          <CardBody>
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
                          </CardBody>
                          <Divider />
                          <div className="bg-yellow-900">
                            <CardFooter>
                              <Link href="#">
                                <p className="font-bold">
                                  Emprestimo Solicitado:{" "}
                                  {Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "MZN",
                                  }).format(parseFloat(saldo))}
                                </p>
                              </Link>
                            </CardFooter>
                          </div>
                        </Card>
                      </div>
                      <div className="flex text-center w-[1100px]">
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
                            <Spacer y={4} />
                            <Card className="bg-yellow-900">
                              <CardBody>
                                <Spacer y={4} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                <Spacer y={4} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
                                      <div className="flex flex-row">
                                        <h2 className="text-center text-white w-1/2">
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
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
                                      <div className="flex flex-row">
                                        <Select
                                          items={genero}
                                          label="Gênero"
                                          placeholder="Gênero"
                                          className="max-w-xs"
                                          value={genero2}
                                          onChange={(e) =>
                                            setGenero2(e.target.value)
                                          }
                                        >
                                          {(animal) => (
                                            <SelectItem key={animal.value}>
                                              {animal.label}
                                            </SelectItem>
                                          )}
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
                                      <div className="flex flex-row">
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
                                <Spacer y={4} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Nome do Pai"
                                        type="text"
                                        value={nomePai}
                                        onChange={(e) =>
                                          setNomePai(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
                                      <Input
                                        className="max-w-ml"
                                        placeholder="Nome da Mão"
                                        type="text"
                                        value={nomeMae}
                                        onChange={(e) =>
                                          setNomeMae(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                <Spacer y={4} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                <Spacer y={4} />
                                <div className="flex flex-row">
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
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
                                  <div className="w-1/2 text-center">
                                    <div className="bg-yellow-900 rounded-full p-1">
                                      <Textarea
                                        label="Garantias de Pagamento"
                                        labelPlacement="outside"
                                        placeholder="Descreva as garantias de pagamento do saldo solicitado por si...."
                                        className="max-w-xs"
                                        value={garantias}
                                        onChange={(e) =>
                                          setGarantias(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                              <Divider />
                              <CardFooter>
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
                                          <>Solicitar</>
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
                              </CardFooter>
                            </Card>
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

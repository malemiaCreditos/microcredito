import { connectToDB } from "../../../utils/database";
import EmprestimosSolicitados from "../../../models/solicitarEmprestimo";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await EmprestimosSolicitados.find();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
export const POST = async (req, res) => {
  const {
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
    status,
    userId,
  } = await req.json();

  try {
    await connectToDB();
    const newEvento = new EmprestimosSolicitados({
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
      status,
      userId,
    });

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new servico", { status: 500 });
  }
};

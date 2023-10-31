import EntradaSaida from "../../../models/entradaSaida";
import { connectToDB } from "../../../utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await EntradaSaida.find();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
export const POST = async (req, res) => {
  const { dataEmprestimo, nomeCliente, operacao, saldo } = await req.json();

  try {
    await connectToDB();
    const newEvento = new EntradaSaida({
      dataEmprestimo,
      nomeCliente,
      operacao,
      saldo,
    });

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new servico", { status: 500 });
  }
};


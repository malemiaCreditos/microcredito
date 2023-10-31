import Lancamentos from "../../../models/lancamentos";
import { connectToDB } from "../../../utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompts = await Lancamentos.find();
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
export const POST = async (req, res) => {
  const {
    dataEmprestimo,
    nomeCliente,
    emprestimo,
    jurosPercentual,
    multaPercentualDia,
    parcelas,
  } = await req.json();

  try {
    await connectToDB();
    const newEvento = new Lancamentos({
      dataEmprestimo,
      nomeCliente,
      emprestimo,
      jurosPercentual,
      multaPercentualDia,
      parcelas,
    });

    await newEvento.save();
    return new Response(JSON.stringify(newEvento), { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new servico", { status: 500 });
  }
};

import Lancamentos from "../../../../models/lancamentos";
import { connectToDB } from "../../../../utils/database";

export const PATCH = async (request, { params }) => {
  const {
    dataEmprestimo,
    nomeCliente,
    emprestimo,
    jurosPercentual,
    multaPercentualDia,
    parcelas,
    pQuitadas,
    atrasado,
    userId,
  } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Lancamentos.findById(params.id);
    if (!existingPrompt) return new Response("Not found", { status: 404 });

    existingPrompt.dataEmprestimo = dataEmprestimo;
    existingPrompt.nomeCliente = nomeCliente;
    existingPrompt.emprestimo = emprestimo;
    existingPrompt.jurosPercentual = jurosPercentual;
    existingPrompt.multaPercentualDia = multaPercentualDia;
    existingPrompt.parcelas = parcelas;
    existingPrompt.pQuitadas = pQuitadas;
    existingPrompt.atrasado = atrasado;
    existingPrompt.userId = userId;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

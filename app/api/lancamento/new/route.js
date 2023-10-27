import { connectToDB } from "../../../../utils/database";
import Lancamentos from "../../../../models/lancamentos";

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

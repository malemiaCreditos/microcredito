import { connectToDB } from "../../../../../utils/database";
import EntradaSaida from "../../../../../models/entradaSaida";

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

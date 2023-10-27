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

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

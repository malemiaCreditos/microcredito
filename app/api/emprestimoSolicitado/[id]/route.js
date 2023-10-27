import EmprestimosSolicitados from "../../../../../models/solicitarEmprestimo";
import { connectToDB } from "../../../../../utils/database";

export const PATCH = async (request, { params }) => {
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
  } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await EmprestimosSolicitados.findById(params.id);
    if (!existingPrompt) return new Response("Not found", { status: 404 });

    existingPrompt.nomeCompleto = nomeCompleto;
    existingPrompt.bI = bI;
    existingPrompt.contacto = contacto;
    existingPrompt.saldo = saldo;
    existingPrompt.nomeMae = nomeMae;
    existingPrompt.endereco = endereco;
    existingPrompt.numeroCasa = numeroCasa;
    existingPrompt.bairro = bairro;
    existingPrompt.cidade = cidade;
    existingPrompt.distrito = distrito;
    existingPrompt.provincia = provincia;
    existingPrompt.fonteRendimento = fonteRendimento;
    existingPrompt.garantias = garantias;
    existingPrompt.genero2 = genero2;
    existingPrompt.nUIT = nUIT;
    existingPrompt.dataNascimento = dataNascimento;
    existingPrompt.nomePai = nomePai;
    existingPrompt.senha = senha;
    existingPrompt.status = status;
    existingPrompt.userId = userId;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};

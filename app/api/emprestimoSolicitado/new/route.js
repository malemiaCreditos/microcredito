import { connectToDB } from "../../../../utils/database";
import EmprestimosSolicitados from "../../../../models/solicitarEmprestimo";

export const POST = async (req, res) => {
  const {
    nomeCompleto,
    nomeCompletoA,
    bI,
    bIA,
    contacto,
    contactoA,
    saldo,
    endereco,
    enderecoA,
    numeroCasa,
    numeroCasaA,
    bairro, 
    cidade,
    distrito,
    provincia,
    bairroA,
    cidadeA,
    distritoA,
    provinciaA,
    fonteRendimento,
    garantias,
    genero2,
    genero2A,
    nUIT,
    nUITA,
    dataNascimento,
    quarteirao,
    quarteiraoA,
    senha,
    estadoCivil,
    estadoCivilA,
    status,
    userId,
  } = await req.json();

  try {
    await connectToDB();
    const newEvento = new EmprestimosSolicitados({
      nomeCompleto,
      nomeCompletoA,
      bI,
      bIA,
      contacto,
      contactoA,
      saldo,
      endereco,
      enderecoA,
      numeroCasa,
      numeroCasaA,
      bairro,
      cidade,
      distrito,
      provincia,
      bairroA,
      cidadeA,
      distritoA,
      provinciaA,
      fonteRendimento,
      garantias,
      genero2,
      genero2A,
      estadoCivil,
      estadoCivilA,
      nUIT,
      nUITA,
      dataNascimento,
      quarteirao,
      quarteiraoA,
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

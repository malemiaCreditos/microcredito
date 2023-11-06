import { Schema, model, models } from "mongoose";

const EmprestimosSolicitadosSchema = new Schema({
  nomeCompleto: { type: String, require: true },
  nomeCompletoA: { type: String, require: true },
  bI: { type: String, require: true },
  bIA: { type: String, require: true },
  contacto: { type: String, require: true },
  contactoA: { type: String, require: true },
  saldo: { type: String, require: true },
  estadoCivil: { type: String, require: true },
  estadoCivilA: { type: String, require: true },
  endereco: { type: String, require: true },
  enderecoA: { type: String, require: true },
  numeroCasa: { type: String, require: true },
  numeroCasaA: { type: String, require: true },
  bairro: { type: String, require: true },
  cidade: { type: String, require: true },
  distrito: { type: String, require: true },
  provincia: { type: String, require: true },
  bairroA: { type: String, require: true },
  cidadeA: { type: String, require: true },
  distritoA: { type: String, require: true },
  provinciaA: { type: String, require: true },
  fonteRendimento: { type: String, require: true },
  garantias: { type: String, require: true },
  genero2: { type: String, require: true },
  genero2A: { type: String, require: true },
  nUIT: { type: String, require: true },
  nUITA: { type: String, require: true },
  dataNascimento: { type: String, require: true },
  status: { type: String },
  quarteirao: { type: String, require: true },
  quarteiraoA: { type: String, require: true },
  senha: { type: String, require: true },
  userId: { type: String, require: true },
});

const EmprestimosSolicitados =
  models.EmprestimosSolicitados ||
  model("EmprestimosSolicitados", EmprestimosSolicitadosSchema);

export default EmprestimosSolicitados;

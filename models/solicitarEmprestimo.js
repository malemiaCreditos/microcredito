import { Schema, model, models } from "mongoose";

const EmprestimosSolicitadosSchema = new Schema({
  nomeCompleto: { type: String, require: true },
  bI: { type: String, require: true },
  contacto: { type: String, require: true },
  saldo: { type: String, require: true },
  nomeMae: { type: String, require: true },
  endereco: { type: String, require: true },
  numeroCasa: { type: String, require: true },
  bairro: { type: String, require: true },
  cidade: { type: String, require: true },
  distrito: { type: String, require: true },
  provincia: { type: String, require: true },
  fonteRendimento: { type: String, require: true },
  garantias: { type: String, require: true },
  genero2: { type: String, require: true },
  nUIT: { type: String, require: true },
  dataNascimento: { type: String, require: true },
  status: { type: String },
  nomePai: { type: String, require: true },
  senha: { type: String, require: true },
  userId: { type: String, require: true },
});

const EmprestimosSolicitados =
  models.EmprestimosSolicitados ||
  model("EmprestimosSolicitados", EmprestimosSolicitadosSchema);

export default EmprestimosSolicitados;

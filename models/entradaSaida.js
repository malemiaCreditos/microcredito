import { Schema, model, models } from "mongoose";

const EntradaSaidaSchema = new Schema({
  dataEmprestimo: { type: String, require: true },
  nomeCliente: { type: String, require: true },
  operacao: { type: String, require: true },
  saldo: { type: String, require: true },
});

const EntradaSaida =
  models.EntradaSaida || model("EntradaSaida", EntradaSaidaSchema);

export default EntradaSaida;

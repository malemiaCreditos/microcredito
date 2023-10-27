import { Schema, model, models } from "mongoose";

const LancamentosSchema = new Schema({
  dataEmprestimo: { type: String, require: true },
  nomeCliente: { type: String, require: true },
  emprestimo: { type: String, require: true },
  jurosPercentual: { type: String, require: true },
  jurosMetical: { type: String },
  dividaTotal: { type: String },
  multaPercentualDia: { type: String, require: true },
  parcelas: { type: String, require: true },
  pQuitadas: { type: String },
  rAmortizacao: { type: String },
  rJuros: { type: String },
  atrasado: { type: String },
  dividaActual: { type: String },
});

const Lancamentos =
  models.Lancamentos || model("Lancamentos", LancamentosSchema);

export default Lancamentos;

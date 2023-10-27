import React from "react";
import "./ts.css";
import { toast } from "react-toastify";
function Table3({ emprestimoLista }) {
  async function updateEmprestimo(id) {
    toast(`Processando`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    const response = await fetch(`/api/emprestimoSolicitado`);
    const data = await response.json();
    data.map(async (tt) => {
      if (tt._id === id) {
        try {
          const response = await fetch(`api/emprestimoSolicitado/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
              nomeCompleto: tt.nomeCompleto,
              bI: tt.bI,
              contacto: tt.contacto,
              saldo: tt.saldo,
              nomeMae: tt.nomeMae,
              endereco: tt.endereco,
              numeroCasa: tt.numeroCasa,
              bairro: tt.bairro,
              cidade: tt.cidade,
              distrito: tt.distrito,
              provincia: tt.provincia,
              fonteRendimento: tt.fonteRendimento,
              garantias: tt.garantias,
              genero2: tt.genero2,
              nUIT: tt.nUIT,
              dataNascimento: tt.dataNascimento,
              nomePai: tt.nomePai,
              senha: tt.senha,
              status: "Aprovado",
              userId: tt.userId,
            }),
          });
        } catch (error) {
          toast(`Erro: ${error}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } finally {
          toast(`Emprestimo da(o) ${tt.nomeCompleto} foi aprovado`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  }
  return (
    <>
      <div id="table_wrapper">
        <table id="customers" className="mt-4">
          <tr>
            <th>Nome Cliente</th>
            <th>Gênero</th>
            <th>Contacto</th>
            <th>BI</th>
            <th>NUIT</th>
            <th>Nascimento</th>
            <th>Endereço</th>
            <th>Nr. Casa</th>
            <th>Bairro</th>
            <th>Cidade</th>
            <th>Distrito</th>
            <th>Provincia</th>
            <th>Nome do Pai</th>
            <th>Nome da Mãe</th>
            <th>Emp. Solicitado</th>
            <th>Font. Rendimento</th>
            <th>Gar. Pagamento</th>
            <th>Status</th>
            <th>...</th>
          </tr>

          {emprestimoLista.length > 0 &&
            emprestimoLista.map((ddf) => (
              <>
                <tr>
                  <td>{ddf.nomeCompleto}</td>
                  <td>{ddf.genero2}</td>
                  <td>{ddf.contacto}</td>
                  <td>{ddf.bI}</td>
                  <td>{ddf.nUIT}</td>
                  <td>{ddf.dataNascimento}</td>
                  <td>{ddf.endereco}</td>
                  <td>{ddf.numeroCasa}</td>
                  <td>{ddf.bairro}</td>
                  <td>{ddf.cidade}</td>
                  <td>{ddf.distrito}</td>
                  <td>{ddf.provincia}</td>
                  <td>{ddf.nomePai}</td>
                  <td>{ddf.nomeMae}</td>
                  <td>{ddf.saldo}</td>
                  <td>{ddf.fonteRendimento}</td>
                  <td>{ddf.garantias}</td>
                  <td>{ddf.status}</td>
                  <td>
                    <button
                      type={"button"}
                      onClick={() => updateEmprestimo(ddf._id)}
                      className="outline_btn"
                    >
                      <div className="flex flex-row p-1">
                        {ddf.status === "Pendente" ? (
                          <>
                            <>Aprovar</>
                          </>
                        ) : (
                          <>...</>
                        )}
                      </div>
                    </button>
                  </td>
                </tr>
              </>
            ))}
        </table>
      </div>
    </>
  );
}

export default Table3;

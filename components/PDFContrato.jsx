import pdfMake from "pdfmake/build/pdfmake";
import getBase64ImageFromURL from "./imageConverter";
import pdfFonts from "pdfmake/build/vfs_fonts";

async function PDFContrato({
  nomeCompleto, 
  bI,
  bIA,
  cidade, 
  distrito, 
  bairro,
  bairroA,
  numeroCasa,
  fonteRendimento,
  contacto,
  nUIT,
  saldo,
  nomeCompletoA,
  estadoCivil,
  estadoCivilA,
  cidadeA,
  distritoA,
  quarteirao,
  quarteiraoA,
  numeroCasaA,
  contactoA,
  nUITA
}) {
  const mesesList = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    " de " +
    mesesList[(currentdate.getMonth())] +
    " de " +
    currentdate.getFullYear();
  const imagemVarivel = await getBase64ImageFromURL("/assets/images/malemiaLogo.png");
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.fonts = {
        Roboto: {
          normal: "Roboto-Regular.ttf",
          bold: "Roboto-Medium.ttf",
          italics: "Roboto-Italic.ttf",
          bolditalics: "Roboto-Italic.ttf",
        },
      };

    const reportTitle = [];
    const details = [
      {
        image: imagemVarivel,
        width: 50,
        height: 50,
        alignment: 'center'
      },
      {
        text: 'Malemia Microcrédito E.I.',
        style: 'header',
        alignment: 'center'
      },
      {
        text: 'CONTRATO DE MÙTUO FINANCEIRO INDIVIDUAL',
        style: 'subheader',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'MUTUANTE: Malemia Microcrédito E.I.', fontSize: 12, bold: true},
        ' neste acto representado polo gestor Administrativo ',
        {text: 'Felizardo Lourenço Malemia, ', fontSize: 12, bold: true},
        'de nacionalidade moçambicana, solteiro, com o Bilhete de Identidade número 100105196687B, residente na Cidade de Maputo, distrito urbano de KaMubucuana, Bairro do Jardim, Quarteirão número 03, Casa número 34'
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
        'E'
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: `MUTUÁRIO: ${nomeCompleto},`, fontSize: 12, bold: true},
          ` de nacionalidade moçambicana, ${estadoCivil}, com o Bilhete de Identidade número ${bI}, NUIT ${nUIT}, `,
          `residente na Cidade de(a) ${cidade} , distrito urbano de ${distrito}, Bairro ${bairro}, Quarteirão número ${quarteirao}, Casa número ${numeroCasa}, `,
        `tendo como fonte de rendimento ${fonteRendimento}, contactável pelo(s) número(s) ${contacto}, `,
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
        'As partes acima identificadas têm, entre si, um contrato de mútuo financeiro individual, o qual é regulado pelas seguintes cláusulas:'
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA PRIMEIRA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DO OBJECTO', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: `Este contrato tem como objecto o empréstimo de ${Intl.NumberFormat("en-US", {style: "currency", currency: "MZN",}).format(saldo)} pelo `},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'ao '},
          {text: 'MUTUÁRIO.', fontSize: 12, bold: true},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA SEGUNDA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DO AVALISTA', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: `tem como avalista do presente contrato o(a) Sr(a) ${nomeCompletoA} de nacionalidade moçambicana, ${estadoCivilA}, com o `},
          {text: `Bilhete de Identidade número ${bIA}, NUIT ${nUITA}, residente na Cidade de ${cidadeA}, distrito urbano ${distritoA}, Bairro ${bairroA}, Quarteirão número ${quarteiraoA}, `},
          {text: ` Casa número ${numeroCasaA}, contactável pelos números ${contactoA}.`},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'PARAGRAFO ÚNICO: ', fontSize: 12, bold: true},
          {text: 'O Avalista é responsável por dar credibilidade e segurança ao MUTUANTE, no presente contrato; este se torna, '},
          {text: 'automaticamente devedor do empréstimo solicitado pelo MUTUÁRIO no caso de não pagamento deste.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA TERCEIRA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DOS PRAZOS E PARCELAS', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. O empréstimo solicitado pelo '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'será dividido em 26 parcelas.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '2. O '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'o obriga-se a pagar o empréstimo solicitado dentro de 26 dias uteis, contados a partir do dia seguinte à da data da assinatura do presente contrato.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '3. O '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'irá pagar o empréstimo todos os dias uteis correspondentes ao número de parcelas.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '4. O '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'deverá pagar 1 (uma) parcela a cada 24 horas após o pagamento da parcela anterior até ao fim de todas as parcelas.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '5. Em casos de pagamento de parcelas em acumulado o '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'voltará a pagar o empréstimo após “n” dias correspondente ao número de parcelas previamente pagas em acumulado.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA QUARTA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DOS JUROS E MORA DO MUTUÁRIO', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. O juro aplicado ao crédito é de 30% do valor cedido'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '2. O pagamento deverá ocorrer dentro do período estabelecido na Cláusula Quarta deste contrato, sob pena de:'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'a) Não renovação deste contrato.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'b) Renovação mediante o pagamento da taxa de 30% do saldo do próximo contrato solicitado pelo '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '3. Serão aplicadas multas ao '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'sempre que não se cumprir com o formato de pagamento estabelecido na Cláusula Terceira do Paragrafo 4 (Quatro) deste contrato.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'PARAGRAFO ÚNICO: ', fontSize: 12, bold: true},
          {text: 'Para casos de negociação da taxa de juros, a multa será acrescentada na base da nova taxa acordada.'},
          {text: 'automaticamente devedor do empréstimo solicitado pelo MUTUÁRIO no caso de não pagamento deste.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA QUINTA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DAS AMORTIZAÇÕES', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. O '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'deverá efectuar o pagamento, nas datas acordadas, de forma directa ao Agente de Cobranças, devidamente identificado, designado pelo '},
          {text: 'MUTUANTE.', fontSize: 12, bold: true},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'O pagamento referido no paragrafo, supra, desta Cláusula será efectuado por maio de transferência para as contas Bancarias ou Móvel do'},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'e/ou em Numerário.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA SEXTA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DAS GARANTIAS', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. O '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'deverá colocar como garantia Bens e/ou Propriedades com valores equivalentes ao empréstimo solicitado.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '2. Em casos de Propriedades dadas como garantia, o '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'deverá centregar ao '},
          {text: 'MUTUANTE, ', fontSize: 12, bold: true},
          {text: 'os documentos que comprovam que as Propriedades referidas pertencem ao '},
          {text: 'MUTUÁRIO.', fontSize: 12, bold: true},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '3. Em casos de incumprimento de pagamento do empréstimo o '},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'tomara para si todos os Bens e/ou Propriedades dadas como garantias pelo '},
          {text: 'MUTUÁRIO.', fontSize: 12, bold: true},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '4. O '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'obriga-se ainda a indicar um Avalista devidamente identificado com um dos seguintes documentos validos: B.I., NUIT, Cartão de Eleitor, Carta de Condução ou Passaporte.'},
      ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '5. O Avalista deverá colocar como garantia Bens e/ou Propriedades com valores equivalentes ao empréstimo solicitado.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '6. Em casos de Propriedades dadas como garantia, o Avalista deverá entregar ao '},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'os documentos que comprovam que as Propriedades referidas pertencem ao Avalista.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '7. Em casos de incumprimento de pagamento do empréstimo o '},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'tomara para si todos os Bens e/ou Propriedades dadas como garantias pelo Avalista.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '8. Os Bens dados como garantias deverão ser listados em um documento e anexado a este contrato. O documento produzido deverá ter a assinatura do:'},
          {text: 'MUTUANTE, MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'e do Avalista.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA SÉTIMA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DAS COBRANÇAS', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. Para pagamentos em numerário o Agente de Cobranças deverá se deslocar até ao endereço do'},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'ara obter o valor do pagamento diário.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '2. Sempre que o Agente de Cobranças se deslocar para o endereço do'},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'para efectuar a cobrança do valor de pagamento diário e o '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'não proceder com o pagamento por razões que não sejam de força maior tais como:'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'a) Falecimentos;'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'b) Doenças;'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'fora as multas aplicáveis por incumprimento de pagamento dentro do prazo, o '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'deverá ressarcir imediatamente o valor de transporte, não superior a 100,00 Mt, gastos pelo Agente de Cobranças.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '3. O valor referido no paragrafo 2, supra, desta Cláusula não amortiza o Crédito em divida.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA NONA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DA VALIDADE', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. O presente contrato passa a vigorar a partir da data da assinatura do mesmo e vigorará até a data da quitação da última parcela do empréstimo solicitado pelo '},
          {text: 'MUTUÁRIO.', fontSize: 12, bold: true},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '(CLÁUSULA DÉCIMA)', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'DA RESOLUÇÃO DE CONFLITOS', fontSize: 12, bold: true},        
      ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '1. Em casos de incumprimento de uma das Cláusulas deste contrato o '},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'reserva-se o direito de resolução do conflito segundo as Normas de Resolução de Conflitos vigentes na '},
          {text: 'Malemia Microcrédito E.I.', fontSize: 12, bold: true},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: '2. Em casos de ineficiência dos meios referidos no paragrafo 1 (um), supra desta Cláusula, o'},
          {text: 'MUTUANTE ', fontSize: 12, bold: true},
          {text: 'pode de forma ponderada mover um processo crime contra o '},
          {text: 'MUTUÁRIO ', fontSize: 12, bold: true},
          {text: 'no Tribunal Judicial do Distrito em causa.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: 'Por estarem cientes do teor do presente contrato, as partes firmam o presente instrumento contratual em duas vias de igual teor.'},
           ],
        style: 'bodyDoc',
        alignment: 'justify'
      },
      {
        width: 5,
        text: "\n\n\n\n",
      },
      {
        alignment: "justify",
        columns: [
          {
            width: "*",
            alignment: "center",
            text: [
              {text: 'O MUTUANTE\n\n', fontSize: 12, bold: true},
              {text: '______________________________'},
            ],
          },
          {
            width: "*",
            alignment: "center",
            text: [
              {text: 'O MUTUÁRIO\n\n', fontSize: 12, bold: true},
              {text: '______________________________'},
            ],
          },
        ],
      },
      {
        width: 5,
        text: "\n\n",
      },
      {
        text: [
          {text: 'Maputo, aos'},
           ],
        style: 'bodyDoc',
        alignment: 'center'
      },
      {
        width: 5,
        text: "\n",
      },
      {
        text: [
          {text: `${datetime}`},
           ],
        style: 'bodyDoc',
        alignment: 'center'
      },
  ];
    const rodape = [];
    function Rodape(currentPage, pageCount) {
      return [
        {
          text: currentPage + " / " + pageCount,
          alignment: "right",
          fontSize: 9,
          margin: [0, 10, 20, 0],
        },
      ];
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [25, 50, 20, 40],
        header: [reportTitle],
        content: [details],
        background: [
          {
              image: imagemVarivel,
              width: 1000,
              opacity: 0.1
          }],
        footer: Rodape,
        styles: {
          header: {
            fontSize: 15,
            bold: true,
          },
          subheader: {
            fontSize: 12,
            bold: true,
          }
          ,
          bodyDoc: {
            fontSize: 12,
          }
        }

    }

    pdfMake.createPdf(docDefinitions).download();

}

export default PDFContrato;
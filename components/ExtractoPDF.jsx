import pdfMake from "pdfmake/build/pdfmake";
import getBase64ImageFromURL from "./imageConverter";
import pdfFonts from "pdfmake/build/vfs_fonts";

async function ExtractoPDF({
    extractoLista
}) {
  const mesesList = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    " de " +
    mesesList[(currentdate.getMonth() + 1)] +
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
        text: 'EXTRACTO',
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
        style: 'tableExample',
        table: {
            headerRows: 1,
            body: [
                [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
                ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
        },
        layout: 'lightHorizontalLines'
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

export default ExtractoPDF;
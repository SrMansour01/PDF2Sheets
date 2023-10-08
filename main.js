const fs = require('fs');
const { google } = require('googleapis');
const pdf = require('pdf-parse');

// Configurar as credenciais do Google Sheets
const credentials = require('./credentials.json');
const sheets = google.sheets('v4');
const sheetsAuth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Solicitar ao usuário o nome do arquivo PDF
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Digite o nome do arquivo PDF: ', async (pdfFileName) => {
  readline.question('Digite o ID da planilha: ', async (spreadsheetId) => {
    readline.question('Digite o nome da guia no Google Sheets: ', async (worksheetName) => {
      readline.close();

      // Extrair texto do PDF
      const dataBuffer = fs.readFileSync(pdfFileName); // Lê o conteúdo do arquivo PDF
      const data = await pdf(dataBuffer); // Processa o PDF e extrai o texto
      const text = data.text; // Obtém o texto extraído do PDF

      // Dividir o texto em linhas (separadas por quebras de linha)
      const lines = text.split('\n'); // Divide o texto em linhas

      // Preparar os dados para envio ao Google Sheets
      const sheetsData = lines.map(line => {
        // Dividir a linha em colunas (separadas por espaço, vírgula, ou outro delimitador)
        return [line.split(',')];
      });

      // Autenticar com o Google Sheets
      sheetsAuth.authorize(async (err, tokens) => {
        if (err) {
          console.error('Erro ao autenticar com o Google Sheets:', err);
          return;
        }

        // Inicializar a API do Google Sheets
        const sheetsApi = google.sheets({ version: 'v4', auth: sheetsAuth });

        // Enviar dados para o Google Sheets
        sheetsApi.spreadsheets.values.append({
          spreadsheetId: spreadsheetId, // ID da planilha
          range: worksheetName, // Nome da guia
          valueInputOption: 'RAW', // Tipo de dados a ser inserido (bruto)
          insertDataOption: 'INSERT_ROWS', // Inserir como novas linhas
          resource: {
            values: sheetsData // Dados a serem inseridos
          }
        }, (err, response) => {
          if (err) {
            console.error('Erro ao enviar dados para o Google Sheets:', err);
            return;
          }
          console.log(`Dados extraídos do PDF foram enviados para a guia "${worksheetName}" na planilha com sucesso.`);
        });
      });
    });
  });
});

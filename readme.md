# PDF2Sheetes

O PDF2Sheetes é uma aplicação Node.js que extrai texto de um arquivo PDF e o envia para uma planilha do Google Sheets. Isso pode ser útil para automatizar a importação de dados de documentos PDF para planilhas no Google Sheets.

## Pré-requisitos

Antes de usar este projeto, certifique-se de ter o seguinte instalado e configurado:

- Node.js: Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

- Credenciais do Google Sheets: Você precisará configurar as credenciais de serviço do Google Sheets e salvar o arquivo `credentials.json` na raiz do projeto. Consulte a documentação do Google Sheets para obter instruções sobre como criar essas credenciais.

## Como Usar

1. Clone este repositório:
```
git clone https://github.com/SrMansour01/PDF2Sheetes.git
```

2. Navegue até o diretório do projeto:
```
cd PDF2Sheetes
```
3. Instale as dependências:
```
npm install
```
4. Execute o projeto:
```
node index.js
```

5. Siga as instruções no terminal para inserir o nome do arquivo PDF, o ID da planilha e o nome da guia no Google Sheets.

O projeto extrairá o texto do arquivo PDF especificado e o enviará para a guia da planilha especificada no Google Sheets.

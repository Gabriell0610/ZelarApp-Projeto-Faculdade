# ZelarApp

**Disciplina:** Programação para Dispositivos Móveis em Android
**Professor:** Julio Cartier
**Instituição:** Estácio

## Aluno

**Gabriel Barbosa**
**Matrícula:** 202302400541
**Curso:** Sistemas de Informação — 7º Semestre

---

# Descrição do Problema Social

Muitos idosos precisam administrar diversos medicamentos diariamente, além de acompanhar consultas e exames médicos periódicos.

O ZelarApp foi criado para centralizar essas informações em um único aplicativo, facilitando o acompanhamento da rotina de saúde e reduzindo o risco de esquecimentos.

---

# Funcionalidades

## Autenticação

* Cadastro de usuário
* Login com e-mail e senha
* Autenticação via Firebase Authentication
* Rotas protegidas por token JWT

## Medicamentos

* Cadastrar medicamento
* Listar medicamentos
* Atualizar medicamento
* Remover medicamento
* Controle de horários de administração

## Consultas

* Cadastrar consulta médica
* Listar consultas
* Atualizar consultas
* Remover consultas

## Exames

* Cadastrar exame
* Listar exames
* Atualizar exames
* Remover exames

## Segurança

* Cada usuário acessa apenas os seus próprios dados
* Proteção das rotas através do Firebase Authentication
* Validação de propriedade dos registros

---

# Tecnologias Utilizadas

## Backend

* Node.js
* TypeScript
* Fastify
* Firebase Firestore
* Firebase Authentication
* Zod

## Frontend

* React Native
* Expo
* TypeScript
* Axios
* React Navigation
* AsyncStorage

---

# Pré-requisitos

Instale os seguintes softwares:

* Node.js 20 ou superior
* npm
* Expo Go (Android/iOS) ou Android Studio

---

# Configuração do Firebase

## 1. Criar uma conta

Acesse:

```txt
https://console.firebase.google.com
```

Faça login com uma conta Google ou utilize uma conta já existente.

---

## 2. Criar um projeto

Clique em:

```txt
Create Project
```

Escolha um nome para o projeto.

Exemplo:

```txt
ZelarApp
```

Não é necessário habilitar o Google Analytics.

---

## 3. Ativar o Authentication

No menu lateral esquerdo, clique em:

```txt
Segurança
Authentication
Vamos começar
```

Depois:

```txt
Método de login
Provedores nativos
Ative Email/Password
```

Observação:

```txt
Não é necessário ativar a opção de link por e-mail (login sem senha).
```

---

## 4. Criar o Firestore Database

No menu lateral esquerdo, em "Categorias de produtos", clique em:

```txt
Firestore Database
Criar banco de dados
```

Configure:

```txt
Edição Standard
Localização: southamerica-east1 (São Paulo)
Modo de teste
```

---

## 5. Obter a API Key

Na visão geral do projeto:

```txt
Adicionar App
Selecionar a opção Web
```

Defina um nome para o aplicativo:

```txt
ZelarApp
```

Copie o valor da propriedade:

```txt
apiKey
```

presente no objeto `firebaseConfig`.

Armazene esse valor no arquivo `.env` do frontend:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
```

---

## 6. Criar uma Service Account

No menu lateral esquerdo, clique em:

```txt
Configurações
Geral
Contas de serviço
```

Em **SDK Admin do Firebase**, clique em:

```txt
Gerar nova chave privada
```

Será baixado um arquivo JSON.

Renomeie o arquivo para:

```txt
firebase-service-account.json
```

Coloque-o dentro da pasta:

```txt
backend/
```

Exemplo:

```txt
backend/
├── firebase-service-account.json
├── package.json
└── src/
```

---

# Configuração do Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

---

## Executar o Backend

Modo de desenvolvimento:

```bash
npm run dev
```

Se tudo estiver configurado corretamente, deverá aparecer no console:

```txt
Servidor rodando
```

---

# Configuração do Frontend

Entre na pasta:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

---

## Configurar a URL do Backend

Obtenha o IPv4 da sua máquina.

### Windows

```bash
ipconfig
```

Procure pela informação:

```txt
IPv4 Address
```

Exemplo:

```txt
192.168.0.100
```

Crie o arquivo `.env` utilizando o `.env.example` como referência e adicione:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_BASE_URL=http://192.168.0.100:3333
```

Observação:

* Substitua `sua_api_key` pela chave copiada anteriormente.
* Substitua o IP pelo IPv4 da sua máquina.

### Importante

* O celular e o computador devem estar conectados à mesma rede Wi-Fi.
* Caso o Wi-Fi apresente problemas, é possível utilizar o 4G do celular compartilhando a internet com o computador.

---

## Executar o Frontend

```bash
npm run start OU
npx expo start --clear OU
npx expo start --lan
```

Abra o aplicativo utilizando:

* Expo Go
* Emulador Android
* Emulador iOS

---

# Observações

Este projeto utiliza Firebase Authentication para autenticação e Firestore para persistência de dados.

Todos os registros são vinculados ao usuário autenticado, impedindo o acesso a informações de outros usuários.

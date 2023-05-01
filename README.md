# Prova Java Spring IST - Aplicação web para realizar movimentações bancárias

Nesta aplicação foram desenvolvidas 03 funcionalidades gerais.Sendo a primeira para gerenciamento dos usuários, a segunda para gerenciamento das contas dos usuários e a terceira para realizar as movimentações das contas.

## Instalação:

- Clone este projeto com o comando ```git clone https://github.com/JoaoPedroLuz57/fin-app-java-ts```
- Execute o comando ```npm install``` dentro da pasta web no terminal
- Instale as dependências do Maven
- Crie um banco de dados com name finappdb, username joaopedroluz57 e password docker. Caso tenha docker pode ser criado um container com o comando ```docker run --name fin-app-db -e POSTGRES_USER=joaopedroluz57 -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=finappdb -p 5432:5432 -d postgres```

## Execução:

- Inicie a api na IDE desejada;
- Execute o comando ```npm run dev``` dentro da pasta web no terminal;

# Detalhamento as funcionalidades implementadas

## Models:

### User (Pessoa):

Foi implementada a entidade user (Pessoa) com as seguintes propriedades: Long id (chave primária e gerado automaticamente), String name (não podendo ser vazio), String email (não podendo ser vazio, necessita seguir padrão de um email e deve ser único), String address (não podendo ser vazio), String cpf (não podendo ser vazio e deve ser único) .

### Account (Conta):

Foi implementada a entidade account (Conta) com as seguintes propriedades: Long id (chave primária e gerado automaticamente), Integer registrationCode (número de registro da conta, não podendo ser nulo e que deve ser único), User user (usuário relacionado à conta, podendo ter várias contas com o mesmo usuário e não podendo ser nulo) e BigDecimal balance (saldo que é obtido ao fazer uma busca por conta, detalhe que ele não se torna uma coluna no banco).

### Transaction (Movimentação):

Foi implementada a entidade transaction (Movimentação) com as seguintes propriedades: Long id (chave primária e gerado automaticamente), Account account (conta relacionada à movimentação, podendo ter várias movimentações na mesma conta, não podendo ser nula), BigDecimal value (valor referente à movimentação, não podendo ser nulo) e LocalDateTime dateTime (data e hora da movimentação criada automaticamente pelo método PrePersist).

## DTOs: 

### User:

Foi implementado um DTO (Data Transfer Object) para troca de dados da entidade user (Pessoa) com as seguintes propriedades: Long id, String name, String, email, String address, String cpf. Esse DTO possui um construtor personalizado que instância um novo UserDTO com base em um User.

### Account:

Foi implementado um DTO (Data Transfer Object) para troca de dados da entidade account (Conta) com as seguintes propriedades: Long id, Integer registrationCode, UserDTP user e BigDecimal balance. Esse DTO possui um construtor personalizado que recebe todas as propriedades mencionadas, mas com um User em vez de UserDTO e a partir do User gerar o UserDTO.

### Transaction

Foi implementado um DTO (Data Transfer Object) para troca de dados da entidade transaction (Movimentação) com as seguintes propriedades: Long id LocalDateTime dateTime e BigDecimal value.

### NewUser:

Foi implementado um DTO (Data Transfer Object) para recebimentos de dados para criação de um novo user (Pessoa) com as seguintes propriedades: String name, String email, String address e String cpf. Nenhuma das suas propriedades podem ser vazias.

### NewAccount:

Foi implementado um DTO (Data Transfer Object) para recebimentos de dados para criação de um nova account (Conta) com as seguintes propriedades: Long userId e Integer registrationCode. Nenhuma das suas propriedades podem ser nulas.

### New Transaction:

Foi implementado um DTO (Data Transfer Object) para recebimentos de dados para criação de um nova transaction (Movimentação) com as seguintes propriedades: Long accountId, BigDecimal value e TransactionType (Enum com os seguintes valores: DEBIT e CREDIT) type. Nenhuma das suas propriedades podem ser nulas.

## Converters:

### User: 

Foi implementado um componente para auxiliar na tradução de objetos DTO para Entidade e de Entidade para DTO relacionadas ao user. Há dois métodos, um responsável por receber um NewUserDTO e retornar um User e outro responsável por receber um User e retornar um UserDTO.

### Account: 

Foi implementado um componente para auxiliar na tradução de objetos DTO para Entidade e de Entidade para DTO relacionadas à account. Há dois métodos, um responsável por receber um NewAccountDTO e retornar um Account e outro responsável por receber um Account e retornar um AccountDTO.

### Transaction: 

Foi implementado um componente para auxiliar na tradução de objetos DTO para Entidade e de Entidade para DTO relacionadas à transaction. Há dois métodos, um responsável por receber um NewTransactionDTO e retornar um Transaction e outro responsável por receber um Transaction e retornar um TransactionDTO.

## Repositories:

### User:

Foi implementado um repository relacionado ao user que estende o JpaRepository e possui apenas um método que retorna o usuário com base no email.

### Account:

Foi implementado um repository relacionado à account que estende o JpaRepository e possui apenas um método que retorna uma lista de AccountDTO com base no id do user.

### Transaction:

Foi implementado um repository relacionado à transaction que estende o JpaRepository e possui apenas um método que retorna uma lista de Transaction com base no id da account.

## Services:

### User:

Foi implementado um service relacionado ao user que possui métodos para buscar todos, buscar pelo  id, buscar pelo email, salvar e deletar pelo id.

### Account:

Foi implementado um service relacionado à account que possui métodos para buscar todos, buscar pelo id, buscar pelo id do user, salvar e deletar pelo id.

### Transaction:

Foi implementado um service relacionado à transaction que possui métodos para buscar pelo id da conta, e salvar.

## Controllers:

### Não implementado:

Rotas para edição. Motivo: ocorreu alguns erros no desenvolvimento e somando a motivos externos não consegui temp para desenvolvê-las.

### User:

Foi implementado um controller relacionado ao user que possui rotas para buscar todos, buscar pelo email, registrar e deletar.

### Account:

Foi implementado um controller relacionado à account que possui rotas para buscar todas, buscar pelo id do user, registrar e deletar.

### Transaction:

Foi implementado um controller relacionado à transaction que possui rotas para buscar pelo id da account e registrar.

## Exceptions:

### ErrorResponseDTO:

Foi implementado um DTO (Data Transfer Object) para troca de dados referente a errors com as seguintes propriedades: Integer status, String error, String message, String path, List FieldMessage(String fieldName, String message) errors. 

### ControllerExceptionHandler :

Foi implementado um rest controller advice para manipular as exceções emitidas pela API que envia um objeto do tipo ErrorResponseDTO quando não encontrar o dado que o cliente requisitou ou quando o cliente envia uma requisição inválida.

## Config:

### CorsConfiguration:

Foi implementada a configuração de CORS para permitir requisições web de todas origens com os métodos GET, POST, PUT e DELETE e com todos os headers

## Components:

Foram implementados componentes customizados para input, select, button, header, forms, formGroup e tables.

## Hooks:

Foi implementado um hook customizado para auxiliar a gerenciar os erros emitidos pelo usuário.

### Pages:

Foram implementadas três telas referentes ao User (Pessoa), Account (Conta) e Transaction (Movimentação).

## Assets:

Foram implementados styles com default theme e globalStyles, além de imagens relacionadas ao FIESC para a aplicação no geral.

## Bibliotecas externas utilizadas:

### React:

Biblioteca para auxiliar na criação de toda a aplicação web.

### React Router Dom:

Biblioteca para auxiliar na navegação entre as telas.

### Axios:

Biblioteca utilizada para auxiliar na realização das requests na API.

### Styled Components:

Biblioteca para auxiliar na estilização dos componentes e telas.

### Moment.js:

Biblioteca que facilita a utilização de datas.

### Mui Material:

Biblioteca utilizada para auxiliar na criação das tabelas.

### React Input Mask:

Biblioteca utilizada  para auxiliar na criação de inputs com máscara.

### Eslint

Lint para auxiliar no desenvolvimento da aplicação.

### Prettier

Formatador de código para auxiliar na padronização de todo o código.







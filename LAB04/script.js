/**
 * CLASSE FUNCIONARIO
 * Define a estrutura de dados e métodos para cada funcionário.
 */
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        // Atributos privados (usando _ prefixo como convenção)
        this._nome = nome;
        this._idade = parseInt(idade);
        this._cargo = cargo;
        this._salario = parseFloat(salario);
    }

    // =========================================================
    // Métodos de Acesso (GETTERS e SETTERS)
    // =========================================================

    get nome() { return this._nome; }
    set nome(novoNome) { this._nome = novoNome; }

    get idade() { return this._idade; }
    set idade(novaIdade) { this._idade = parseInt(novaIdade); }

    get cargo() { return this._cargo; }
    set cargo(novoCargo) { this._cargo = novoCargo; }

    get salario() { return this._salario; }
    set salario(novoSalario) { this._salario = parseFloat(novoSalario); }

    // =========================================================
    // Métodos de Negócio
    // =========================================================

    /**
     * Retorna os dados do funcionário formatados.
     */
    toString = () => {
        const idDisplay = this.id ? `[ID: ${this.id}]` : `[Novo]`;
        const salarioFormatado = this._salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `${idDisplay} ${this._nome}, ${this._idade} anos - Cargo: ${this._cargo}, Salário: ${salarioFormatado}`;
    };
}


// ----------------------------------------------------------------
// LÓGICA DO SISTEMA CRUD
// ----------------------------------------------------------------

let funcionarios = []; // Array que armazena instâncias de Funcionario
let proximoId = 1;

// Seleção de elementos do DOM
const form = document.getElementById('funcionario-form');
const tabelaBody = document.querySelector('#tabela-funcionarios tbody');
const funcionarioIdInput = document.getElementById('funcionario-id');
const submitButton = document.getElementById('submit-button');

// Função para renderizar a tabela (Listagem)
const renderizarTabela = () => {
    tabelaBody.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const linha = tabelaBody.insertRow();
        
        // Formatação do Salário
        const salarioFormatado = funcionario.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Células com dados
        linha.insertCell().textContent = funcionario.id;
        linha.insertCell().textContent = funcionario.nome;
        linha.insertCell().textContent = funcionario.idade;
        linha.insertCell().textContent = funcionario.cargo;
        linha.insertCell().textContent = salarioFormatado;

        // Célula de Ações (Botões)
        const acoesCell = linha.insertCell();
        
        // Botão Editar (A ser implementado totalmente no próximo exercício)
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => console.log(`Início da edição do ID ${funcionario.id}`));
        acoesCell.appendChild(btnEditar);

        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirFuncionario(funcionario.id));
        acoesCell.appendChild(btnExcluir);
    });
};

// Função para cadastrar funcionário
const cadastrarFuncionario = (funcionarioInstancia) => {
    funcionarioInstancia.id = proximoId++; 
    funcionarios.push(funcionarioInstancia);
    console.log('Funcionário cadastrado:', funcionarioInstancia.toString());
};

// Função para excluir funcionário (Parcialmente implementado)
const excluirFuncionario = (id) => {
    if (confirm(`Tem certeza que deseja excluir o funcionário de ID ${id}?`)) {
        funcionarios = funcionarios.filter(f => f.id !== id);
        renderizarTabela(); // Atualiza a tabela
        alert(`Funcionário de ID ${id} excluído.`); 
        console.log(`Funcionário de ID ${id} excluído.`);
    }
};


// ----------------------------------------------------------------
// ESCUTADOR DE EVENTOS (ADD EVENT LISTENER)
// ----------------------------------------------------------------

// Evento principal do formulário (Cadastro)
form.addEventListener('submit', (evento) => { 
    evento.preventDefault(); 

    // 1. Coletar os valores do formulário
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    // 2. Criar uma nova instância da classe Funcionario
    const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
    
    // 3. Cadastrar (por enquanto, apenas cadastro)
    cadastrarFuncionario(novoFuncionario);
    
    // 4. Atualizar o DOM
    renderizarTabela(); 
    form.reset(); 
});


// ----------------------------------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------------------------------
renderizarTabela();
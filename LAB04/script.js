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
const cancelarEdicaoButton = document.getElementById('cancelar-edicao'); // Adicionado


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
        
        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => preencherFormularioParaEdicao(funcionario.id));
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

// Função para excluir funcionário
const excluirFuncionario = (id) => {
    if (confirm(`Tem certeza que deseja excluir o funcionário de ID ${id}?`)) {
        // FILTER: Cria um novo array excluindo o item
        funcionarios = funcionarios.filter(f => f.id !== id);
        renderizarTabela(); // Atualiza a tabela
        alert(`Funcionário de ID ${id} excluído.`); 
        console.log(`Funcionário de ID ${id} excluído.`);
    }
};

/**
 * Preenche o formulário com dados do funcionário para edição.
 */
const preencherFormularioParaEdicao = (id) => {
    const funcionario = funcionarios.find(f => f.id === id);
    
    if (funcionario) {
        // Preencher o formulário com os dados usando os GETTERS (embora direto seja similar)
        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('idade').value = funcionario.idade;
        document.getElementById('cargo').value = funcionario.cargo;
        document.getElementById('salario').value = funcionario.salario;
        
        // Armazenar o ID no campo hidden para indicar modo edição
        funcionarioIdInput.value = funcionario.id; 

        // Mudar o texto do botão e exibir o botão de cancelamento
        submitButton.textContent = 'Salvar Alterações';
        cancelarEdicaoButton.style.display = 'inline-block';
        
        console.log(`Modo Edição ativado para o ID ${funcionario.id}`);
        window.scrollTo(0, 0); 
    }
};

/**
 * Atualiza os dados de um funcionário existente.
 */
const atualizarFuncionario = (id, novosDadosInstancia) => {
    const index = funcionarios.findIndex(f => f.id === id);

    if (index !== -1) {
        const funcionarioAntigo = funcionarios[index];
        
        // **USANDO OS SETTERS DA CLASSE PARA ATUALIZAR**
        funcionarioAntigo.nome = novosDadosInstancia.nome;
        funcionarioAntigo.idade = novosDadosInstancia.idade;
        funcionarioAntigo.cargo = novosDadosInstancia.cargo;
        funcionarioAntigo.salario = novosDadosInstancia.salario;
        
        console.log(`Funcionário de ID ${id} atualizado.`, funcionarioAntigo.toString());
    }
};

/**
 * Reseta o formulário para o modo de cadastro.
 */
const reiniciarModoCadastro = () => {
    funcionarioIdInput.value = ''; 
    submitButton.textContent = 'Cadastrar Funcionário';
    cancelarEdicaoButton.style.display = 'none';
    form.reset();
};


// ----------------------------------------------------------------
// ESCUTADOR DE EVENTOS (ADD EVENT LISTENER)
// ----------------------------------------------------------------

// Evento principal do formulário (Cadastro/Edição)
form.addEventListener('submit', (evento) => { 
    evento.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;
    const idEdicao = funcionarioIdInput.value; 

    // Nova instância usada para encapsular os dados do formulário
    const dadosFormulario = new Funcionario(nome, idade, cargo, salario);

    if (idEdicao) {
        // MODO EDIÇÃO
        atualizarFuncionario(parseInt(idEdicao), dadosFormulario);
        alert(`Funcionário ID ${idEdicao} atualizado com sucesso!`);
    } else {
        // MODO CADASTRO
        cadastrarFuncionario(dadosFormulario);
        alert(`Funcionário ${nome} cadastrado com sucesso!`);
    }
    
    renderizarTabela(); 
    reiniciarModoCadastro(); 
});

// Evento para o botão Cancelar Edição
cancelarEdicaoButton.addEventListener('click', reiniciarModoCadastro);


// ----------------------------------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------------------------------
renderizarTabela();
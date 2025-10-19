/**
 * CLASSE FUNCIONARIO (MANTIDA)
 */
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;
        this._idade = parseInt(idade);
        this._cargo = cargo;
        this._salario = parseFloat(salario);
    }

    // Getters e Setters (MANTIDOS)
    get nome() { return this._nome; }
    set nome(novoNome) { this._nome = novoNome; }
    get idade() { return this._idade; }
    set idade(novaIdade) { this._idade = parseInt(novaIdade); }
    get cargo() { return this._cargo; }
    set cargo(novoCargo) { this._cargo = novoCargo; }
    get salario() { return this._salario; }
    set salario(novoSalario) { this._salario = parseFloat(novoSalario); }

    // Método toString usando Arrow Function (MANTIDO)
    toString = () => {
        const idDisplay = this.id ? `[ID: ${this.id}]` : `[Novo]`;
        const salarioFormatado = this._salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `${idDisplay} ${this._nome}, ${this._idade} anos - Cargo: ${this._cargo}, Salário: ${salarioFormatado}`;
    };
}


// ----------------------------------------------------------------
// LÓGICA DO SISTEMA CRUD (FUNÇÕES REESCRITAS COMO ARROW FUNCTIONS)
// ----------------------------------------------------------------

let funcionarios = [];
let proximoId = 1;

// Seleção de elementos do DOM (MANTIDA)
const form = document.getElementById('funcionario-form');
const tabelaBody = document.querySelector('#tabela-funcionarios tbody');
const funcionarioIdInput = document.getElementById('funcionario-id');
const submitButton = document.getElementById('submit-button');
const cancelarEdicaoButton = document.getElementById('cancelar-edicao');


/**
 * Função para renderizar a tabela (Listagem).
 */
const renderizarTabela = () => { // Função reescrita como Arrow Function
    tabelaBody.innerHTML = '';

    funcionarios.forEach(funcionario => { // forEach usando Arrow Function
        const linha = tabelaBody.insertRow();
        
        const salarioFormatado = funcionario.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        linha.insertCell().textContent = funcionario.id;
        linha.insertCell().textContent = funcionario.nome;
        linha.insertCell().textContent = funcionario.idade;
        linha.insertCell().textContent = funcionario.cargo;
        linha.insertCell().textContent = salarioFormatado;

        // Célula de Ações (Botões)
        const acoesCell = linha.insertCell();
        
        // Botão Editar - addEventListener usando Função Anônima (Arrow Function)
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => { // Funções anônimas
             preencherFormularioParaEdicao(funcionario.id)
        });
        acoesCell.appendChild(btnEditar);

        // Botão Excluir - addEventListener usando Função Anônima (Arrow Function)
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => { // Funções anônimas
            excluirFuncionario(funcionario.id)
        });
        acoesCell.appendChild(btnExcluir);
    });
};

/**
 * Função para cadastrar funcionário.
 */
const cadastrarFuncionario = (funcionarioInstancia) => { // Reescrevendo como Arrow Function
    funcionarioInstancia.id = proximoId++; 
    funcionarios.push(funcionarioInstancia);
    console.log('Funcionário cadastrado:', funcionarioInstancia.toString());
};

/**
 * Função para excluir funcionário.
 */
const excluirFuncionario = (id) => { // Reescrevendo como Arrow Function
    if (confirm(`Tem certeza que deseja excluir o funcionário de ID ${id}?`)) {
        // FILTER: Usando Função Lambda (Arrow Function) para manipulação de array
        funcionarios = funcionarios.filter(f => f.id !== id);
        
        renderizarTabela(); 
        alert(`Funcionário de ID ${id} excluído.`); 
        console.log(`Funcionário de ID ${id} excluído.`);
    }
};

/**
 * Preenche o formulário para edição.
 */
const preencherFormularioParaEdicao = (id) => { // Reescrevendo como Arrow Function
    // FIND: Usando Função Lambda (Arrow Function) para manipulação de array
    const funcionario = funcionarios.find(f => f.id === id); 
    
    if (funcionario) {
        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('idade').value = funcionario.idade;
        document.getElementById('cargo').value = funcionario.cargo;
        document.getElementById('salario').value = funcionario.salario;
        
        funcionarioIdInput.value = funcionario.id; 

        submitButton.textContent = 'Salvar Alterações';
        cancelarEdicaoButton.style.display = 'inline-block';
        
        console.log(`Modo Edição ativado para o ID ${funcionario.id}`);
        window.scrollTo(0, 0); 
    }
};

/**
 * Atualiza os dados de um funcionário existente.
 */
const atualizarFuncionario = (id, novosDadosInstancia) => { // Reescrevendo como Arrow Function
    // FINDINDEX: Usando Função Lambda (Arrow Function) para manipulação de array
    const index = funcionarios.findIndex(f => f.id === id); 

    if (index !== -1) {
        const funcionarioAntigo = funcionarios[index];
        
        // Uso de Setters (MANTIDO)
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
const reiniciarModoCadastro = () => { // Reescrevendo como Arrow Function
    funcionarioIdInput.value = ''; 
    submitButton.textContent = 'Cadastrar Funcionário';
    cancelarEdicaoButton.style.display = 'none';
    form.reset();
};


// ----------------------------------------------------------------
// ESCUTADORES DE EVENTOS (ADD EVENT LISTENER)
// ----------------------------------------------------------------

// Evento principal do formulário (Cadastro/Edição)
// addEventListener usando Função Anônima (Arrow Function)
form.addEventListener('submit', (evento) => { 
    evento.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;
    const idEdicao = funcionarioIdInput.value; 

    const dadosFormulario = new Funcionario(nome, idade, cargo, salario);

    if (idEdicao) {
        atualizarFuncionario(parseInt(idEdicao), dadosFormulario);
        alert(`Funcionário ID ${idEdicao} atualizado com sucesso!`);
    } else {
        cadastrarFuncionario(dadosFormulario);
        alert(`Funcionário ${nome} cadastrado com sucesso!`);
    }
    
    renderizarTabela(); 
    reiniciarModoCadastro(); 
});

// Evento para o botão Cancelar Edição
// addEventListener usando Função Anônima (Arrow Function)
cancelarEdicaoButton.addEventListener('click', () => { 
    reiniciarModoCadastro();
    console.log("Edição cancelada.");
});


// ----------------------------------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------------------------------
renderizarTabela();
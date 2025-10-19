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

    toString = () => {
        const idDisplay = this.id ? `[ID: ${this.id}]` : `[Novo]`;
        const salarioFormatado = this._salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return `${idDisplay} ${this._nome}, ${this._idade} anos - Cargo: ${this._cargo}, Salário: ${salarioFormatado}`;
    };
}


// ----------------------------------------------------------------
// VARIÁVEIS GLOBAIS E SELEÇÃO DE DOM
// ----------------------------------------------------------------

let funcionarios = [];
let proximoId = 1;
let funcionariosExibidos = funcionarios; // Variável para controlar o filtro da tabela

// Seleção de elementos do CRUD
const form = document.getElementById('funcionario-form');
const tabelaBody = document.querySelector('#tabela-funcionarios tbody');
const funcionarioIdInput = document.getElementById('funcionario-id');
const submitButton = document.getElementById('submit-button');
const cancelarEdicaoButton = document.getElementById('cancelar-edicao');

// **NOVOS** ELEMENTOS DE RELATÓRIO
const mediaSalarialSpan = document.getElementById('media-salarial');
const cargosUnicosP = document.getElementById('cargos-unicos');
const nomesMaiusculoP = document.getElementById('nomes-maiusculo');
const btnSalarioAlto = document.getElementById('btn-salario-alto');
const btnResetFiltro = document.getElementById('btn-reset-filtro');


// ----------------------------------------------------------------
// FUNÇÕES DE RELATÓRIO E ANÁLISE (Exercício 4)
// ----------------------------------------------------------------

/**
 * 1. Média Salarial (REDUCE)
 */
const calcularMediaSalarial = () => {
    if (funcionarios.length === 0) return 0;
    
    // REDUCE: Soma todos os salários
    const somaSalarios = funcionarios.reduce((acc, f) => acc + f.salario, 0);
    
    const media = somaSalarios / funcionarios.length;
    return media.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

/**
 * 2. Listar Cargos Únicos (MAP e SET)
 */
const listarCargosUnicos = () => {
    // MAP: Extrai apenas os cargos
    const cargos = funcionarios.map(f => f.cargo);
    
    // SET: Remove duplicatas
    const cargosUnicos = new Set(cargos);
    
    return Array.from(cargosUnicos).join(', ');
};

/**
 * 3. Lista de Nomes em Maiúsculo (MAP)
 */
const listarNomesEmMaiusculo = () => {
    // MAP: Transforma cada nome em maiúsculo
    const nomesMaiusculos = funcionarios.map(f => f.nome.toUpperCase());
    
    return nomesMaiusculos.join(', ');
};


/**
 * Função principal que recalcula e exibe todos os relatórios.
 */
const gerarRelatorios = () => {
    // Atualiza estatísticas (REDUCE)
    mediaSalarialSpan.textContent = calcularMediaSalarial();
    
    // Atualiza listagens (MAP, SET)
    cargosUnicosP.textContent = listarCargosUnicos();
    nomesMaiusculoP.textContent = listarNomesEmMaiusculo();
};


// ----------------------------------------------------------------
// FUNÇÕES CRUD BÁSICAS (Ajuste para chamar Relatórios)
// ----------------------------------------------------------------

/**
 * Renderiza a tabela (agora recebe a lista a ser exibida).
 */
const renderizarTabela = (lista = funcionariosExibidos) => { 
    tabelaBody.innerHTML = '';
    
    // Atualiza a lista que está sendo exibida
    funcionariosExibidos = lista; 

    funcionariosExibidos.forEach(funcionario => {
        const linha = tabelaBody.insertRow();
        
        const salarioFormatado = funcionario.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        linha.insertCell().textContent = funcionario.id;
        linha.insertCell().textContent = funcionario.nome;
        linha.insertCell().textContent = funcionario.idade;
        linha.insertCell().textContent = funcionario.cargo;
        linha.insertCell().textContent = salarioFormatado;

        const acoesCell = linha.insertCell();
        
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => preencherFormularioParaEdicao(funcionario.id));
        acoesCell.appendChild(btnEditar);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => excluirFuncionario(funcionario.id));
        acoesCell.appendChild(btnExcluir);
    });
};

const cadastrarFuncionario = (funcionarioInstancia) => { 
    funcionarioInstancia.id = proximoId++; 
    funcionarios.push(funcionarioInstancia);
    console.log('Funcionário cadastrado:', funcionarioInstancia.toString());
};

const atualizarFuncionario = (id, novosDadosInstancia) => { 
    const index = funcionarios.findIndex(f => f.id === id); 

    if (index !== -1) {
        const funcionarioAntigo = funcionarios[index];
        funcionarioAntigo.nome = novosDadosInstancia.nome;
        funcionarioAntigo.idade = novosDadosInstancia.idade;
        funcionarioAntigo.cargo = novosDadosInstancia.cargo;
        funcionarioAntigo.salario = novosDadosInstancia.salario;
        console.log(`Funcionário de ID ${id} atualizado.`, funcionarioAntigo.toString());
    }
};

const excluirFuncionario = (id) => { 
    if (confirm(`Tem certeza que deseja excluir o funcionário de ID ${id}?`)) {
        funcionarios = funcionarios.filter(f => f.id !== id);
        
        // **IMPORTANTE**: Recalcula relatórios após exclusão
        gerarRelatorios();
        
        // Volta a renderizar a lista completa após o filtro
        renderizarTabela(funcionarios); 
        alert(`Funcionário de ID ${id} excluído.`); 
    }
};

const preencherFormularioParaEdicao = (id) => { 
    const funcionario = funcionarios.find(f => f.id === id); 
    if (funcionario) {
        document.getElementById('nome').value = funcionario.nome;
        document.getElementById('idade').value = funcionario.idade;
        document.getElementById('cargo').value = funcionario.cargo;
        document.getElementById('salario').value = funcionario.salario;
        funcionarioIdInput.value = funcionario.id; 

        submitButton.textContent = 'Salvar Alterações';
        cancelarEdicaoButton.style.display = 'inline-block';
        window.scrollTo(0, 0); 
    }
};

const reiniciarModoCadastro = () => { 
    funcionarioIdInput.value = ''; 
    submitButton.textContent = 'Cadastrar Funcionário';
    cancelarEdicaoButton.style.display = 'none';
    form.reset();
};


// ----------------------------------------------------------------
// ESCUTADORES DE EVENTOS
// ----------------------------------------------------------------

// Evento principal do formulário (Cadastro/Edição)
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
    
    // **IMPORTANTE**: Recalcula relatórios após CRUD
    gerarRelatorios();
    renderizarTabela(funcionarios); // Volta a mostrar a lista completa
    reiniciarModoCadastro(); 
});

// Evento para o botão Cancelar Edição
cancelarEdicaoButton.addEventListener('click', reiniciarModoCadastro);


// **NOVO** - Evento de Filtro Salário Alto (FILTER)
btnSalarioAlto.addEventListener('click', () => {
    // FILTER: Usado para criar uma lista apenas com salários > 5000
    const salarioAlto = funcionarios.filter(f => f.salario > 5000);
    
    renderizarTabela(salarioAlto);
    console.log(`Filtro aplicado: ${salarioAlto.length} funcionários com salário > R$ 5000.`);
});

// **NOVO** - Evento de Resetar Filtro
btnResetFiltro.addEventListener('click', () => {
    renderizarTabela(funcionarios);
    console.log("Filtro resetado: mostrando todos os funcionários.");
});


// ----------------------------------------------------------------
// INICIALIZAÇÃO
// ----------------------------------------------------------------
renderizarTabela();
gerarRelatorios(); // Geração inicial dos relatórios
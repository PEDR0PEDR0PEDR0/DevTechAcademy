/**
 * CLASSE ALUNO
 * Representa um registro de aluno com seus dados e métodos de negócio.
 */
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = parseInt(idade); // Garante que é um número
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal); // Garante que é um número decimal
    }

    /**
     * Método: Verifica a aprovação (notaFinal >= 7.0)
     * @returns {boolean}
     */
    isAprovado() {
        return this.notaFinal >= 7.0;
    }

    /**
     * Método: Retorna os dados do aluno formatados
     * @returns {string}
     */
    toString() {
        const status = this.isAprovado() ? "Aprovado" : "Reprovado";
        // O ID só existe se for definido pelo sistema CRUD
        const idDisplay = this.id ? `[ID: ${this.id}]` : `[Novo Aluno]`;
        return `${idDisplay} ${this.nome} (${this.idade} anos) - Curso: ${this.curso}, Nota: ${this.notaFinal} (${status})`;
    }
}

// ----------------------------------------------------------------
// LÓGICA DO SISTEMA CRUD
// ----------------------------------------------------------------

// Array para armazenar os alunos (instâncias da classe Aluno)
let alunos = [];
let proximoId = 1;

// Seleção de elementos do DOM
const form = document.getElementById('aluno-form');
const tabelaBody = document.querySelector('#tabela-alunos tbody');
const alunoIdInput = document.getElementById('aluno-id');
const submitButton = document.getElementById('submit-button');
const cancelarEdicaoButton = document.getElementById('cancelar-edicao');

// Função para renderizar a tabela
function renderizarTabela() {
    tabelaBody.innerHTML = '';

    alunos.forEach(aluno => {
        const linha = tabelaBody.insertRow();
        
        // Células com dados
        linha.insertCell().textContent = aluno.id;
        linha.insertCell().textContent = aluno.nome;
        linha.insertCell().textContent = aluno.idade;
        linha.insertCell().textContent = aluno.curso;
        
        // Célula da Nota Final (usando o método isAprovado para estilizar)
        const notaCell = linha.insertCell();
        notaCell.textContent = aluno.notaFinal;
        notaCell.classList.add(aluno.isAprovado() ? 'aprovado' : 'reprovado');

        // Célula de Ações (Botões)
        const acoesCell = linha.insertCell();
        
        // Botão Editar
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => preencherFormularioParaEdicao(aluno.id);
        acoesCell.appendChild(btnEditar);

        // Botão Excluir
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = () => excluirAluno(aluno.id);
        acoesCell.appendChild(btnExcluir);
    });

    console.log("-----------------------------------------");
    console.log("Status atual do Array de Alunos (usando toString()):");
    alunos.forEach(aluno => console.log(aluno.toString()));
}

// ------------------------------------
// Evento principal: Cadastro/Atualização
// ------------------------------------
form.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    // 1. Coletar os valores do formulário
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;
    const idEdicao = alunoIdInput.value;

    // 2. Criar uma nova instância da classe Aluno
    const novoAlunoInstancia = new Aluno(nome, idade, curso, notaFinal);

    if (idEdicao) {
        // Modo Edição
        atualizarAluno(parseInt(idEdicao), novoAlunoInstancia);
    } else {
        // Modo Cadastro
        cadastrarAluno(novoAlunoInstancia);
    }
    
    form.reset(); 
    renderizarTabela(); 
    reiniciarModoCadastro(); 
});

// 1. Cadastrar Aluno
function cadastrarAluno(alunoInstancia) {
    // Adicionamos o ID na instância antes de inserir no array
    alunoInstancia.id = proximoId++; 
    alunos.push(alunoInstancia);
    console.log('Aluno cadastrado:', alunoInstancia.toString());
}

// 2. Excluir Aluno
function excluirAluno(id) {
    if (confirm(`Tem certeza que deseja excluir o aluno de ID ${id}?`)) {
        alunos = alunos.filter(aluno => aluno.id !== id);
        renderizarTabela();
        console.log(`Aluno de ID ${id} excluído.`);
    }
}

// 3. Preencher Formulário para Edição
function preencherFormularioParaEdicao(id) {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('notaFinal').value = aluno.notaFinal;
        alunoIdInput.value = aluno.id; // Armazena o ID no campo hidden

        submitButton.textContent = 'Salvar Edição';
        cancelarEdicaoButton.style.display = 'inline-block';
        
        window.scrollTo(0, 0);
    }
}

// 4. Atualizar Aluno (chamado pelo evento 'submit' em modo edição)
function atualizarAluno(id, novosDadosInstancia) {
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index !== -1) {
        // Mantemos o ID e substituímos a instância antiga pela nova
        novosDadosInstancia.id = id; 
        alunos[index] = novosDadosInstancia;
        console.log(`Aluno de ID ${id} atualizado.`, novosDadosInstancia.toString());
    }
}

// 5. Reiniciar o formulário para o modo de cadastro
function reiniciarModoCadastro() {
    alunoIdInput.value = ''; // Limpa o ID
    submitButton.textContent = 'Cadastrar';
    cancelarEdicaoButton.style.display = 'none';
    form.reset();
}

// Evento para o botão "Cancelar Edição"
cancelarEdicaoButton.addEventListener('click', () => {
    reiniciarModoCadastro();
});

// Inicialização: Renderizar a tabela na primeira carga da página
renderizarTabela();
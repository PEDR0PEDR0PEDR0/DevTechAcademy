// Array para armazenar os alunos (simulação de banco de dados em memória)
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
    // Limpa o corpo da tabela
    tabelaBody.innerHTML = '';

    // Itera sobre o array de alunos e cria as linhas da tabela
    alunos.forEach(aluno => {
        const linha = tabelaBody.insertRow();
        
        // Células com dados
        linha.insertCell().textContent = aluno.id;
        linha.insertCell().textContent = aluno.nome;
        linha.insertCell().textContent = aluno.idade;
        linha.insertCell().textContent = aluno.curso;
        linha.insertCell().textContent = aluno.notaFinal;

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
}

// ------------------------------------
// Ações de CRUD
// ------------------------------------

// Lógica de Cadastro/Atualização
form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita o recarregamento da página

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const curso = document.getElementById('curso').value;
    const notaFinal = parseFloat(document.getElementById('notaFinal').value);
    const idEdicao = alunoIdInput.value;

    const novoAluno = { nome, idade, curso, notaFinal };

    if (idEdicao) {
        // Modo Edição
        atualizarAluno(parseInt(idEdicao), novoAluno);
    } else {
        // Modo Cadastro
        cadastrarAluno(novoAluno);
    }
    
    form.reset(); // Limpa o formulário
    renderizarTabela(); // Atualiza a tabela
    reiniciarModoCadastro(); // Volta ao modo de cadastro
});

// 1. Cadastrar Aluno
function cadastrarAluno(dadosAluno) {
    const aluno = {
        id: proximoId++,
        ...dadosAluno
    };
    alunos.push(aluno);
    console.log('Array de alunos após cadastro:', alunos);
    console.log('Aluno cadastrado:', aluno);
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
        
        // Leva o usuário de volta ao formulário
        window.scrollTo(0, 0);
    }
}

// 4. Atualizar Aluno (chamado pelo evento 'submit' em modo edição)
function atualizarAluno(id, novosDados) {
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index !== -1) {
        alunos[index] = { id, ...novosDados };
        console.log(`Aluno de ID ${id} atualizado.`, alunos[index]);
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
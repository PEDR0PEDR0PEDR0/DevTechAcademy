class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = parseInt(idade);
        this.curso = curso;
        this.notaFinal = parseFloat(notaFinal);
    }

    isAprovado = () => this.notaFinal >= 7.0; // Usando Arrow Function (como método)

    toString = () => { // Usando Arrow Function (como método)
        const status = this.isAprovado() ? "Aprovado" : "Reprovado";
        const idDisplay = this.id ? `[ID: ${this.id}]` : `[Novo Aluno]`;
        return `${idDisplay} ${this.nome} (${this.idade} anos) - Curso: ${this.curso}, Nota: ${this.notaFinal} (${status})`;
    };
}


let alunos = [];
let proximoId = 1;

// Seleção de elementos do DOM
const form = document.getElementById('aluno-form');
const tabelaBody = document.querySelector('#tabela-alunos tbody');
const alunoIdInput = document.getElementById('aluno-id');
const submitButton = document.getElementById('submit-button');
const cancelarEdicaoButton = document.getElementById('cancelar-edicao');

// Função para renderizar a tabela
// O array.forEach já usa uma Arrow Function como callback
const renderizarTabela = () => { 
    tabelaBody.innerHTML = '';

    alunos.forEach(aluno => { // Arrow Function
        const linha = tabelaBody.insertRow();
        
        linha.insertCell().textContent = aluno.id;
        linha.insertCell().textContent = aluno.nome;
        linha.insertCell().textContent = aluno.idade;
        linha.insertCell().textContent = aluno.curso;
        
        const notaCell = linha.insertCell();
        notaCell.textContent = aluno.notaFinal;
        notaCell.classList.add(aluno.isAprovado() ? 'aprovado' : 'reprovado');

        // Célula de Ações (Botões)
        const acoesCell = linha.insertCell();
        
        // Botão Editar - Usando addEventListener com Função Anônima/Arrow Function
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => { // Função Anônima (Arrow Function)
            preencherFormularioParaEdicao(aluno.id);
        });
        acoesCell.appendChild(btnEditar);

        // Botão Excluir - Usando addEventListener com Função Anônima/Arrow Function
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => { // Função Anônima (Arrow Function)
            excluirAluno(aluno.id);
        });
        acoesCell.appendChild(btnExcluir);
    });

    console.log("-----------------------------------------");
    console.log("Status atual do Array de Alunos:");
    alunos.forEach(aluno => console.log(aluno.toString())); // Arrow Function
};


form.addEventListener('submit', (evento) => { // Arrow Function como listener
    evento.preventDefault(); 

    // 1. Coletar os valores do formulário
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;
    const idEdicao = alunoIdInput.value;

    const novoAlunoInstancia = new Aluno(nome, idade, curso, notaFinal);

    if (idEdicao) {
        // Modo Edição
        atualizarAluno(parseInt(idEdicao), novoAlunoInstancia);
        alert(`Aluno ${nome} (ID: ${idEdicao}) editado com sucesso!`); // Exibir mensagem
    } else {
        // Modo Cadastro
        cadastrarAluno(novoAlunoInstancia);
        alert(`Aluno ${nome} cadastrado com sucesso!`); // Exibir mensagem
    }
    
    form.reset(); 
    renderizarTabela(); 
    reiniciarModoCadastro(); 
});

// 1. Cadastrar Aluno (Função Declarada)
const cadastrarAluno = (alunoInstancia) => { // Usando Arrow Function
    alunoInstancia.id = proximoId++; 
    alunos.push(alunoInstancia);
    console.log('Aluno cadastrado:', alunoInstancia.toString());
};

// 2. Excluir Aluno (Função Declarada)
const excluirAluno = (id) => { // Usando Arrow Function
    if (confirm(`Tem certeza que deseja excluir o aluno de ID ${id}?`)) {
        // A função de filtro já é uma Arrow Function
        alunos = alunos.filter(aluno => aluno.id !== id); 
        renderizarTabela();
        alert(`Aluno de ID ${id} excluído.`); // Exibir mensagem
        console.log(`Aluno de ID ${id} excluído.`);
    }
};

// 3. Preencher Formulário para Edição (Função Declarada)
const preencherFormularioParaEdicao = (id) => { // Usando Arrow Function
    // A função de busca find já é uma Arrow Function
    const aluno = alunos.find(a => a.id === id); 
    if (aluno) {
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('notaFinal').value = aluno.notaFinal;
        alunoIdInput.value = aluno.id; 

        submitButton.textContent = 'Salvar Edição';
        cancelarEdicaoButton.style.display = 'inline-block';
        
        window.scrollTo(0, 0);
    }
};

// 4. Atualizar Aluno (Função Declarada)
const atualizarAluno = (id, novosDadosInstancia) => { // Usando Arrow Function
    // A função de busca findIndex já é uma Arrow Function
    const index = alunos.findIndex(aluno => aluno.id === id); 
    if (index !== -1) {
        novosDadosInstancia.id = id; 
        alunos[index] = novosDadosInstancia;
        console.log(`Aluno de ID ${id} atualizado.`, novosDadosInstancia.toString());
    }
};

// 5. Reiniciar o formulário para o modo de cadastro (Função Declarada)
const reiniciarModoCadastro = () => { // Usando Arrow Function
    alunoIdInput.value = ''; 
    submitButton.textContent = 'Cadastrar';
    cancelarEdicaoButton.style.display = 'none';
    form.reset();
};

// Evento para o botão "Cancelar Edição"
// Usando addEventListener com Função Anônima (Arrow Function)
cancelarEdicaoButton.addEventListener('click', () => { 
    reiniciarModoCadastro();
    console.log("Edição cancelada.");
});

// Inicialização
renderizarTabela();
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
     * Usando Arrow Function como método.
     */
    isAprovado = () => this.notaFinal >= 7.0;

    /**
     * Método: Retorna os dados do aluno formatados
     * Usando Arrow Function como método.
     */
    toString = () => {
        const status = this.isAprovado() ? "Aprovado" : "Reprovado";
        const idDisplay = this.id ? `[ID: ${this.id}]` : `[Novo Aluno]`;
        return `${idDisplay} ${this.nome} (${this.idade} anos) - Curso: ${this.curso}, Nota: ${this.notaFinal} (${status})`;
    };
}

// ----------------------------------------------------------------
// CONFIGURAÇÃO DO SISTEMA E VARIÁVEIS GLOBAIS
// ----------------------------------------------------------------

// Array principal de alunos (instâncias da classe Aluno)
let alunos = [];
let proximoId = 1;
// Variável para rastrear a lista atualmente exibida na tabela (para filtros)
let alunosExibidos = alunos; 

// Seleção de elementos do DOM (CRUD)
const form = document.getElementById('aluno-form');
const tabelaBody = document.querySelector('#tabela-alunos tbody');
const alunoIdInput = document.getElementById('aluno-id');
const submitButton = document.getElementById('submit-button');
const cancelarEdicaoButton = document.getElementById('cancelar-edicao');

// Seleção dos elementos do DOM (Relatórios)
const totalAlunosSpan = document.getElementById('total-alunos');
const mediaNotasSpan = document.getElementById('media-notas');
const mediaIdadesSpan = document.getElementById('media-idades');
const alunosPorCursoUl = document.getElementById('alunos-por-curso');
const nomesOrdenadosP = document.getElementById('nomes-ordenados');
const btnAprovados = document.getElementById('btn-aprovados');
const btnTodos = document.getElementById('btn-todos');
const btnMedia = document.getElementById('btn-media');


// ----------------------------------------------------------------
// FUNÇÕES DE RELATÓRIO E ANÁLISE (Exercício 4)
// ----------------------------------------------------------------

/**
 * Calcula a média de uma propriedade numérica em um array de alunos.
 * Usa Array.prototype.reduce().
 */
const calcularMedia = (array, propriedade) => {
    if (array.length === 0) return 0;
    
    // REDUCE: Soma todos os valores da propriedade específica
    const soma = array.reduce((acc, aluno) => acc + aluno[propriedade], 0);
    
    return (soma / array.length).toFixed(2);
};

/**
 * Calcula e exibe a contagem de alunos por curso.
 * Usa Array.prototype.reduce().
 */
const mostrarAlunosPorCurso = (listaAlunos) => {
    // REDUCE: Cria um objeto que conta quantos alunos há por curso
    const contagem = listaAlunos.reduce((acc, aluno) => {
        acc[aluno.curso] = (acc[aluno.curso] || 0) + 1;
        return acc;
    }, {});
    
    // Renderiza a lista no HTML
    alunosPorCursoUl.innerHTML = `
        <li>JavaScript: ${contagem['JavaScript'] || 0}</li>
        <li>Python: ${contagem['Python'] || 0}</li>
        <li>Java: ${contagem['Java'] || 0}</li>
    `;
};

/**
 * Lista os nomes dos alunos em ordem alfabética.
 * Usa Array.prototype.map() e Array.prototype.sort().
 */
const listarNomesOrdenados = (listaAlunos) => {
    // MAP: Extrai apenas os nomes
    const nomes = listaAlunos.map(aluno => aluno.nome);
    
    // SORT: Ordena os nomes alfabeticamente
    nomes.sort((a, b) => a.localeCompare(b));
    
    // Exibe os nomes separados por vírgula
    nomesOrdenadosP.textContent = nomes.join(', ');
};

/**
 * Função principal que recalcula e exibe todas as estatísticas.
 */
const gerarRelatorios = () => {
    // 1. Cálculos de Média
    const mediaNotas = calcularMedia(alunos, 'notaFinal');
    const mediaIdades = calcularMedia(alunos, 'idade');
    
    // 2. Atualiza os Spans
    totalAlunosSpan.textContent = alunos.length;
    mediaNotasSpan.textContent = mediaNotas;
    mediaIdadesSpan.textContent = mediaIdades;
    
    // 3. Contagem por Curso
    mostrarAlunosPorCurso(alunos);
    
    // 4. Lista de Nomes Ordenados
    listarNomesOrdenados(alunos);
};


// ----------------------------------------------------------------
// FUNÇÕES CRUD BÁSICAS
// ----------------------------------------------------------------

/**
 * Renderiza a tabela com base na lista de alunos fornecida (para filtros).
 */
const renderizarTabela = (lista = alunosExibidos) => {
    tabelaBody.innerHTML = '';
    
    // Atualiza a lista de exibição
    alunosExibidos = lista; 

    alunosExibidos.forEach(aluno => { // Arrow Function
        const linha = tabelaBody.insertRow();
        
        linha.insertCell().textContent = aluno.id;
        linha.insertCell().textContent = aluno.nome;
        linha.insertCell().textContent = aluno.idade;
        linha.insertCell().textContent = aluno.curso;
        
        const notaCell = linha.insertCell();
        notaCell.textContent = aluno.notaFinal;
        notaCell.classList.add(aluno.isAprovado() ? 'aprovado' : 'reprovado');

        const acoesCell = linha.insertCell();
        
        // Botão Editar - Usando addEventListener com Arrow Function (Função Anônima)
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => { 
            preencherFormularioParaEdicao(aluno.id);
        });
        acoesCell.appendChild(btnEditar);

        // Botão Excluir - Usando addEventListener com Arrow Function (Função Anônima)
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => { 
            excluirAluno(aluno.id);
        });
        acoesCell.appendChild(btnExcluir);
    });

    console.log("-----------------------------------------");
    alunos.forEach(aluno => console.log(aluno.toString()));
};

/**
 * Cadastra um novo aluno.
 */
const cadastrarAluno = (alunoInstancia) => { // Arrow Function
    alunoInstancia.id = proximoId++; 
    alunos.push(alunoInstancia);
    console.log('Aluno cadastrado:', alunoInstancia.toString());
};

/**
 * Exclui um aluno por ID.
 */
const excluirAluno = (id) => { // Arrow Function
    if (confirm(`Tem certeza que deseja excluir o aluno de ID ${id}?`)) {
        // FILTER: Usando Arrow Function para criar o novo array
        alunos = alunos.filter(aluno => aluno.id !== id); 
        
        // Atualiza a tabela e os relatórios após exclusão
        gerarRelatorios();
        renderizarTabela(alunos); 
        
        alert(`Aluno de ID ${id} excluído.`); 
        console.log(`Aluno de ID ${id} excluído.`);
    }
};

/**
 * Preenche o formulário com dados do aluno para edição.
 */
const preencherFormularioParaEdicao = (id) => { // Arrow Function
    // FIND: Usando Arrow Function para localizar o aluno
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

/**
 * Atualiza os dados de um aluno existente.
 */
const atualizarAluno = (id, novosDadosInstancia) => { // Arrow Function
    // FINDINDEX: Usando Arrow Function para encontrar o índice
    const index = alunos.findIndex(aluno => aluno.id === id); 
    if (index !== -1) {
        novosDadosInstancia.id = id; 
        alunos[index] = novosDadosInstancia;
        console.log(`Aluno de ID ${id} atualizado.`, novosDadosInstancia.toString());
    }
};

/**
 * Reseta o formulário para o modo de cadastro.
 */
const reiniciarModoCadastro = () => { // Arrow Function
    alunoIdInput.value = ''; 
    submitButton.textContent = 'Cadastrar';
    cancelarEdicaoButton.style.display = 'none';
    form.reset();
};


// ----------------------------------------------------------------
// ESCUTADORES DE EVENTOS (ADD EVENT LISTENER)
// ----------------------------------------------------------------

// Evento principal do formulário (Cadastro/Edição) - Usando Arrow Function
form.addEventListener('submit', (evento) => { 
    evento.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const curso = document.getElementById('curso').value;
    const notaFinal = document.getElementById('notaFinal').value;
    const idEdicao = alunoIdInput.value;

    const novoAlunoInstancia = new Aluno(nome, idade, curso, notaFinal);

    if (idEdicao) {
        atualizarAluno(parseInt(idEdicao), novoAlunoInstancia);
        alert(`Aluno ${nome} (ID: ${idEdicao}) editado com sucesso!`);
    } else {
        cadastrarAluno(novoAlunoInstancia);
        alert(`Aluno ${nome} cadastrado com sucesso!`);
    }
    
    form.reset(); 
    reiniciarModoCadastro();
    
    // Atualiza a tabela (mostrando a lista completa) e os relatórios
    renderizarTabela(alunos); 
    gerarRelatorios();
});

// Evento para o botão "Cancelar Edição" - Usando Arrow Function
cancelarEdicaoButton.addEventListener('click', () => { 
    reiniciarModoCadastro();
    console.log("Edição cancelada.");
});

// Botão para listar apenas Aprovados (FILTER) - Usando Arrow Function
btnAprovados.addEventListener('click', () => { 
    // FILTER: Cria um novo array apenas com alunos aprovados
    const aprovados = alunos.filter(aluno => aluno.isAprovado()); 
    
    renderizarTabela(aprovados);
    console.log(`Filtro aplicado: ${aprovados.length} alunos aprovados.`);
});

// Botão para listar Todos (Resetar Filtro) - Usando Arrow Function
btnTodos.addEventListener('click', () => { 
    renderizarTabela(alunos);
    console.log("Filtro resetado: mostrando todos os alunos.");
});

// Botão para Recalcular Estatísticas
btnMedia.addEventListener('click', gerarRelatorios); 


// ----------------------------------------------------------------
// INICIALIZAÇÃO DO SISTEMA
// ----------------------------------------------------------------

// Chamadas iniciais para popular a tabela e os relatórios
renderizarTabela(alunos);
gerarRelatorios();
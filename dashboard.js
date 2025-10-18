// Validação das descrições das tarefas
function validarDescricao(id) {
    const textarea = document.getElementById(`descricao-${id}`);
    const mensagemErro = document.getElementById(`erro-descricao-${id}`);
    const descricao = textarea.value.trim();
       
    // Limpar mensagem de erro anterior
    mensagemErro.textContent = '';
    textarea.classList.remove('erro');
    
    // Validações
    if (descricao === '') {
        mensagemErro.textContent = 'A descrição da tarefa é obrigatória.';
        textarea.classList.add('erro');
        return false;
    }
    
    if (descricao.length < 10) {
        mensagemErro.textContent = 'A descrição deve ter pelo menos 10 caracteres.';
        textarea.classList.add('erro');
        return false;
    }
    
    if (descricao.length > 500) {
        mensagemErro.textContent = 'A descrição não pode exceder 500 caracteres.';
        textarea.classList.add('erro');
        return false;
    }
    
    return true;
}

// Função para editar tarefa
function editarTarefa(id) {
    const textarea = document.getElementById(`descricao-${id}`);
    
    // Habilitar edição
    textarea.removeAttribute('readonly');
    textarea.focus();
    
    // Adicionar evento de validação em tempo real
    textarea.addEventListener('input', function() {
        validarDescricao(id);
    });
    
    // Alterar o botão para "Salvar"
    const btnEditor = document.querySelector(`#tarefa-${id} .btn-editor`);
    btnEditor.textContent = 'Salvar';
    btnEditor.onclick = function() {
        salvarTarefa(id);
    };
}

// Função para salvar tarefa após edição
function salvarTarefa(id) {
    if (validarDescricao(id)) {
        const textarea = document.getElementById(`descricao-${id}`);
        
        // Desabilitar edição
        textarea.setAttribute('readonly', true);
        
        // Restaurar o botão para "Editor"
        const btnEditor = document.querySelector(`#tarefa-${id} .btn-editor`);
        btnEditor.textContent = 'Editor';
        btnEditor.onclick = function() {
            editarTarefa(id);
        };
        
        // Feedback visual de sucesso
        const taskCard = document.getElementById(`tarefa-${id}`);
        taskCard.classList.add('salvo');
        setTimeout(() => {
            taskCard.classList.remove('salvo');
        }, 2000);
    }
}

// Função para concluir tarefa
function concluirTarefa(id) {
    if (validarDescricao(id)) {
        const taskCard = document.getElementById(`tarefa-${id}`);
        const textarea = document.getElementById(`descricao-${id}`);
        
        // Marcar como concluída
        taskCard.classList.add('concluida');
        textarea.setAttribute('readonly', true);
        
        // Desabilitar botões
        const btnEditor = document.querySelector(`#tarefa-${id} .btn-editor`);
        const btnConcluir = document.querySelector(`#tarefa-${id} .btn-concluir`);
        btnEditor.disabled = true;
        btnConcluir.disabled = true;
        btnConcluir.textContent = 'Concluída ✓';
        
        // Feedback
        alert(`Tarefa ${id} concluída com sucesso!`);
    }
}

// Validação do formulário completo
function validarFormulario() {
    let formularioValido = true;
    const tarefas = document.querySelectorAll('.task-card');
    
    tarefas.forEach((tarefa, index) => {
        const id = index + 1;
        if (!validarDescricao(id)) {
            formularioValido = false;
        }
    });
    
    if (formularioValido) {
        alert('Todas as tarefas estão válidas!');
        return true;
    } else {
        alert('Por favor, corrija os erros antes de continuar.');
        return false;
    }
}

// Validação em tempo real para todas as textareas
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar validação em tempo real para todas as textareas
    const textareas = document.querySelectorAll('textarea[name="textarea"]');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            const id = this.id.split('-')[1];
            validarDescricao(id);
        });
        
        textarea.addEventListener('blur', function() {
            const id = this.id.split('-')[1];
            validarDescricao(id);
        });
    });
    
    // Adicionar evento de submit ao formulário
    const formulario = document.getElementById('formTarefas');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            validarFormulario();
        });
    }
    // Inicializar todas as textareas como editáveis
    textareas.forEach(textarea => {
    // Inicialmente, as textareas estão editáveis
    // O usuário pode digitar desde o início
    });

    
    // Inicializar todas as textareas como readonly
    //textareas.forEach(textarea => {
        //textarea.setAttribute('readonly', true);
    //});
});
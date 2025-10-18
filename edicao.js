
        // Validação do formulário de tarefas
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const taskStatus = document.getElementById('task-status');
    const saveButton = document.querySelector('.btn-primary');
    const cancelButton = document.querySelector('.btn-secondary');
    const deleteButton = document.querySelector('.btn-danger');

    // Função para exibir mensagens de erro
    function showError(input, message) {
        // Remove erros anteriores
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Adiciona borda vermelha
        input.style.borderColor = '#e74c3c';
        
        // Cria mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        input.parentNode.appendChild(errorElement);
    }

    // Função para remover erro
    function removeError(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '#ccc';
    }

    // Validação do título
    function validateTitle() {
        const title = taskTitle.value.trim();
        
        if (title === '') {
            showError(taskTitle, 'O título da tarefa é obrigatório');
            return false;
        }
        
        if (title.length < 3) {
            showError(taskTitle, 'O título deve ter pelo menos 3 caracteres');
            return false;
        }
        
        if (title.length > 100) {
            showError(taskTitle, 'O título deve ter no máximo 100 caracteres');
            return false;
        }
        
        removeError(taskTitle);
        return true;
    }

    // Validação da descrição
    function validateDescription() {
        const description = taskDescription.value.trim();
        
        if (description === '') {
            showError(taskDescription, 'A descrição da tarefa é obrigatória');
            return false;
        }
        
        if (description.length < 10) {
            showError(taskDescription, 'A descrição deve ter pelo menos 10 caracteres');
            return false;
        }
        
        if (description.length > 500) {
            showError(taskDescription, 'A descrição deve ter no máximo 500 caracteres');
            return false;
        }
        
        removeError(taskDescription);
        return true;
    }

    // Validação do status
    function validateStatus() {
        const status = taskStatus.value;
        
        if (!status) {
            showError(taskStatus, 'O status da tarefa é obrigatório');
            return false;
        }
        
        const validStatuses = ['pendente', 'andamento', 'concluida'];
        if (!validStatuses.includes(status)) {
            showError(taskStatus, 'Status inválido');
            return false;
        }
        
        removeError(taskStatus);
        return true;
    }

    // Validação completa do formulário
    function validateForm() {
        const isTitleValid = validateTitle();
        const isDescriptionValid = validateDescription();
        const isStatusValid = validateStatus();
        
        return isTitleValid && isDescriptionValid && isStatusValid;
    }

    // Event Listeners para validação em tempo real
    taskTitle.addEventListener('blur', validateTitle);
    taskTitle.addEventListener('input', function() {
        if (this.value.trim().length > 2) {
            removeError(taskTitle);
        }
    });

    taskDescription.addEventListener('blur', validateDescription);
    taskDescription.addEventListener('input', function() {
        if (this.value.trim().length > 9) {
            removeError(taskDescription);
        }
    });

    taskStatus.addEventListener('change', validateStatus);

    // Event Listener para o botão Salvar
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Simular salvamento dos dados
            const taskData = {
                title: taskTitle.value.trim(),
                description: taskDescription.value.trim(),
                status: taskStatus.value
            };
            
            console.log('Dados validados e prontos para salvar:', taskData);
            
            // Aqui você pode adicionar a lógica para salvar no backend
            alert('Tarefa salva com sucesso!');
            
            // Simular atualização da lista de tarefas
            updateTaskList(taskData);
        } else {
            alert('Por favor, corrija os erros antes de salvar.');
        }
    });

    // Event Listener para o botão Cancelar
    cancelButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
            // Resetar formulário
            taskForm.reset();
            
            // Remover todos os erros
            const errors = document.querySelectorAll('.error-message');
            errors.forEach(error => error.remove());
            
            // Resetar bordas
            const inputs = [taskTitle, taskDescription, taskStatus];
            inputs.forEach(input => input.style.borderColor = '#ccc');
            
            console.log('Formulário cancelado e resetado');
        }
    });

    // Event Listener para o botão Excluir
    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (confirm('Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.')) {
            // Simular exclusão da tarefa
            console.log('Tarefa excluída');
            alert('Tarefa excluída com sucesso!');
            
            // Resetar formulário
            taskForm.reset();
        }
    });

    // Função para atualizar a lista de tarefas (simulação)
    function updateTaskList(taskData) {
        // Encontrar a primeira tarefa na lista (que corresponde à que está sendo editada)
        const firstTask = document.querySelector('.task-item:first-child');
        
        if (firstTask) {
            const taskTitleElement = firstTask.querySelector('h3');
            const taskDescriptionElement = firstTask.querySelector('p');
            const taskStatusElement = firstTask.querySelector('.task-status');
            
            // Atualizar os dados
            taskTitleElement.textContent = taskData.title;
            taskDescriptionElement.textContent = taskData.description;
            
            // Atualizar status e classes
            taskStatusElement.textContent = getStatusText(taskData.status);
            taskStatusElement.className = 'task-status ' + getStatusClass(taskData.status);
        }
    }

    // Função auxiliar para obter texto do status
    function getStatusText(status) {
        const statusMap = {
            'pendente': 'Pendente',
            'andamento': 'Em Andamento',
            'concluida': 'Concluída'
        };
        return statusMap[status] || 'Pendente';
    }

    // Função auxiliar para obter classe CSS do status
    function getStatusClass(status) {
        const classMap = {
            'pendente': 'status-pendente',
            'andamento': 'status-andamento',
            'concluida': 'status-concluida'
        };
        return classMap[status] || 'status-pendente';
    }

    // Validação inicial ao carregar a página
    validateTitle();
    validateDescription();
    validateStatus();

    
});
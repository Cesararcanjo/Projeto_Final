document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Funcionalidade do botão "Salvar Tarefa"
    const salvarBtn = document.querySelector('.btn.btn-primary');
    const formulario = document.querySelector('form');
    
    salvarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const titulo = document.getElementById('titulo').value.trim();
        const descricao = document.getElementById('descricao').value.trim();
        
        if (!titulo) {
            alert('Por favor, preencha o título da tarefa!');
            document.getElementById('titulo').focus();
            return;
        }
        
        const dadosTarefa = {
            titulo: titulo,
            descricao: descricao,
            dataCriacao: new Date().toLocaleString()
        };
        
        console.log('Tarefa salva:', dadosTarefa);
        
        const camposFormulario = formulario.querySelectorAll('input, textarea, button');
        camposFormulario.forEach(campo => {
            campo.disabled = true;
        });
        
        salvarBtn.textContent = 'Tarefa Salva';
        salvarBtn.style.backgroundColor = '#28a745';
        salvarBtn.style.cursor = 'not-allowed';
        
        // MOSTRAR BOTÃO REMOVER APÓS SALVAR A TAREFA
        mostrarBotaoRemover(document.querySelector('.main-content'));
        
        alert('Tarefa salva com sucesso! Os campos foram bloqueados para edição.');
    });
    
    // 2. Funcionalidade do botão circular para duplicar
    const btnCircular = document.querySelector('.btn-circular');
    
    btnCircular.addEventListener('click', function() {
        const mainContentOriginal = document.querySelector('.main-content');
        const mainContentClone = mainContentOriginal.cloneNode(true);
        
        // CORREÇÃO: Gerar novos IDs únicos para os campos clonados
        const formularioClone = mainContentClone.querySelector('form');
        const tituloClone = formularioClone.querySelector('#titulo');
        const descricaoClone = formularioClone.querySelector('#descricao');
        
        if (tituloClone) {
            tituloClone.id = 'titulo-' + Date.now();
            tituloClone.value = '';
            tituloClone.disabled = false;
        }
        
        if (descricaoClone) {
            descricaoClone.id = 'descricao-' + Date.now();
            descricaoClone.value = '';
            descricaoClone.disabled = false;
        }
        
        // Remove classes active do menu
        const menuItems = mainContentClone.querySelectorAll('.menu-item');
        menuItems.forEach(item => item.classList.remove('active'));
        
        // Atualiza título
        const pageTitle = mainContentClone.querySelector('.page-title');
        if (pageTitle) {
            pageTitle.textContent = 'Criar Nova Tarefa';
        }
        
        // CORREÇÃO: Remove event listeners antigos e adiciona novos
        const salvarBtnClone = mainContentClone.querySelector('.btn.btn-primary');
        if (salvarBtnClone) {
            // Clona o botão para remover event listeners
            const newSalvarBtn = salvarBtnClone.cloneNode(true);
            salvarBtnClone.parentNode.replaceChild(newSalvarBtn, salvarBtnClone);
            
            // Configura o novo botão
            newSalvarBtn.textContent = 'Salvar Tarefa';
            newSalvarBtn.style.backgroundColor = '';
            newSalvarBtn.style.cursor = 'pointer';
            newSalvarBtn.disabled = false;
            
            // Adiciona event listener para o clone
            newSalvarBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const tituloValue = formularioClone.querySelector(`#${tituloClone.id}`).value.trim();
                const descricaoValue = formularioClone.querySelector(`#${descricaoClone.id}`).value.trim();
                
                if (!tituloValue) {
                    alert('Por favor, preencha o título da tarefa!');
                    formularioClone.querySelector(`#${tituloClone.id}`).focus();
                    return;
                }
                
                const dadosTarefaClone = {
                    titulo: tituloValue,
                    descricao: descricaoValue,
                    dataCriacao: new Date().toLocaleString()
                };
                
                console.log('Tarefa clonada salva:', dadosTarefaClone);
                
                const camposFormularioClone = formularioClone.querySelectorAll('input, textarea, button');
                camposFormularioClone.forEach(campo => {
                    campo.disabled = true;
                });
                
                newSalvarBtn.textContent = 'Tarefa Salva';
                newSalvarBtn.style.backgroundColor = '#28a745';
                newSalvarBtn.style.cursor = 'not-allowed';
                
                // MOSTRAR BOTÃO REMOVER APÓS SALVAR A TAREFA CLONADA
                mostrarBotaoRemover(mainContentClone);
                
                alert('Tarefa clonada salva com sucesso!');
            });
        }
        
        // Remove qualquer botão de remover existente no clone (caso o original já tivesse)
        const botaoRemoverExistente = mainContentClone.querySelector('.botao-remover-tarefa');
        if (botaoRemoverExistente) {
            botaoRemoverExistente.remove();
        }
        
        // Estilização do clone
        mainContentClone.style.marginTop = '15px';
        mainContentClone.style.padding = '15px';
        mainContentClone.style.borderRadius = '8px';
        mainContentClone.style.position = 'relative';
        
        // Insere após o original
        mainContentOriginal.parentNode.insertBefore(mainContentClone, mainContentOriginal.nextSibling);
        
        alert('Nova seção de tarefa criada!');
    });
    
    // FUNÇÃO PARA MOSTRAR BOTÃO DE REMOVER (após salvar tarefa)
    function mostrarBotaoRemover(elemento) {
        // Verifica se já existe um botão de remover
        const botaoExistente = elemento.querySelector('.botao-remover-tarefa');
        if (botaoExistente) {
            botaoExistente.style.display = 'block';
            return;
        }
        
        // Cria novo botão se não existir
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover Tarefa';
        removeButton.className = 'botao-remover-tarefa';
        
        // Estilização do botão vermelho
        removeButton.style.position = 'absolute';
        removeButton.style.top = '10px';
        removeButton.style.right = '10px';
        removeButton.style.backgroundColor = '#dc3545'; // Vermelho
        removeButton.style.color = 'white';
        removeButton.style.border = 'none';
        removeButton.style.padding = '8px 15px';
        removeButton.style.borderRadius = '5px';
        removeButton.style.cursor = 'pointer';
        removeButton.style.display = 'block';
        removeButton.style.zIndex = '1000';
        removeButton.style.fontWeight = 'bold';
        removeButton.style.fontSize = '14px';
        removeButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        removeButton.style.transition = 'all 0.3s ease';
        
        // Efeito hover para melhor interatividade
        removeButton.addEventListener('mouseenter', function() {
            removeButton.style.backgroundColor = '#c82333'; // Vermelho mais escuro
            removeButton.style.transform = 'scale(1.05)';
        });
        
        removeButton.addEventListener('mouseleave', function() {
            removeButton.style.backgroundColor = '#dc3545';
            removeButton.style.transform = 'scale(1)';
        });
        
        // Função para remover a tarefa
        removeButton.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja remover esta tarefa?')) {
                // Adiciona efeito visual antes de remover
                removeButton.style.backgroundColor = '#a71e2a';
                removeButton.textContent = 'Removendo...';
                
                setTimeout(() => {
                    elemento.style.transition = 'all 0.5s ease';
                    elemento.style.opacity = '0';
                    elemento.style.transform = 'translateX(100%)';
                    
                    setTimeout(() => {
                        elemento.remove();
                        alert('Tarefa removida com sucesso!');
                    }, 500);
                }, 500);
            }
        });
        
        elemento.appendChild(removeButton);
    }
    
    // FUNÇÃO PARA ESCONDER BOTÃO DE REMOVER (inicialmente)
    function esconderBotaoRemover(elemento) {
        const botaoRemover = elemento.querySelector('.botao-remover-tarefa');
        if (botaoRemover) {
            botaoRemover.style.display = 'none';
        }
    }
    
    // Inicialmente esconde o botão remover do conteúdo principal
    esconderBotaoRemover(document.querySelector('.main-content'));
});
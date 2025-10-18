// Função para obter o nome do usuário do localStorage
function getUsuarioLogado() {
    return localStorage.getItem('usuarioLogado');
}

// Função para formatar a data atual
function getDataAtual() {
    const data = new Date();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    
    // Array com nomes dos meses para formatação
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const mesExtenso = meses[data.getMonth()];
    
    return {
        formatoSimples: `${dia}/${mes}/${ano}`,
        formatoExtenso: `${dia} de ${mesExtenso} de ${ano}`
    };
}

// Função principal para atualizar a task-meta
function atualizarTaskMeta() {
    const usuario = getUsuarioLogado();
    
    if (usuario) {
        const data = getDataAtual();
        const taskMeta = document.querySelector('.task-meta');
        
        if (taskMeta) {
            taskMeta.innerHTML = `<p><strong>${usuario}</strong>: ${data.formatoExtenso}</p>`;
        }
    } else {
        console.warn('Nenhum usuário logado encontrado no localStorage');
        
        // Opcional: redirecionar para cadastro se não houver usuário
        // window.location.href = 'cadastro.html';
    }
}

// Função para validar se estamos na página correta
function validarPagina() {
    const taskCard = document.querySelector('.task-card');
    const taskMeta = document.querySelector('.task-meta');
    
    return taskCard && taskMeta;
}

// Função de inicialização
function init() {
    // Aguardar o DOM carregar completamente
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (validarPagina()) {
                atualizarTaskMeta();
            }
        });
    } else {
        // DOM já carregado
        if (validarPagina()) {
            atualizarTaskMeta();
        }
    }
}

// Inicializar a aplicação
init();

// Exemplo de como salvar o usuário na página cadastro.html
function salvarUsuario(nome) {
    if (nome && nome.trim() !== '') {
        localStorage.setItem('usuarioLogado', nome.trim());
        return true;
    }
    return false;
}

// Função para limpar o usuário (logout)
function logout() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'index.html';
}

// Adicionar event listener para o link "Sair"
document.addEventListener('DOMContentLoaded', function() {
    const sairLink = document.querySelector('a[href="index.html"]');
    if (sairLink) {
        sairLink.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// detalhes.js ou no script da página detalhes.html
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar o nome do localStorage
    const userName = localStorage.getItem('userName');
        
    // Encontrar o elemento com class "task-meta"
    const taskMetaElement = document.querySelector('.task-meta');
    
    // Se o elemento existir e tivermos um nome, atualizar o conteúdo
    if (taskMetaElement && userName) {
        taskMetaElement.textContent = userName;
    }
    
    // Alternativa: se houver múltiplos elementos com a mesma classe
    //const allTaskMetaElements = document.querySelectorAll('.task-meta');
    //allTaskMetaElements.forEach(element => {
        //if (userName) {
            //element.textContent = userName;
        //}
    });
});
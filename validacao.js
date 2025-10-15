// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entrar');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Remove o alert padrão do botão
    const loginButton = document.querySelector('.btn-login');
    loginButton.onclick = null;

    // Função para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para validar senha
    function validarSenha(senha) {
        return senha.length >= 6;
    }

    // Função para mostrar mensagem de erro
    function mostrarErro(input, mensagem) {
        // Remove mensagens de erro anteriores
        const erroAnterior = input.parentNode.querySelector('.erro-mensagem');
        if (erroAnterior) {
            erroAnterior.remove();
        }

        // Adiciona borda vermelha
        input.style.borderColor = '#e74c3c';
        
        // Cria e adiciona mensagem de erro
        const erroElement = document.createElement('div');
        erroElement.className = 'erro-mensagem';
        erroElement.style.color = '#e74c3c';
        erroElement.style.fontSize = '12px';
        erroElement.style.marginTop = '5px';
        erroElement.textContent = mensagem;
        
        input.parentNode.appendChild(erroElement);
    }

    // Função para remover erro
    function removerErro(input) {
        input.style.borderColor = '';
        
        const erroElement = input.parentNode.querySelector('.erro-mensagem');
        if (erroElement) {
            erroElement.remove();
        }
    }

    // Event listener para validação em tempo real
    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        
        if (email === '' || email === 'Digite seu e-mail') {
            mostrarErro(emailInput, 'Por favor, digite seu email');
        } else if (!validarEmail(email)) {
            mostrarErro(emailInput, 'Por favor, digite um email válido');
        } else {
            removerErro(emailInput);
        }
    });

    passwordInput.addEventListener('blur', function() {
        const senha = passwordInput.value.trim();
        
        if (senha === '') {
            mostrarErro(passwordInput, 'Por favor, digite sua senha');
        } else if (!validarSenha(senha)) {
            mostrarErro(passwordInput, 'A senha deve ter pelo menos 6 caracteres');
        } else {
            removerErro(passwordInput);
        }
    });

    // Event listener para o envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        
        const email = emailInput.value.trim();
        const senha = passwordInput.value.trim();
        
        let valido = true;

        // Validação do email
        if (email === '' || email === 'Digite seu e-mail') {
            mostrarErro(emailInput, 'Por favor, digite seu email');
            valido = false;
        } else if (!validarEmail(email)) {
            mostrarErro(emailInput, 'Por favor, digite um email válido');
            valido = false;
        }

        // Validação da senha
        if (senha === '') {
            mostrarErro(passwordInput, 'Por favor, digite sua senha');
            valido = false;
        } else if (!validarSenha(senha)) {
            mostrarErro(passwordInput, 'A senha deve ter pelo menos 6 caracteres');
            valido = false;
        }

        // Se tudo estiver válido, prossegue com o login
        if (valido) {
            // Aqui você pode adicionar a lógica de autenticação
            alert('Login realizado com sucesso!');
            console.log('Email:', email);
            console.log('Senha:', senha);
            
            // Limpar formulário (opcional)
            form.reset();
            
            // Redirecionar ou executar outras ações
            // window.location.href = 'dashboard.html';
        }
    });

    // Limpar erros quando o usuário começar a digitar
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && emailInput.value.trim() !== 'Digite seu e-mail') {
            removerErro(emailInput);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.trim() !== '') {
            removerErro(passwordInput);
        }
    });
});
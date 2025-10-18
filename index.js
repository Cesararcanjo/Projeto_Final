// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entrar');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Remove o alert inline e substitui por validação adequada
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.removeAttribute('onclick');

    // Validação do email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validação da senha
    function validarSenha(senha) {
        return senha.length >= 6; // Mínimo de 6 caracteres
    }

    // Função para mostrar mensagem de erro
    function mostrarErro(input, mensagem) {
        // Remove mensagens de erro existentes
        const erroExistente = input.parentNode.querySelector('.erro-validacao');
        if (erroExistente) {
            erroExistente.remove();
        }

        // Adiciona nova mensagem de erro
        if (mensagem) {
            const erroElemento = document.createElement('span');
            erroElemento.className = 'erro-validacao';
            erroElemento.style.color = 'red';
            erroElemento.style.fontSize = '12px';
            erroElemento.style.marginTop = '5px';
            erroElemento.style.display = 'block';
            erroElemento.textContent = mensagem;
            input.parentNode.appendChild(erroElemento);
        }

        // Adiciona/remove classe de erro no input
        if (mensagem) {
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    }

    // Validação em tempo real
    emailInput.addEventListener('blur', function() {
        const email = emailInput.value.trim();
        
        if (email === '' || email === 'Digite seu e-mail') {
            mostrarErro(emailInput, 'Email é obrigatório');
        } else if (!validarEmail(email)) {
            mostrarErro(emailInput, 'Digite um email válido');
        } else {
            mostrarErro(emailInput, '');
        }
    });

    passwordInput.addEventListener('blur', function() {
        const senha = passwordInput.value.trim();
        
        if (senha === '') {
            mostrarErro(passwordInput, 'Senha é obrigatória');
        } else if (!validarSenha(senha)) {
            mostrarErro(passwordInput, 'A senha deve ter pelo menos 6 caracteres');
        } else {
            mostrarErro(passwordInput, '');
        }
    });

    // Validação do formulário no submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const email = emailInput.value.trim();
        const senha = passwordInput.value.trim();

        let formValido = true;

        // Validação do email
        if (email === '' || email === 'Digite seu e-mail') {
            mostrarErro(emailInput, 'Email é obrigatório');
            formValido = false;
        } else if (!validarEmail(email)) {
            mostrarErro(emailInput, 'Digite um email válido');
            formValido = false;
        } else {
            mostrarErro(emailInput, '');
        }

        // Validação da senha
        if (senha === '') {
            mostrarErro(passwordInput, 'Senha é obrigatória');
            formValido = false;
        } else if (!validarSenha(senha)) {
            mostrarErro(passwordInput, 'A senha deve ter pelo menos 6 caracteres');
            formValido = false;
        } else {
            mostrarErro(passwordInput, '');
        }

        // Se o formulário for válido, prossegue com o login
        if (formValido) {
            // Aqui você pode adicionar a lógica de autenticação
            console.log('Tentativa de login:', {
                email: email,
                senha: senha
            });

            // Simulação de login bem-sucedido
            alert('Login realizado com sucesso! Redirecionando...');
            
            // Aqui você pode redirecionar o usuário ou fazer uma requisição AJAX
            // window.location.href = 'dashboard.html';
        }
    });

    // Limpa o placeholder quando o campo email recebe foco
    emailInput.addEventListener('focus', function() {
        if (this.value === 'Digite seu e-mail') {
            this.value = '';
        }
    });

    // Restaura o placeholder se o campo estiver vazio ao perder o foco
    emailInput.addEventListener('blur', function() {
        if (this.value === '') {
            this.value = 'Digite seu e-mail';
        }
    });
});
 document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('cadastroForm');
            const nomeInput = document.getElementById('nome');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const nomeError = document.getElementById('nomeError');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const successMessage = document.getElementById('successMessage');
            
            // Função para validar o nome
            function validarNome() {
                const nome = nomeInput.value.trim();
                if (nome.length < 2) {
                    nomeError.style.display = 'block';
                    nomeInput.style.borderColor = '#e74c3c';
                    return false;
                } else {
                    nomeError.style.display = 'none';
                    nomeInput.style.borderColor = '#2ecc71';
                    return true;
                }
            }
            
            // Função para validar o e-mail
            function validarEmail() {
                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                
                if (!emailRegex.test(email)) {
                    emailError.style.display = 'block';
                    emailInput.style.borderColor = '#e74c3c';
                    return false;
                } else {
                    emailError.style.display = 'none';
                    emailInput.style.borderColor = '#2ecc71';
                    return true;
                }
            }
            
            // Função para validar a senha
            function validarSenha() {
                const senha = passwordInput.value;
                
                if (senha.length < 6) {
                    passwordError.style.display = 'block';
                    passwordInput.style.borderColor = '#e74c3c';
                    return false;
                } else {
                    passwordError.style.display = 'none';
                    passwordInput.style.borderColor = '#2ecc71';
                    return true;
                }
            }
            
            // Event listeners para validação em tempo real
            nomeInput.addEventListener('blur', validarNome);
            emailInput.addEventListener('blur', validarEmail);
            passwordInput.addEventListener('blur', validarSenha);
            
            // Event listener para o envio do formulário
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const isNomeValido = validarNome();
                const isEmailValido = validarEmail();
                const isSenhaValida = validarSenha();
                
                if (isNomeValido && isEmailValido && isSenhaValida) {
                    // Simulação de envio bem-sucedido
                    successMessage.style.display = 'block';
                    
                    // Redirecionar após 1,5 segundos
                    setTimeout(function() {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                }
            });
            
            // Armazenar o nome no localStorage para usar na página detalhes.html
            localStorage.setItem('userName', nome);

            // Função para criar botão (se necessário para outra funcionalidade)
            document.addEventListener('DOMContentLoaded', function() {
            // Se você tiver um botão específico "Criar Botão" além do "Criar Perfil"
                const criarBotaoBtn = document.getElementById('criarBotao');
                    if (criarBotaoBtn) {
                        criarBotaoBtn.addEventListener('click', function() {
                        const nome = document.getElementById('nome').value;
                    if (nome && nome.length >= 2) {
                        localStorage.setItem('userName', nome);
                        //alert('Nome armazenado com sucesso!');
                }
        });
    }
});



        });
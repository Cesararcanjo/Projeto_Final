<template>
  <div class="login-container">
    <h1>Sistema de Gerenciamento de Tarefas</h1>
    <h2>Bem-vindo de volta!</h2>
    
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="input-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          @focus="clearPlaceholder" 
          @blur="restorePlaceholder"
          required
        >
        <span v-if="emailError" class="erro-validacao">{{ emailError }}</span>
      </div>
      
      <div class="input-group">
        <label for="password">Senha</label>
        <div class="password-container">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="password" 
            v-model="password" 
            placeholder="Digite sua senha" 
            required
          >
          <button type="button" class="toggle-password" @click="togglePassword">
            {{ showPassword ? 'Ocultar' : 'Mostrar' }}
          </button>
        </div>
        <span v-if="passwordError" class="erro-validacao">{{ passwordError }}</span>
      </div>
      
      <button type="submit" class="btn-login">Entrar</button>
      
      <div class="register-link">
        Não tem uma conta! <router-link to="/cadastro">Cadastre-se</router-link>
      </div>
    </form>
    
    <div class="footer">
      © 2023 Projeto Acadêmico | <a href="#">Termos de Uso</a>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Login',
  setup() {
    const email = ref('Digite seu e-mail')
    const password = ref('')
    const showPassword = ref(false)
    const emailError = ref('')
    const passwordError = ref('')
    
    const router = useRouter()
    const store = useStore()

    function validarEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return regex.test(email)
    }

    function validarSenha(senha) {
      return senha.length >= 6
    }

    function clearPlaceholder() {
      if (email.value === 'Digite seu e-mail') {
        email.value = ''
      }
    }

    function restorePlaceholder() {
      if (email.value === '') {
        email.value = 'Digite seu e-mail'
      }
    }

    function togglePassword() {
      showPassword.value = !showPassword.value
    }

    function validarFormulario() {
      let valido = true
      
      // Validação do email
      if (email.value === '' || email.value === 'Digite seu e-mail') {
        emailError.value = 'Email é obrigatório'
        valido = false
      } else if (!validarEmail(email.value)) {
        emailError.value = 'Digite um email válido'
        valido = false
      } else {
        emailError.value = ''
      }

      // Validação da senha
      if (password.value === '') {
        passwordError.value = 'Senha é obrigatória'
        valido = false
      } else if (!validarSenha(password.value)) {
        passwordError.value = 'A senha deve ter pelo menos 6 caracteres'
        valido = false
      } else {
        passwordError.value = ''
      }

      return valido
    }

    async function handleLogin() {
      if (validarFormulario()) {
        // Simulação de login bem-sucedido
        const user = {
          email: email.value,
          nome: 'Usuário Teste' // Em uma aplicação real, viria da API
        }
        
        store.dispatch('login', user)
        
        // Mostrar notificação de sucesso
        alert('Login realizado com sucesso! Redirecionando...')
        
        // Redirecionar para dashboard
        router.push('/dashboard')
      }
    }

    return {
      email,
      password,
      showPassword,
      emailError,
      passwordError,
      clearPlaceholder,
      restorePlaceholder,
      togglePassword,
      handleLogin
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-decoration: none;
}

body {
  background-color: #e7f7c4;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.login-container {
  background-color: rgb(236, 206, 141);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  padding: 30px;
}

.login-container:hover {
  transform: translateY(+2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  transition: 0.5s;
}

.password-container {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 35px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
}

h2 {
  color: #666;
  text-align: center;
  font-weight: normal;
  margin-bottom: 30px;
  font-size: 18px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.input-group input:focus {
  outline: none;
  border-color: #dfa97c;
}

.btn-login, .btn-cadastro {
  width: 100%;
  padding: 12px;
  background-color: #dfa97c;
  color: rgb(46, 44, 44);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-login:hover, .btn-cadastro:hover {
  background-color: #e7f7c4;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.shadow-simple:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.register-link, .login-link {
  text-align: center;
  margin-top: 20px;
}

.register-link a, .login-link a {
  color: rgb(46, 44, 44);
  text-decoration: none;
}

.register-link a:hover, .login-link a:hover {
  color: rgb(46, 44, 44);
  text-decoration: underline;
}

.success-message {
  color: #27ae60;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}

.footer {
  margin-top: 30px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.footer a {
  color: rgb(46, 44, 44);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
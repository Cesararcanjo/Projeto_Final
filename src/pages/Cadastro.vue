<template>
  <div class="cadastro-container">
    <h1>Sistema de Gerenciamento de tarefas</h1>
    <h2>Cadastre-se.</h2>
    
    <form @submit.prevent="handleCadastro" class="cadastro-form">
      <div class="input-group">
        <label for="nome">Nome Completo</label>
        <input 
          type="text" 
          id="nome" 
          v-model="nome" 
          @blur="validarNome"
          required
        >
        <span v-if="nomeError" class="erro-validacao">{{ nomeError }}</span>
      </div>
      
      <div class="input-group">
        <label for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          v-model="email" 
          @blur="validarEmail"
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
            @blur="validarSenha"
            required
          >
          <button type="button" class="toggle-password" @click="togglePassword">
            {{ showPassword ? 'Ocultar' : 'Mostrar' }}
          </button>
        </div>
        <span v-if="passwordError" class="erro-validacao">{{ passwordError }}</span>
      </div>

      <div class="input-group">
        <label for="confirmPassword">Confirme sua Senha</label>          
        <div class="password-container">
          <input 
            :type="showPassword ? 'text' : 'password'"
            id="confirmPassword" 
            v-model="confirmPassword"
            @blur="validarConfirmacaoSenha"
            required
          >
        </div>
        <span v-if="confirmPasswordError" class="erro-validacao">{{ confirmPasswordError }}</span>
      </div>
      
      <button type="submit" class="btn-cadastro">Criar Conta</button>
      
      <div v-if="successMessage" class="success-message">
        Cadastro realizado com sucesso! Redirecionando...
      </div>
      
      <div class="login-link">
        Já tem uma conta? <router-link to="/login">Faça login</router-link>
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
  name: 'Cadastro',
  setup() {
    const nome = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('') // Adicionado
    const showPassword = ref(false)
    const nomeError = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const confirmPasswordError = ref('') // Adicionado
    const successMessage = ref(false)
    
    const router = useRouter()
    const store = useStore()

    function validarNome() {
      const regexNome = /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/
      if (!regexNome.test(nome.value) || nome.value.length < 5) {
        nomeError.value = 'Nome deve conter pelo menos 2 palavras e 5 caracteres'
        return false
      } else {
        nomeError.value = ''
        return true
      }
    }

    function validarEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.value)) {
        emailError.value = 'Digite um email válido'
        return false
      } else {
        emailError.value = ''
        return true
      }
    }

    function validarSenha() {
      if (password.value.length < 8) {
        passwordError.value = 'A senha deve ter pelo menos 8 caracteres'
        return false
      } else {
        passwordError.value = ''
        return true
      }
    }

    function validarConfirmacaoSenha() {
      if (confirmPassword.value !== password.value) {
        confirmPasswordError.value = 'As senhas não coincidem'
        return false
      } else {
        confirmPasswordError.value = ''
        return true
      }
    }

    function togglePassword() {
      showPassword.value = !showPassword.value
    }

    async function handleCadastro() {
      const isNomeValido = validarNome()
      const isEmailValido = validarEmail()
      const isSenhaValida = validarSenha()
      const isConfirmacaoValida = validarConfirmacaoSenha() // Adicionado
      
      if (isNomeValido && isEmailValido && isSenhaValida && isConfirmacaoValida) {
        successMessage.value = true
        
        // Armazenar dados do usuário
        const user = {
          nome: nome.value,
          email: email.value
        }
        
        store.dispatch('login', user)
        
        // Redirecionar após 1,5 segundos
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      }
    }

    return {
      nome,
      email,
      password,
      confirmPassword,
      showPassword,
      nomeError,
      emailError,
      passwordError,
      confirmPasswordError,
      successMessage,
      validarNome,
      validarEmail,
      validarSenha,
      validarConfirmacaoSenha,
      togglePassword,
      handleCadastro
    }
  }
}
</script>

<style scoped>

.cadastro-container {
  background-color: rgb(236, 206, 141);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  padding: 30px;
  margin: 20px auto;
}

.cadastro-container:hover {
  transform: translateY(+2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  transition: 0.5s;
}

.success-message {
  color: #27ae60;
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}

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
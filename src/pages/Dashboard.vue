<template>
  <div class="container-wrapper">
    <header class="header">
      <h3>Dashboard</h3>
      <input class="menu-btn" type="checkbox" id="menu-btn">
      <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
      <ul class="menu">
        <li><a href="#" @click.prevent="criarTarefa">Criar Tarefa</a></li>
        <li><a href="#" @click.prevent="editarTarefas">Editar tarefas</a></li>
        <li><a href="#" @click.prevent="sair">Sair</a></li>        
      </ul>
    </header>

    <main>
      <div class="container">
        <h1>Lista de Tarefas</h1>
        
        <!-- Área de notificações -->
        <div v-if="notificacao.mostrar" :class="['notificacao', notificacao.tipo]">
          {{ notificacao.mensagem }}
        </div>
        
        <!-- Formulário para adicionar tarefas -->
        <form @submit.prevent="adicionarTarefa" class="form-tarefa">
          <input 
            type="text" 
            v-model="novaTarefa" 
            placeholder="Digite uma nova tarefa..." 
            required
          >
          <button type="submit" :disabled="carregando">
            <span class="texto" v-if="!carregando">Adicionar</span>
            <span class="spinner" v-else></span>
          </button>
        </form>
        
        <!-- Lista de tarefas -->
        <ul v-if="tarefas.length > 0" class="lista-tarefas">
          <li 
            v-for="tarefa in tarefas" 
            :key="tarefa.id" 
            :class="['tarefa', { concluida: tarefa.concluida }]"
          >
            <span class="tarefa-texto">{{ tarefa.texto }}</span>
            <div class="tarefa-acoes">
              <button 
                @click="alternarTarefa(tarefa.id)" 
                class="btn-concluir"
              >
                {{ tarefa.concluida ? 'Desfazer' : 'Concluir' }}
              </button>
              <button 
                @click="removerTarefa(tarefa.id)" 
                class="btn-remover"
              >
                Remover
              </button>
            </div>
          </li>
        </ul>
        
        <!-- Mensagem quando não há tarefas -->
        <div v-else class="mensagem-vazia visivel">
          Nenhuma tarefa adicionada ainda. Que tal começar?
        </div>
      </div>
    </main>

    <footer>
      <p>© 2025 Projeto Acadêmico</p>
    </footer>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'Dashboard',
  setup() {
    const novaTarefa = ref('')
    const carregando = ref(false)
    const notificacao = ref({
      mostrar: false,
      mensagem: '',
      tipo: 'sucesso'
    })
    
    const router = useRouter()
    const store = useStore()

    const tarefas = computed(() => store.getters.todasTarefas)

    function mostrarNotificacao(mensagem, tipo = 'sucesso') {
      notificacao.value = {
        mostrar: true,
        mensagem,
        tipo
      }
      
      setTimeout(() => {
        notificacao.value.mostrar = false
      }, 3000)
    }

    async function simularCarregamento() {
      carregando.value = true
      await new Promise(resolve => setTimeout(resolve, 800))
      carregando.value = false
    }

    async function adicionarTarefa() {
      if (novaTarefa.value.trim() === '') {
        mostrarNotificacao('Por favor, digite uma tarefa!', 'erro')
        return
      }
      
      await simularCarregamento()
      
      store.dispatch('adicionarTarefa', {
        texto: novaTarefa.value.trim()
      })
      
      mostrarNotificacao('Tarefa adicionada com sucesso!', 'sucesso')
      novaTarefa.value = ''
    }

    function alternarTarefa(id) {
      store.dispatch('alternarTarefa', id)
      
      const tarefa = tarefas.value.find(t => t.id === id)
      const mensagem = tarefa.concluida ? 
        'Tarefa marcada como concluída!' : 
        'Tarefa desmarcada!'
      mostrarNotificacao(mensagem, 'sucesso')
    }

    function removerTarefa(id) {
      store.dispatch('removerTarefa', id)
      mostrarNotificacao('Tarefa removida!', 'sucesso')
    }

    function criarTarefa() {
      // Foca no input de nova tarefa
      document.querySelector('input[type="text"]')?.focus()
    }

    function editarTarefas() {
      // Implementação para edição em lote pode ser adicionada aqui
      mostrarNotificacao('Modo de edição ativado!', 'sucesso')
    }

    function sair() {
      store.dispatch('logout')
      router.push('/login')
    }

    onMounted(() => {
      // Focar no input ao carregar a página
      document.querySelector('input[type="text"]')?.focus()
    })

    return {
      novaTarefa,
      carregando,
      notificacao,
      tarefas,
      adicionarTarefa,
      alternarTarefa,
      removerTarefa,
      criarTarefa,
      editarTarefas,
      sair
    }
  }
}
</script>

<style scoped>
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #e7f7c4;
  color: #353433;
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h3 {
  color: #e66f0e;
}

.container-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  flex: 1;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

/* Header e Menu */
.header {
  background-color: rgb(236, 206, 141);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo h3 {
  color: #e66f0e;
  margin: 0;
  text-decoration: none;
}

.menu-btn {
  display: none;
}

.menu-icon {
  display: none;
  cursor: pointer;
}

.menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.menu a {
  color: #e66f0e;
  text-decoration: none;
  transition: color 0.3s;
}

.menu a:hover {
  color: white;
}

/* Formulário */
.form-tarefa {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.form-tarefa input {
  flex: 1;
  padding: 15px;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-tarefa input:focus {
  outline: none;
  border-color: #3498db;
}

.form-tarefa button {
  padding: 15px 25px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-tarefa button:hover:not(:disabled) {
  background-color: #2980b9;
}

.form-tarefa button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Lista de tarefas */
.lista-tarefas {
  list-style: none;
  margin-bottom: 20px;
}

.tarefa {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
  transition: all 0.3s ease;
}

.tarefa:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tarefa.concluida {
  border-left-color: #27ae60;
  background-color: #d5f4e6;
}

.tarefa-texto {
  flex: 1;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.tarefa.concluida .tarefa-texto {
  text-decoration: line-through;
  color: #7f8c8d;
}

.tarefa-acoes {
  display: flex;
  gap: 8px;
}

.btn-concluir, .btn-remover {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-concluir {
  background-color: #27ae60;
  color: white;
}

.btn-concluir:hover {
  background-color: #229954;
}

.btn-remover {
  background-color: #e74c3c;
  color: white;
}

.btn-remover:hover {
  background-color: #c0392b;
}

/* Mensagem quando vazia */
.mensagem-vazia {
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
  padding: 40px 20px;
  display: none;
}

.mensagem-vazia.visivel {
  display: block;
}

/* Footer */
footer {
  background-color: #e66f0e;
  color: rgb(236, 206, 141);
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* Responsividade */
@media (max-width: 768px) {
  .container {
    margin: 20px;
    padding: 20px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .form-tarefa {
    flex-direction: column;
  }
  
  .menu {
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgb(236, 206, 141);
    display: none;
    padding: 1rem;
  }
  
  .menu-btn:checked ~ .menu {
    display: flex;
  }
  
  .menu-icon {
    display: block;
  }
  
  .navicon {
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    position: relative;
  }
  
  .navicon:before,
  .navicon:after {
    content: '';
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    position: absolute;
  }
  
  .navicon:before {
    top: -8px;
  }
  
  .navicon:after {
    top: 8px;
  }
}
</style>
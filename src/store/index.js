import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    tarefas: [],
    proximoId: 1
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    ADD_TAREFA(state, tarefa) {
      state.tarefas.push({
        id: state.proximoId++,
        texto: tarefa.texto,
        concluida: false
      })
    },
    TOGGLE_TAREFA(state, id) {
      const tarefa = state.tarefas.find(t => t.id === id)
      if (tarefa) {
        tarefa.concluida = !tarefa.concluida
      }
    },
    REMOVE_TAREFA(state, id) {
      state.tarefas = state.tarefas.filter(t => t.id !== id)
    },
    SET_TAREFAS(state, tarefas) {
      state.tarefas = tarefas
    }
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', user)
      localStorage.setItem('userAuthenticated', 'true')
      localStorage.setItem('userName', user.nome)
    },
    logout({ commit }) {
      commit('SET_USER', null)
      localStorage.removeItem('userAuthenticated')
    },
    adicionarTarefa({ commit }, tarefa) {
      commit('ADD_TAREFA', tarefa)
    },
    alternarTarefa({ commit }, id) {
      commit('TOGGLE_TAREFA', id)
    },
    removerTarefa({ commit }, id) {
      commit('REMOVE_TAREFA', id)
    }
  },
  getters: {
    usuarioLogado: state => state.user,
    todasTarefas: state => state.tarefas,
    tarefasPendentes: state => state.tarefas.filter(t => !t.concluida),
    tarefasConcluidas: state => state.tarefas.filter(t => t.concluida)
  }
})
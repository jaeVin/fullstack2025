import { defineStore } from 'pinia';
import { ref } from 'vue';
import { http } from '../utils/http.mjs';

export const useToDo = defineStore('todo-Store', () => {
    const todos = ref([]);
    const endPoint = "/todos"

    async function loadTodos() {
        ref = await http.get(endPoint)
    }

    async function addTodo(newTodo) {
        ref = await http.post(endPoint, newTodo)
    }

    async function changeToDo(updatedTodo) {
        ref = await http.put(endPoint, updatedTodo)
    }

    async function setToDo() {
        ref = await http.(endPoint)
    }

    async function deleteToDo() {
        ref = await http.delete(endPoint+"/${id}")
    }
});
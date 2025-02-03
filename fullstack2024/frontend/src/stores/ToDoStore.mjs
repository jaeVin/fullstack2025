import { defineStore } from 'pinia';
import { ref } from 'vue';
import { http } from '../utils/http.mjs';

export const useToDo = defineStore('todo-Store', () => {
    const todos = ref([]);
    const endPoint = "/todos";

    async function loadTodos() {
        const response = await http.get('http://backend.vm1.test/api/todos');
        this.todos = response.data.data;
    }

    async function addTodo(newTodo) {
        const response = await http.post(endPoint, newTodo);
        todos.value.push(response);
    }

    async function changeToDo(updatedTodo) {
        await http.put(`${endPoint}/${updatedTodo.id}`, updatedTodo);
        const index = todos.value.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            todos.value[index] = updatedTodo;
        }
    }

    async function setToDo(newTodos) {
        todos.value = newTodos;
    }

    async function deleteToDo(id) {
        try {
            const response = await http.delete(`${endPoint}/${id}`);
            if (response.status === 200 || response.status === 204) {
                todos.value = todos.value.filter(todo => todo.id !== id);
            } else {
                console.error("Failed to delete. Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }

    async function setToDoDone(id) {
        const todo = todos.value.find(todo => todo.id === id);
        if (todo) {
            todo.completed = true;
            await http.put(`${endPoint}/${id}`, { ...todo, completed: true });
        }
    }

    return {
        todos,
        loadTodos,
        addTodo,
        changeToDo,
        setToDo,
        deleteToDo,
        setToDoDone
    };
});

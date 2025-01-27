<template>
  <BaseLayout>
    <div class="todo-container">
      <h1>Teendők</h1>
      <input v-model="newTodo.title" placeholder="Cím" class="todo-input"/>
      <input v-model="newTodo.description" placeholder="Leírás" @keyup.enter="handleAddTodo" class="todo-input"/>
      <button @click="handleAddTodo">Hozzáadás</button>

      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <div v-if="editingTodo !== todo.id">
            <strong>{{ todo.title }}</strong>
            <p>{{ todo.description }}</p>
            <p>{{ todo.id }}</p>
            <button @click="startEdit(todo)">Szerkesztés</button>
            <button @click="handleDelete(todo.id)">Törlés</button>
          </div>

          <div v-else>
            <input v-model="editingTodoTitle" class="todo-input" />
            <input v-model="editingTodoDescription" class="todo-input" />
            <button @click="handleSaveEdit(todo.id)">Mentés</button>
            <button @click="cancelEdit">Mégsem</button>
          </div>
        </li>
      </ul>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@layouts/BaseLayout.vue';
import { useToDo } from '@stores/ToDoStore.mjs';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
    BaseLayout
  },
  data() {
    return {
      newTodo: {
        title: '',
        description: ''
      },
      editingTodo: null,
      editingTodoTitle: '',
      editingTodoDescription: ''
    };
  },
  computed: {
    ...mapState(useToDo, ['todos'])
  },
  methods: {
    ...mapActions(useToDo, ['loadTodos', 'addTodo', 'changeToDo', 'deleteToDo']),
    
    async handleAddTodo() {
      if (this.newTodo.title.trim() && this.newTodo.description.trim()) {
        await this.addTodo({ title: this.newTodo.title, description: this.newTodo.description });
        this.newTodo.title = '';
        this.newTodo.description = '';
        await this.loadTodos();
      }
    },

    async handleDelete(id) {
      await this.deleteToDo(id);
      await this.loadTodos();
    },

    startEdit(todo) {
      this.editingTodo = todo.id;
      this.editingTodoTitle = todo.title;
      this.editingTodoDescription = todo.description;
    },

    async handleSaveEdit(id) {
      if (this.editingTodoTitle.trim() && this.editingTodoDescription.trim()) {
        await this.changeToDo({ id, title: this.editingTodoTitle, description: this.editingTodoDescription });
        this.editingTodo = null;
        await this.loadTodos();
      }
    },

    cancelEdit() {
      this.editingTodo = null;
    }
  },

  async mounted() {
    await this.loadTodos();
  }
};
</script>

<style>
.todo-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: darkgreen;
  border-radius: 8px;
}
.todo-input {
  margin-right: 10px;
  padding: 5px;
  background-color: green;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}
</style>

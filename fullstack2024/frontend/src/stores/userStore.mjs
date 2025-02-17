import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { http } from '../utils/http.mjs';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    const loadUser = async () => {
        try {
            const response = await http.get('/user');
            user.value = response.data;
        } catch (error) {
            user.value = null;
        }
    };

    const signup = async (userData) => {
        const response = await http.post('/register', userData);
        user.value = response.data;
    };

    const login = async (credentials) => {
        const response = await http.post('/login', credentials);
        user.value = response.data;
    };

    const logout = async () => {
        try {
            await http.post('/logout');
            user.value = null;  
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isLoggedIn = computed(() => !!user.value);

    return { user, loadUser, signup, login, logout, isLoggedIn };
});

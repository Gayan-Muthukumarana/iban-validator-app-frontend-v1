import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            user: null,
            adminUser: null,
        };
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        adminUser: (state) => {
            return state.adminUser;
        }
    },
    actions: {
        setUser(context, user) {
            context.commit('SET_USER', user);
        },
        setAdminUser(context, user) {
            context.commit('SET_ADMIN_USER', user);
        },
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_ADMIN_USER(state, user) {
            state.adminUser = user;
        }
    }
});

export default store;
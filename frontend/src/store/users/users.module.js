import userService from '../../services/users/users.service';

const state = {
  users: []
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  }
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const users = await userService.getUsers();
      commit('SET_USERS', users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  },

  async addUser({ commit }, adduser) {
    // try {
      const user = await userService.addUsers(adduser);
      commit('SET_USERS', user);
      commit('success', user);
    // }catch (error) {
    //   console.error('Error add users:', error);
    // }
  }
};

const getters = {
  users: (state) => state.users
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

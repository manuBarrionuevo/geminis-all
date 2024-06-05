import organizationService from '../../services/organizations/organization.service';

const state = {
  organizations: [],
  selectedOrganization: null,
};

const mutations = {
  SET_ORGANIZATIONS(state, organizations) {
    state.organizations = organizations;
  },
  ADD_ORGANIZATION(state, organization) {
    state.organizations.push(organization);
  },
  SET_SELECTED_ORGANIZATION(state, organizations) {
    state.selectedOrganization = organizations;
  },
};

const actions = {
  async fetchOrganizations({ commit }) {
    try {
      const organizations = await organizationService.getOrganizations();
      commit('SET_ORGANIZATIONS', organizations);
    } catch (error) {
      console.error('Error al obtener Municipios:', error);
    }
  },
  async fetchgetListOrganizationsAdmin({ commit }) {
    try {
      const organizations = await organizationService.getListOrganizationsAdmin();
      commit('SET_ORGANIZATIONS', organizations);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  },
  async addOrganization({ commit }, organization) {
    try {
      const response = await organizationService.addOrganization(organization);
      commit('ADD_ORGANIZATION', organization);
      return response;
    } catch (error) {
      console.error('Error adding organization:', error);
      throw error;
    }
  },
  async fetchOrganizationById({ commit }, id) {
    try {
      const data = await organizationService.getOrganizationsById(id);
      commit('SET_SELECTED_ORGANIZATION', data);
    } catch (error) {
      console.error('Error fetching organization:', error);
    }
  },
};

const getters = {
  organizations: state => state.organizations
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

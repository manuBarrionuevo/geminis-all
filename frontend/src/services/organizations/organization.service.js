import axios from 'axios';
import Jsona from "jsona";
import ApiBaseUrl from '../url.service';

const dataFormatter = new Jsona();
const API_URL = ApiBaseUrl;

const options = {
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json',
  }
};

export default {
  async getOrganizations() {
    try {
      const response = await axios.get(API_URL + '/entity/list', options);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API organizations/list:', error);
      throw error;
    }
  },

  async addOrganization(organization) {
    try {
      if (organization !== undefined) {
        organization.type = 'organizations';
        const newJson = dataFormatter.serialize({ stuff: organization });
        const response = await axios.post(API_URL + "/entity/save", newJson.data.attributes, options);
        return response;
      }
    } catch (error) {
      console.error('Error adding organization to API entity/save:', error);
      throw error;
    }
  },

  async getListOrganizationsAdmin() {
    try {
      const response = await axios.get(API_URL + '/entity/listadmin', options);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API entity/list:', error);
      throw error;
    }
  },
  async getOrganizationsById(id) {
    try {
      const response = await axios.get(API_URL + `/entity/get/${id}`, options);
      return response.data;
    } catch (error) {
      console.error('Error fetching from API organizations/get:', error);
      throw error;
    }
  }
};

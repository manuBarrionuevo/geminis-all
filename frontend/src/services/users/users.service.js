import axios from 'axios';
import ApiBaseUrl from '../url.service';
import authHeader from "../auth-header";

export default {
    async getUsers() {
      try {
        const response = await axios.get(ApiBaseUrl + '/user/list');
        return response.data.data;
      } catch (error) {
        console.error('Error fetching users from API:', error);
        throw error;
      }
    },

    async addUsers(user) {

        if (user !== undefined) {

            try {
                const response = await axios.post(ApiBaseUrl + '/user/register', user, authHeader)
                return response;
            } catch (error) {
                console.error('Error fetching users from API:', error);
                throw error;
            }
        }


    }
  };

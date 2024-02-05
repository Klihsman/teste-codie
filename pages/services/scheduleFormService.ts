import axios from "axios";
import { IPokemon } from "../types";

class ScheduleFormService {
  baseUrl = "http://localhost:3000";

  async getDates() {
    try {
      const response = await axios.get(`${this.baseUrl}/api/scheduling/date`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTimes() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/scheduling/time`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPokemons() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

      return response.data.results as IPokemon[];
    } catch (error) {
      throw error;
    }
  }

  async getRegions() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/region");

      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async getLocations() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/location");

      return response.data.results;
    } catch (error) {
      throw error;
    }
  }

  async fakePostRequest(attribute: boolean) {
    return new Promise((resolve) => {
      const result = attribute === true;

      setTimeout(() => {
        resolve(result);
      }, 100);
    });
  }
}

export default ScheduleFormService;

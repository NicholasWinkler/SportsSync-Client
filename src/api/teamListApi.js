// src/api/teamListApi.js

const BASE_URL = "http://localhost:8000/api";

export const teamListApi = {
  getAllTeams: async () => {
    try {
      const response = await fetch(`${BASE_URL}/teams/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  getTeamById: async (teamId) => {
    try {
      const response = await fetch(`${BASE_URL}/teams/${teamId}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching team details:", error);
      throw error;
    }
  },
};

import { API_BASE_URL, headers } from "./index";

export const getGames = async (date = "today") => {
  // Remove the duplicate 'api' from the URL
  const response = await fetch(
    `${API_BASE_URL}/api/games/schedule/?date=${date}`,
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getGameDetails = async (gameId) => {
  console.log("Calling getGameDetails with:", gameId);
  const response = await fetch(`${API_BASE_URL}/api/games/${gameId}/details/`);
  console.log("Response status:", response.status);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log("Response data:", data);
  return data;
};

export const getHistoricalMatchups = async (team1Id, team2Id) => {
  const response = await fetch(
    `${API_BASE_URL}/api/games/historical/?team1=${team1Id}&team2=${team2Id}`,
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

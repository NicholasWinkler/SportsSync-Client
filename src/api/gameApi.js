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

export const fetchGames = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching games: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
};

// Fetch details for a specific game by game ID
export const fetchGameDetails = async (gameId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching game details: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

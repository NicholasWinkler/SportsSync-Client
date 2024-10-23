import { API_BASE_URL, headers } from './index';

export const getPlayers = async () => {
    const response = await fetch(`${API_BASE_URL}/players/`, {
        method: 'GET',
        headers,
    });
    return response.json();
};

export const addPlayer = async (playerData) => {
    const response = await fetch(`${API_BASE_URL}/players/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(playerData),
    });
    return response.json();
};

// other functions for updating and deleting players...

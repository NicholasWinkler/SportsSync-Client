// homeApi.js

const fetchHomeData = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/home/");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

export default fetchHomeData;

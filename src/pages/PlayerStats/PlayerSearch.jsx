// import React, { useState, useEffect } from "react";

// const PlayerSearch = () => {
//   const [players, setPlayers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       const response = await fetch("http://localhost:8000/api/players/");
//       const data = await response.json();
//       setPlayers(data); // Adjust based on the response structure
//     };

//     fetchPlayers();
//   }, []);

//   const filteredPlayers = players.filter((player) =>
//     player.player_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search for a player..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div>
//         {filteredPlayers.map((player) => (
//           <div key={player.player_id}>
//             <a href={`/players/${player.player_id}`}>{player.player_name}</a>
//             {/* Display other key stats if necessary */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlayerSearch;

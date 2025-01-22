// Función para obtener las categorías desde el backend
async function fetchGames() {
    try {
        const response = await axios.get(`${API_BASE_URL}/games`);
        console.log("Games:", response.data);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}
async function fetchDevs() {
    try {
        const response = await axios.get(`${API_BASE_URL}/devs`);
        console.log("Devs:", response.data);
    } catch (error) {
        console.error("Error fetching devs:", error);
    }
}
// Llama a la función al cargar la aplicación
fetchGames();
fetchDevs();

//# sourceMappingURL=index.579125c3.js.map

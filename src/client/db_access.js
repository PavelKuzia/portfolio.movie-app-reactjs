const baseUrl = import.meta.env.VITE_BACKEND_URL;
const backendPort = import.meta.env.VITE_BACKEND_URL_PORT;

export const updateSearchCount = async (searchTerm, movie) => {
  
  try {
    const result = await fetch(`${baseUrl}:${backendPort}/api/trends/query?searchTerm=${searchTerm}`);
    const data = await result.json();

    // if no entry -> create new entry
    if (data.length === 0) {
      
      const obj = {
        movieId: movie.id,
        count: 1,
        searchTerm: searchTerm,
        posterUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      }


      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      };
      console.log(`posting ${JSON.stringify(obj)}`);
      const postResult = await fetch(`${baseUrl}:${backendPort}/api/trends`, options);

    } else {
      // update existing entry
      const putResult = await fetch(`${baseUrl}:${backendPort}/api/trends/${movie.id}`, {
        method: 'PUT',
      });

    } 
  } catch (error) {
    console.log(error);
  }
}

export const getTrendingMovies = async () => {
  
  try {
    const response = await fetch(`${baseUrl}:${backendPort}/api/trends/top5`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("server is down");
  }
    
}
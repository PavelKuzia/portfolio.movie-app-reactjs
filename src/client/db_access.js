const baseUrl = import.meta.env.VITE_DB_URL;

export const updateSearchCount = async (searchTerm, movie) => {

  try {
    const result = await fetch(`${baseUrl}/trends/query?searchTerm=${searchTerm}`);
    // if no entry -> create new entry

    if (Object.keys(result).length === 0) {
      console.log("No data");
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

      const postResult = await fetch(`${baseUrl}/trends`, options);

    } else {
      // update existing entry
      const putResult = await fetch(`${baseUrl}/trends/${movie.id}`, {
        method: 'PUT',
      });

    } 
  } catch (error) {
    console.log(error);
  }
}

export const getTrendingMovies = async () => {

  fetch(`${baseUrl}/trends/top5`, {method: 'GET'})
  .then(response => response)
  .then(res => res.json)
  .catch((e) => console.error("server is down"))

  /*
  try {
    const response = await fetch(`${baseUrl}/trends/top5`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error in getTrendingMovies");
  }
    */
}
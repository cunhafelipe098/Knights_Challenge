export default class SwapiApi {
  getMovies() {
    return this.$axios
      .get("http://localhost:5050/api/knights");
  }
}

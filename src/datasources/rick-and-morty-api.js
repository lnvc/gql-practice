const { RESTDataSource } = require('apollo-datasource-rest');

class RickAndMortyAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://rickandmortyapi.com/api/'
  }

  async getCharacters() {
    const res = await this.get('character');
    return res.results;
  }

  async getLocations() {
    const res = await this.get('location');
    return res.results;
  }

  async getEpisodes() {
    const res = await this.get('episode');
    return res.results;
  }
}

module.exports = RickAndMortyAPI;

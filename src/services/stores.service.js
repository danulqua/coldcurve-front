import axios from 'axios';

class Service {
  // API URL
  _apiBase = process.env.REACT_APP_SERVER_URL;

  // Fetch store names
  async getStores() {
    try {
      const stores = (await axios(`${this._apiBase}/stores`)).data;
      return stores;
    } catch (err) {
      throw new Error(err);
    }
  }

  // Fetch products by query
  async getProducts(query, filters) {
    try {
      // If storeId filter exists - search by store, otherwise search in all stores
      const searchUrl = filters.storeId
        ? `${this._apiBase}/stores/${filters.storeId}/${encodeURIComponent(query)}`
        : `${this._apiBase}/products/${encodeURIComponent(query)}`;

      // Fetch products, pass the filters to the request
      const products = (
        await axios.post(searchUrl, {
          'content-type': 'application/json',
          body: JSON.stringify(filters),
        })
      ).data;

      return products;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new Service();

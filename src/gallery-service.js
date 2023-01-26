import axios from 'axios';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.maxPage = null;
    this.perPage = 40;
  }

  async getPictures() {
    this.page += 1;

    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '33064779-672e38c3576c5fc3963fc60eb',
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    });
    this.setMaxPage(response);
    return response.data.hits;
  }

  resetPage() {
    this.page = 0;
  }

  resetMaxPage() {
    this.maxPage = null;
  }

  setMaxPage(response) {
    if (this.maxPage === null) {
      this.maxPage = Math.ceil(response.data.totalHits / this.perPage);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}

import axios from 'axios';
import Notiflix from 'notiflix';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 0;
    this.maxPage = null;
    this.perPage = 40;
  }

  getPictures() {
    this.page += 1;

    return axios
      .get('https://pixabay.com/api/', {
        params: {
          key: '33064779-672e38c3576c5fc3963fc60eb',
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: this.perPage,
        },
      })
      .then(response => {
        if (this.maxPage === null) {
          this.maxPage = Math.ceil(response.data.totalHits / this.perPage);
          console.log(this.maxPage);
        }

        return response.data.hits;
      })
      .catch(function (error) {
        if (error.code === 'ERR_BAD_REQUEST') {
          return Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
      });
  }

  resetPage() {
    this.page = 0;
  }

  resetMaxPage() {
    this.maxPage = null;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}

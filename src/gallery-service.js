import axios from 'axios';
import Notiflix from 'notiflix';

export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getPictures() {
    return axios
      .get('https://pixabay.com/api/', {
        params: {
          key: '33064779-672e38c3576c5fc3963fc60eb',
          q: this.searchQuery,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 40,
        },
      })
      .then(response => {
        this.page += 1;
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
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}

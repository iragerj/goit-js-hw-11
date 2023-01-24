import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import GalleryApiService from './gallery-service';
import LoadMoreBtn from './loadmorebtn';

const form = document.querySelector('.search-form');
const loadMoreButton = new LoadMoreBtn(true);
const gallery = document.querySelector('.gallery');

const galleryService = new GalleryApiService();

form.addEventListener('submit', onSearchForm);
loadMoreButton.button.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

async function onSearchForm(event) {
  event.preventDefault();

  galleryService.query = event.currentTarget.elements.searchQuery.value;
  galleryService.resetPage();
  clearGallery();

  const pictures = await galleryService.getPictures();

  if (!pictures.length) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  showGallery(pictures);
  loadMoreButton.show();
}

function showGallery(pictures) {
  let HTML = pictures
    .map(
      picture => `
      <a href="${picture.largeImageURL}">
    <div class="photo-card">
        <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes: </b>${picture.likes}
            </p>
            <p class="info-item">
                <b>Views: </b>${picture.views}
            </p>
            <p class="info-item">
                <b>Comments: </b>${picture.comments}
            </p>
            <p class="info-item">
                <b>Downloads: </b>${picture.downloads}
            </p>
        </div>
    </div>
    </a>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', HTML);

  lightbox.refresh();
}

async function onLoadMore() {
  loadMoreButton.hide();

  const pictures = await galleryService.getPictures();

  showGallery(pictures);

  loadMoreButton.show();
}

function clearGallery() {
  gallery.innerHTML = '';
}

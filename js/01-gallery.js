import { galleryItems } from "./gallery-items.js";

// Change code below this line

const gallery = document.querySelector(".gallery");

function createListItemMarkup(array) {
  return array
    .map((elem) => {
      const { preview, original, description } = elem;
      return `<div class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</div>`;
    })
    .join("");
}

function insertListItems(items) {
  gallery.insertAdjacentHTML("beforeend", items);
}

const listItemMarkup = createListItemMarkup(galleryItems);
insertListItems(listItemMarkup);

gallery.addEventListener("click", openModal);

let instance;

function lightboxInstance(e) {
  return basicLightbox.create(`
    <div class="modal">
    <img src=${e.target.dataset.source} width="1079" height="718">
    </div>
`);
}

function openModal(e) {
  e.preventDefault();

  if (e.target.nodeName === "DIV") {
    return;
  }

  instance = lightboxInstance(e);
  instance.show();
  window.addEventListener("keydown", keyDown);
}

function keyDown(e) {
  if (e.code === "Escape") closeModal(e);
}

function closeModal(e) {
  instance.close();
  window.removeEventListener("keydown", keyDown);
}

// Массив с именами файлов (замените на свои)
const photos = [
  'photo-3.jpg',
  'photo-4.jpg',
  'photo-251.jpg'
];

const gallery = document.getElementById('photo-gallery');

// Показываем фото из папки images
photos.forEach(photo => {
  gallery.innerHTML += `
    <div class="col-md-4 mb-4">
      <img src="images/${photo}" 
           alt="Фото Коврова" 
           class="img-fluid rounded"
           loading="lazy">
    </div>
  `;
});

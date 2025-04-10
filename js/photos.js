document.addEventListener('DOMContentLoaded', async () => {
  const gallery = document.getElementById('photo-gallery');
  gallery.innerHTML = '<p class="text-center">Идёт загрузка галереи...</p>';

  // Ваш диапазон номеров фото
  const photoNumbers = Array.from({length: 251}, (_, i) => i + 3); // 3-253
  
  // Проверяем каждое фото
  const existingPhotos = [];
  
  for (const num of photoNumbers) {
    const imgUrl = `images/photo-${num}.jpg`;
    
    try {
      // Проверяем существование файла
      const exists = await checkFileExists(imgUrl);
      if (exists) {
        existingPhotos.push(imgUrl);
      }
    } catch (error) {
      console.warn(`Ошибка проверки файла ${imgUrl}:`, error);
    }
  }

  // Отображаем только существующие фото
  if (existingPhotos.length > 0) {
    gallery.innerHTML = existingPhotos.map(url => `
      <div class="col-md-4 mb-4">
        <img src="${url}" 
             class="img-fluid rounded shadow-sm"
             loading="lazy">
      </div>
    `).join('');
  } else {
    gallery.innerHTML = '<p class="text-center text-danger">Фотографии не найдены</p>';
  }

  // Функция проверки существования файла
  async function checkFileExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
});

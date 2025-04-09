document.addEventListener('DOMContentLoaded', () => {
  const supabaseUrl = 'https://ВАШ_PROJECT_ID.supabase.co';
  const supabaseKey = 'ВАШ_ANON_KEY';
  const supabase = supabase.createClient(supabaseUrl, supabaseKey);
  const gallery = document.getElementById('photo-gallery');

  // Превью загрузки
  gallery.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary" role="status"></div></div>';

  // Загрузка фото
  async function loadPhotos() {
    try {
      const { data: files, error } = await supabase
        .storage
        .from('kovrov-photos')
        .list('', { limit: 100, sortBy: { column: 'name', order: 'asc' } }); // Сортировка по имени

      if (error) throw error;
      if (files.length === 0) {
        gallery.innerHTML = '<div class="col-12 text-center"><p>Фотографии скоро добавятся!</p></div>';
        return;
      }

      gallery.innerHTML = ''; // Очищаем прелоадер
      files.forEach(file => {
        if (!file.name) return; // Игнорируем пустые имена
        const photoUrl = `${supabaseUrl}/storage/v1/object/public/kovrov-photos/${file.name}`;
        gallery.innerHTML += `
          <div class="col-md-4 mb-4">
            <img src="${photoUrl}" 
                 alt="Достопримечательность Коврова" 
                 class="img-fluid rounded shadow-sm" 
                 loading="lazy"
                 onerror="this.src='https://placehold.co/600x400?text=Ошибка+загрузки'">
          </div>
        `;
      });
    } catch (err) {
      gallery.innerHTML = `
        <div class="col-12 alert alert-danger">
          Ошибка загрузки галереи. Пожалуйста, обновите страницу или проверьте интернет.
        </div>
      `;
      console.error('Supabase error:', err);
    }
  }

  loadPhotos();
});

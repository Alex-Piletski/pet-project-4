document.addEventListener('DOMContentLoaded', () => {
  const supabaseUrl = 'https://wrbihsfyjmxtffkfugxb.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyYmloc2Z5am14dGZma2Z1Z3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjQ2NTUsImV4cCI6MjA1ODY0MDY1NX0.XIAqNZyH0-rehgEIPyGB2Icm7HPMcut-bANd1AX5c8U';
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

// Твои данные из Supabase (найти тут: https://app.supabase.com/project/_/settings/api)
const supabaseUrl = 'https://wrbihsfyjmxtffkfugxb.supabase.co'; // Замени XXXXX на свой ID
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyYmloc2Z5am14dGZma2Z1Z3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjQ2NTUsImV4cCI6MjA1ODY0MDY1NX0.XIAqNZyH0-rehgEIPyGB2Icm7HPMcut-bANd1AX5c8U'; // Замени на свой длинный ключ (начинается с eyJ)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function loadPhotos() {
  // 1. Пытаемся загрузить список фото
  const { data: files, error } = await supabase
    .storage
    .from('kovrov-photos')
    .list();

  // 2. Если ошибка — покажем в консоли
  if (error) {
    console.error('Ошибка загрузки:', error);
    return;
  }

  // 3. Выводим список файлов в консоль (для проверки)
  console.log('Файлы в Supabase:', files);

  // 4. Показываем фото на странице
  const gallery = document.getElementById('photo-gallery');
  gallery.innerHTML = ''; // Очищаем старые фото

  files.forEach(file => {
    const photoUrl = `${supabaseUrl}/storage/v1/object/public/kovrov-photos/photo-100.jpg
}`;
    gallery.innerHTML += `
      <div class="col-md-4 mb-4">
        <img src="${photoUrl}" 
             alt="Фото Коврова" 
             class="img-fluid rounded" 
             loading="lazy">
      </div>
    `;
  });
}

// Запускаем загрузку
loadPhotos();

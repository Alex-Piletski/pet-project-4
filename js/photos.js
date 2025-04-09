// Настройка Supabase
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Получение списка фото из Supabase
async function loadPhotos() {
  const { data: files, error } = await supabase
    .storage
    .from('kovrov-photos')
    .list(''); // Папка в хранилище (если есть)

  if (error) {
    console.error('Ошибка загрузки:', error);
    return;
  }

  const gallery = document.getElementById('photo-gallery');
  files.forEach(file => {
    const photoUrl = `${supabaseUrl}/storage/v1/object/public/kovrov-photos/${file.name}`;
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

loadPhotos();

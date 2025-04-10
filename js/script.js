const gallery = document.getElementById('gallery');
const missingPhotos = [4];
const start = 3;
const end = 251;

for (let i = start; i <= end; i++) {
  if (missingPhotos.includes(i)) continue;
  const img = document.createElement('img');
  img.src = `images/photo-${i}.jpg`;
  img.alt = `Photo ${i}`;
  img.loading = 'lazy';
  gallery.appendChild(img);
}


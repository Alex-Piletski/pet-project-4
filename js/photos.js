const photos = [
    { url: "images/photos/photo-1.jpg", title: "Фото 1", description: "Описание 1" },
    { url: "images/photos/photo-2.jpg", title: "Фото 2", description: "Описание 2" },
    { url: "images/photos/photo-3.jpg", title: "Фото 3", description: "Описание 3" }
];

function renderPhotos() {
    let gallery = document.getElementById("photo-gallery");
    let modalsContainer = document.getElementById("modals-container");
    
    photos.forEach((photo, index) => {
        gallery.innerHTML += `
            <div class="col-md-4">
                <a href="#" data-bs-toggle="modal" data-bs-target="#modal-${index}">
                    <img src="${photo.url}" class="img-fluid" alt="${photo.title}">
                </a>
            </div>
        `;
        
        modalsContainer.innerHTML += `
            <div class="modal fade" id="modal-${index}" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${photo.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${photo.url}" class="img-fluid">
                            <p>${photo.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

window.onload = renderPhotos;

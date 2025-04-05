document.addEventListener("DOMContentLoaded", function () {
  // Ambil elemen tombol dan body
  const modeToggle = document.getElementById("modeToggle");
  const body = document.body;
  const modeIcon = modeToggle?.querySelector("i");

  // Cek apakah pengguna pernah mengaktifkan mode malam sebelumnya
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
    modeIcon?.classList.replace("fa-moon", "fa-sun"); // Ganti ikon ke matahari
  }

  // Fungsi untuk mengganti mode malam
  modeToggle?.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    const isDarkMode = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
    modeIcon?.classList.replace(isDarkMode ? "fa-moon" : "fa-sun", isDarkMode ? "fa-sun" : "fa-moon");
  });

  // Ambil elemen-elemen yang diperlukan untuk slideshow dan popup
  const slideshowImage = document.getElementById("slideshow-image");
  const imagePopup = document.getElementById("imagePopup");
  const popupImage = document.getElementById("popup-image");
  const popupText = document.getElementById("popup-text");
  const closePopup = document.getElementById("closePopup");

  // Pastikan semua elemen ada sebelum menjalankan skrip
  if (!slideshowImage || !imagePopup || !popupImage || !popupText || !closePopup) {
    console.warn("Elemen slideshow atau popup tidak ditemukan.");
    return;
  }

  // Daftar gambar dan deskripsi
  const images = [
    { src: "images/media_slide/desc_img1.jpg", text: "Pemandangan dari tempat awal perjalanan server KG Survival S1 - Phase 1" },
    { src: "images/media_slide/desc_img2.jpg", text: "Momen member sedang bermain dengan para Helpers" },
    { src: "images/media_slide/desc_img3.jpg", text: "Bangunan dengan nuansa desert yang kental yang di bangun member kami." },
    { src: "images/media_slide/desc_img4.jpg", text: "Potret kebersamaan untuk melepas Season 1 - Phase 1" },
    { src: "images/media_slide/desc_img5.jpg", text: "Potret Member kami yang sedang menaklukan Camber" }
  ];

  let currentImageIndex = 0;

  // Fungsi untuk mengganti gambar otomatis setiap 5 detik
  function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slideshowImage.src = images[currentImageIndex].src;
    slideshowImage.alt = images[currentImageIndex].text;
  }

  // Jalankan slideshow otomatis
  setInterval(changeImage, 5000);

  // Klik gambar untuk membuka popup
  slideshowImage.addEventListener("click", function () {
    popupImage.src = images[currentImageIndex].src;
    popupText.textContent = images[currentImageIndex].text;
    imagePopup.style.display = "flex";
  });

  // Tutup popup
  closePopup.addEventListener("click", function () {
    imagePopup.style.display = "none";
  });

  // Tutup popup jika klik di luar kontennya
  imagePopup.addEventListener("click", function (event) {
    if (event.target === imagePopup) {
      imagePopup.style.display = "none";
    }
  });

  const imageContainer = document.querySelector(".image-container");
  let startX, endX;

  // Event listener untuk geser kiri/kanan
  imageContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  imageContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) { // Geser kiri
      changeImage(1);
    } else if (endX - startX > 50) { // Geser kanan
      changeImage(-1);
    }
  });
});
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

  if (window.location.pathname === '/index.html') {
  
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
  function changeImage(direction = 1) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
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
  }
  
  // Ambil elemen-elemen yang dibutuhkan
  const navToggle = document.getElementById("navToggle");
  const popupNav = document.getElementById("popupNav");
  const closeNavPopup = document.getElementById("closeNavPopup");

  // Pastikan elemen-elemen ada
  if (!navToggle || !popupNav || !closeNavPopup) {
    console.warn("Elemen-elemen popup atau tombol tidak ditemukan.");
    return;
  }

  // Tampilkan popup saat tombol nav-toggle ditekan
  navToggle.addEventListener("click", function () {
    popupNav.classList.toggle("show"); // Menambahkan kelas 'show' untuk animasi
  });

  // Tutup popup saat tombol close ditekan
  closeNavPopup.addEventListener("click", function () {
    popupNav.classList.remove("show"); // Menghapus kelas 'show' untuk menutup popup
  });

  // Tutup popup jika klik di luar konten popup
  popupNav.addEventListener("click", function (event) {
    if (event.target === popupNav) {
      popupNav.classList.remove("show"); // Menutup popup jika klik di luar area konten
    }
  });


  const portalButton = document.querySelector('.portal-button');
  
  // Menampilkan tombol setelah scroll ke bawah
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) { // Tampilkan tombol jika scroll lebih dari 300px
      portalButton.classList.add('show');
    } else {
      portalButton.classList.remove('show');
    }
  });

  // Menambahkan animasi saat tombol diklik
  portalButton.addEventListener('click', function () {
    portalButton.classList.add('active'); // Efek animasi saat tombol diklik
    setTimeout(() => {
      portalButton.classList.remove('active');
    }, 500); // Menghilangkan efek animasi setelah setengah detik
    
  // Bagian Arsip
  
  // Animasi pada halaman
  const archiveItems = document.querySelectorAll('.archive-item');

  archiveItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = 1;
      item.style.transform = 'translateY(0)';
      item.style.transition = 'all 0.5s ease-out';
    }, index * 300); // Menambahkan delay pada setiap item arsip
  });
  });
});
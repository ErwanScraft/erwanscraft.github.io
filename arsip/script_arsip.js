document.addEventListener("DOMContentLoaded", function () {

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
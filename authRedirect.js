// Auto-redirect untuk mengarahkan user jika sudah login atau belum login
// Simpan sebagai "authRedirect.js" dan panggil di login.html, register.html, index.html

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKfD9QPDvnOUY1njAZDCBlCxlLmWxw0Es",
  authDomain: "kg-survival.firebaseapp.com",
  projectId: "kg-survival",
  storageBucket: "kg-survival.firebasestorage.app",
  messagingSenderId: "470101917324",
  appId: "1:470101917324:web:a614be3e6ea7e1d3f685a9",
  measurementId: "G-WRMPSDPK7L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const isHome = window.location.pathname.includes("index") || window.location.pathname === "/";
const isLoginOrRegister = window.location.pathname.includes("login") || window.location.pathname.includes("register");

onAuthStateChanged(auth, async (user) => {
  const navRight = document.querySelector(".nav-right");
  if (user) {
    if (isLoginOrRegister) {
      window.location.href = "account.html"; // Arahkan ke halaman profil
    }

    // Jika sudah login di halaman utama (index.html)
    if (isHome && navRight) {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const data = snap.exists() ? snap.data() : null;

        if (data?.gametag) {
          navRight.innerHTML = `<a href="register/account.html"><button class="login-btn">${data.gametag}</button></a>`;
        }
      } catch (e) {
        console.error("Gagal mengambil gametag:", e);
      }
    }
  } else {
    // Jika belum login di halaman utama
    if (navRight) {
      navRight.innerHTML = `<a href="register/login.html"><button class="login-btn">Login</button></a>`;
    }
  }
});
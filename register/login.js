import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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

const form = document.getElementById("loginForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login berhasil!");
      window.location.href = "account.html"; // nanti menuju profil user
    })
    .catch((error) => {
      alert("Login gagal: " + error.message);
    });
});
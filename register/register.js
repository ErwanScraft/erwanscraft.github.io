import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

const form = document.getElementById("registerForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const gametag = document.getElementById("gametag").value;
  const whatsapp = document.getElementById("whatsapp").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      gametag,
      whatsapp,
      createdAt: new Date()
    });

    alert("Pendaftaran berhasil!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Gagal daftar: " + error.message);
  }
});
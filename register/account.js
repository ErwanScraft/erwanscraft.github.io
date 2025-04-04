import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc
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

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // Tampilkan email
  document.getElementById("userEmail").textContent = user.email;
  document.getElementById("emailVerified").textContent = user.emailVerified ? "Terverifikasi" : "Belum";

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("gametag").value = data.gametag || "";
    document.getElementById("whatsapp").value = data.whatsapp || "";
  }

  // Update data
  document.getElementById("updateBtn").addEventListener("click", async () => {
    const gametag = document.getElementById("gametag").value;
    const whatsapp = document.getElementById("whatsapp").value;

    try {
      await setDoc(doc(db, "users", user.uid), {
        gametag,
        whatsapp,
        email: user.email,
        updatedAt: new Date()
      });
      alert("Data berhasil diperbarui.");
    } catch (err) {
      alert("Gagal memperbarui: " + err.message);
    }
  });

  // Hapus akun
  document.getElementById("deleteBtn").addEventListener("click", async () => {
    if (confirm("Yakin ingin menghapus akun? Ini tidak bisa dibatalkan!")) {
      try {
        await deleteDoc(doc(db, "users", user.uid));
        await deleteUser(user);
        alert("Akun berhasil dihapus.");
        window.location.href = "register.html";
      } catch (err) {
        alert("Gagal menghapus akun: " + err.message);
      }
    }
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
      alert("Logout berhasil.");
      window.location.href = "login.html";
    });
  });

  // Verifikasi email
  document.getElementById("verifyEmailBtn").addEventListener("click", () => {
    if (!user.emailVerified) {
      sendEmailVerification(user)
        .then(() => alert("Email verifikasi telah dikirim."))
        .catch(err => alert("Gagal kirim verifikasi: " + err.message));
    } else {
      alert("Email sudah diverifikasi.");
    }
  });

  // Reset password
  document.getElementById("resetPasswordBtn").addEventListener("click", () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => alert("Link reset password telah dikirim ke email."))
      .catch(err => alert("Gagal kirim reset password: " + err.message));
  });
});
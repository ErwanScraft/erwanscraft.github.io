async function fetchPlayerOnline() {
    try {
        let response = await fetch('https://api.mcsrvstat.us/bedrock/3/gpnode2.mhsshopid.my.id:19135');
        let data = await response.json();
        let playerCount = data.players.online;
        
        let playerElement = document.getElementById('player-online');
        playerElement.style.opacity = "0";
        
        setTimeout(() => {
            playerElement.innerText = `Player Online: ${playerCount}`;
            playerElement.style.opacity = "1";
        }, 300);
        
    } catch (error) {
        document.getElementById('player-online').innerText = "Gagal memuat data pemain";
    }
}

fetchPlayerOnline();

function toggleNavbar() {
    let navbar = document.getElementById("navbar");
    let menuIcon = document.getElementById("menu");

    navbar.classList.toggle("show");
    menuIcon.classList.toggle("active");
}
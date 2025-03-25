document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const occupation = document.getElementById("occupation").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const arrivalTime = new Date().toLocaleTimeString();

    if (!name || !phone || !occupation || !gender) {
        alert("Please fill out all fields!");
        return;
    }

    const message = `*𝓑𝓤𝓝𝓖𝓞𝓜𝓐 𝓣𝓞𝓦𝓝𝓢𝓗𝓘𝓟 𝓐𝓛𝓣𝓔𝓡*\n📌 *𝙉𝙚𝙬 𝙈𝙚𝙢𝙗𝙚𝙧 𝙝𝙖𝙨 𝙍𝙚𝙜𝙞𝙨𝙩𝙚𝙧𝙚𝙙 𝙝𝙚𝙧𝙚 𝙖𝙧𝙚 𝙩𝙝𝙚 𝙙𝙚𝙩𝙖𝙞𝙡𝙨* 📌\n👤 *𝗡𝗮𝗺𝗲:* ${name}\n📞 *𝗣𝗵𝗼𝗻𝗲:* ${phone}\n💼 *𝗢𝗰𝗰𝘂𝗽𝗮𝘁𝗶𝗼𝗻:* ${occupation}\n⚧ *𝗚𝗲𝗻𝗱𝗲𝗿:* ${gender}\n⚧ **\n⏳ *Arrival Time:* ${arrivalTime}`;

    fetch(`https://api.telegram.org/bot7570539056:AAE8nG4JHQLoffMRPTY71l3ltBE8292bhFY/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: "5063829177", text: message, parse_mode: "Markdown" })
    });

    document.getElementById("registrationForm").reset();

    // Store recent registrations
    addToHistory(name, arrivalTime);
});

// Toggle About Us Modal
document.getElementById("aboutBtn").addEventListener("click", function() {
    document.getElementById("aboutModal").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("aboutModal").style.display = "none";
});

// Store last 5 registrations
function addToHistory(name, time) {
    const historyList = document.getElementById("historyList");
    const entry = document.createElement("li");
    entry.textContent = `👤 ${name} - 🕒 ${time}`;
    historyList.prepend(entry);

    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

// Dark/Light Mode Toggle
document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("light-mode");
    this.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// Play/Pause Background Music
document.getElementById("playMusic").addEventListener("click", function() {
    const music = document.getElementById("backgroundMusic");
    if (music.paused) {
        music.play();
        this.textContent = "🔇";
    } else {
        music.pause();
        this.textContent = "🎵";
    }
});

// Get User Location
document.getElementById("getLocation").addEventListener("click", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            alert(`📍 Location: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});
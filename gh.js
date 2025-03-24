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

    const message = `📌 *New Member Registered* 📌\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💼 *Occupation:* ${occupation}\n⚧ *Gender:* ${gender}\n⏳ *Arrival Time:* ${arrivalTime}`;

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







document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const occupation = document.getElementById("occupation").value;
    const gender = document.getElementById("gender").value;
    const arrivalTime = new Date().toLocaleTimeString();

    const message = `📌 *New Member Registered* 📌\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `💼 *Occupation:* ${occupation}\n` +
        `⚧ *Gender:* ${gender}\n` +
        `⏳ *Arrival Time:* ${arrivalTime}`;

    const botToken = "7570539056:AAE8nG4JHQLoffMRPTY71l3ltBE8292bhFY";
    const chatId = "5063829177";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const data = {
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown"
    };

    fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            document.getElementById("responseMessage").innerText = "✅ Registration successful!";
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("responseMessage").innerText = "❌ Something went wrong!";
        });

    document.getElementById("registrationForm").reset();
});
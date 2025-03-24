document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const occupation = document.getElementById("occupation").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const Whatsapp = document.getElementById("Whatsapp").value.trim();
    const arrivalTime = new Date().toLocaleTimeString();

    if (!name || !phone || !occupation || !gender) {
        alert("Please fill out all fields!");
        return;
    }

    const message = `📌 *New Member Registered* 📌\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💼 *Occupation:* ${occupation}\n⚧ *Gender:* ${gender}\n🐰 *Whatsapp:* ${Whatsapp}\n⏳ *Arrival Time:* ${arrivalTime}`;

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
// API Endpoint
const API_URL = "https://bookclubfinderapi.azurewebsites.net/api/waitlist/signup";

// Function to show/hide loading spinner inside button
function toggleButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = `<span class="spinner"></span> Sending...`;
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText;
    }
}

// Handle Waitlist Signup (Email Only)
document.getElementById("waitlistForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("waitlistEmail").value.trim();
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    const button = event.target.querySelector("button");
    button.dataset.originalText = button.innerHTML;
    toggleButtonLoading(button, true);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        alert(data.message || "You're on the waitlist! Check your email.");
        document.getElementById("waitlistEmail").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert("Error connecting to server. Please try again later.");
    } finally {
        toggleButtonLoading(button, false);
    }
});

// Handle Beta Tester Signup (Full Form)
document.getElementById("betaTesterForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("betaEmail").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    const button = event.target.querySelector("button");
    button.dataset.originalText = button.innerHTML;
    toggleButtonLoading(button, true);

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, message }),
        });

        const data = await response.json();
        alert(data.message || "Thank you for applying as a beta tester!");
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("betaEmail").value = "";
        document.getElementById("message").value = "";
    } catch (error) {
        console.error("Error:", error);
        alert("Error connecting to server. Please try again later.");
    } finally {
        toggleButtonLoading(button, false);
    }
});

// Toggle Beta Tester Form Visibility and Change Text
document.getElementById("betaTrigger").addEventListener("click", function () {
    const betaForm = document.getElementById("betaTesterForm");
    const waitlistForm = document.getElementById("waitlistForm");
    const betaTrigger = document.getElementById("betaTrigger");

    if (betaForm.classList.contains("hidden")) {
        // Show beta form, hide waitlist form
        betaForm.classList.remove("hidden");
        waitlistForm.classList.add("hidden");

        // Transfer email if available
        const topEmail = document.getElementById("waitlistEmail").value.trim();
        if (topEmail) {
            document.getElementById("betaEmail").value = topEmail;
        }

        // Change button text
        betaTrigger.textContent = "Nevermind, just sign up for waitlist";
    } else {
        // Hide beta form, show waitlist form
        betaForm.classList.add("hidden");
        waitlistForm.classList.remove("hidden");

        // Reset button text
        betaTrigger.textContent = "Beta testing opportunities available";
    }
});



// Preload theme images
const themeImages = [
    "bookish.jpg",
    "moon.jpg",
    "cactus.jpg"
];

const preloadImages = () => {
    themeImages.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
    });
};

// Run preload function when the page loads
window.addEventListener("load", preloadImages);


// Change Background Image
function changeBackground(theme) {
    const background = document.getElementById("background");

    if (theme === 'bookish') {
        background.style.backgroundImage = "url('bookish.jpg')";
    } else if (theme === 'moon') {
        background.style.backgroundImage = "url('moon.jpg')";
    } else if (theme === 'cactus') {
        background.style.backgroundImage = "url('cactus.jpg')";
    }
}
// List of book-related sayings
const bookSayings = [
    "who turn the page.",
    "who get lost in a story.",
    "who read between the lines.",
    "who write their own endings.",
    "who embrace every chapter.",
    "who escape into books.",
    "who find adventure in words.",
    "who never stop learning.",
    "who love a good plot twist.",
    "who savor every spicy scene.",
    "who laugh at every footnote.",
    "who believe in happily ever after.",
    "who fight for their own epic tale.",
    "who chase dragons and dreams.",
    "who swoon over fictional lovers.",
    "who turn heartbreak into poetry.",
    "who wield words like swords.",
    "who let books set their souls on fire.",
    "who rewrite the rules of reality.",
    "who keep their TBR piles dangerously high.",
    "who flirt with fiction and fall in love with prose.",
    "who live for late-night reading marathons.",
    "who know the best stories are worth the wait.",
    "who find magic in every margin.",
    "who take life one chapter at a time."
];


let sayingIndex = 0;
const bookSayingElement = document.getElementById("bookSaying");

// Function to smoothly transition between book sayings
bookSayingElement.addEventListener("click", function () {
    this.style.opacity = "0"; // Fade out

    setTimeout(() => {
        sayingIndex = (sayingIndex + 1) % bookSayings.length; // Cycle through list
        this.textContent = bookSayings[sayingIndex]; // Update text
        this.style.opacity = "1"; // Fade in
    }, 400); // Delay matches CSS transition duration (0.4s)
});

// API Endpoint
const API_URL = "https://bookclubfinderapi.azurewebsites.net/api/waitlist/signup";

// Handle Waitlist Signup (Email Only)
document.getElementById("waitlistForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    const requestData = { email, firstName, lastName, message };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message || "You're on the waitlist! Check your email.");
            document.getElementById("email").value = ""; // Clear input
        } else {
            alert(data.message || "Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error connecting to server. Please try again later.");
    }
});

// Handle Beta Tester Signup (Full Form)
document.getElementById("betaTesterForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    const requestData = {
        firstName: firstName || null,
        lastName: lastName || null,
        email: email,
        message: message || null
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message || "Thank you for applying as a beta tester!");
            document.getElementById("firstName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
        } else {
            alert(data.message || "Something went wrong. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error connecting to server. Please try again later.");
    }
});

// Toggle Beta Tester Form Visibility
document.getElementById("betaTrigger").addEventListener("click", function () {
    document.getElementById("betaTesterForm").classList.toggle("hidden");
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

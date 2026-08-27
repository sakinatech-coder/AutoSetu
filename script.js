let selectedService = "Bike";
let selectedPrice = 8;

let rides = JSON.parse(localStorage.getItem("autosetuRides")) || [];


// SERVICE SELECTION

function selectService(service, price) {

    selectedService = service;
    selectedPrice = price;

    document.querySelectorAll(".service-card").forEach(card => {
        card.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    document.getElementById("selectedTitle").innerText =
        service + " Booking";

    document.getElementById("selectedText").innerText =
        "Book a nearby " + service.toLowerCase() +
        " quickly and safely with AutoSetu.";

    calculateFare();
}


// FARE CALCULATION

function calculateFare() {

    let pickup = document.getElementById("pickup").value;
    let destination = document.getElementById("destination").value;

    let distance = 10;

    if (pickup && destination) {
        distance = Math.floor(Math.random() * 12) + 3;
    }

    let fare = Math.round(selectedPrice * distance);

    if (selectedService === "Stay") {
        fare = selectedPrice;
    }

    document.getElementById("fare").innerText = "₹" + fare;

    return fare;
}


// SEARCH RIDE

function searchRide() {

    let pickup = document.getElementById("pickup").value.trim();
    let destination = document.getElementById("destination").value.trim();

    if (!pickup || !destination) {
        alert("Please enter pickup and destination.");
        return;
    }

    calculateFare();

    document.getElementById("selectedTitle").scrollIntoView({
        behavior: "smooth"
    });

    alert(
        selectedService +
        " rides available!\nEstimated fare: " +
        document.getElementById("fare").innerText
    );
}


// BOOK RIDE

function bookRide() {

    let pickup = document.getElementById("pickup").value.trim();
    let destination = document.getElementById("destination").value.trim();

    if (!pickup || !destination) {
        alert("Please enter pickup and destination first.");
        return;
    }

    let fare = calculateFare();

    let ride = {
        service: selectedService,
        pickup: pickup,
        destination: destination,
        fare: fare,
        date: new Date().toLocaleString()
    };

    rides.unshift(ride);

    localStorage.setItem(
        "autosetuRides",
        JSON.stringify(rides)
    );

    document.getElementById("bookingMessage").innerText =
        "Your " + selectedService +
        " booking from " + pickup +
        " to " + destination +
        " is being matched with a nearby driver.";

    document.getElementById("bookingModal").classList.add("show");

    displayHistory();
}


// HISTORY

function displayHistory() {

    let history = document.getElementById("historyList");

    if (rides.length === 0) {
        history.innerHTML =
            '<p class="empty">No rides booked yet.</p>';
        return;
    }

    history.innerHTML = "";

    rides.forEach((ride, index) => {

        let div = document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
            <div>
                <strong>${ride.service}</strong>
                <p>${ride.pickup} → ${ride.destination}</p>
                <small>${ride.date}</small>
            </div>

            <strong>₹${ride.fare}</strong>
        `;

        history.appendChild(div);
    });
}


// GPS LOCATION

function getLocation() {

    if (!navigator.geolocation) {
        alert("GPS is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            document.getElementById("pickup").value =
                "Current Location (" +
                lat.toFixed(4) +
                ", " +
                lon.toFixed(4) +
                ")";

        },

        function() {
            alert("Location permission was denied.");
        }

    );
}


// ===============================
// AUTOSETU - FINAL JAVASCRIPT
// ===============================

let selectedService = "Bike";
let selectedPrice = 8;

let rides = JSON.parse(localStorage.getItem("autosetuRides")) || [];


// ===============================
// SERVICE SELECTION
// ===============================

function selectService(service, price) {

    selectedService = service;
    selectedPrice = price;

    // Remove active from all cards
    document.querySelectorAll(".service-card").forEach(function(card) {
        card.classList.remove("active");
    });

    // Find clicked card and make active
    const cards = document.querySelectorAll(".service-card");

    cards.forEach(function(card) {
        const title = card.querySelector("h3");

        if (title && title.innerText === service) {
            card.classList.add("active");
        }
    });

    document.getElementById("selectedTitle").innerText =
        service + " Booking";

    document.getElementById("selectedText").innerText =
        "Book a nearby " +
        service.toLowerCase() +
        " quickly and safely with AutoSetu.";

    calculateFare();

    // Scroll to booking section
    document.querySelector(".ride-section").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// FARE CALCULATION
// ===============================

function calculateFare() {

    let pickup =
        document.getElementById("pickup").value.trim();

    let destination =
        document.getElementById("destination").value.trim();

    let distance = 10;

    if (pickup && destination) {

        // Demo distance calculation
        distance = Math.floor(Math.random() * 10) + 3;
    }

    let fare = selectedPrice * distance;

    // Stay uses fixed starting price
    if (selectedService === "Stay") {
        fare = selectedPrice;
    }

    document.getElementById("fare").innerText =
        "₹" + fare;

    return fare;
}


// ===============================
// SEARCH RIDES
// ===============================

function searchRide() {

    const pickup =
        document.getElementById("pickup").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    if (pickup === "") {
        alert("Please enter pickup location.");
        document.getElementById("pickup").focus();
        return;
    }

    if (destination === "") {
        alert("Please enter destination.");
        document.getElementById("destination").focus();
        return;
    }

    const fare = calculateFare();

    alert(
        "🚕 AutoSetu Rides Found!\n\n" +
        "Service: " + selectedService + "\n" +
        "From: " + pickup + "\n" +
        "To: " + destination + "\n" +
        "Estimated Fare: ₹" + fare
    );

    document.querySelector(".ride-section").scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// BOOK RIDE
// ===============================

function bookRide() {

    const pickup =
        document.getElementById("pickup").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    if (pickup === "") {
        alert("Please enter pickup location first.");
        return;
    }

    if (destination === "") {
        alert("Please enter destination first.");
        return;
    }

    const fare = calculateFare();

    const ride = {
        service: selectedService,
        pickup: pickup,
        destination: destination,
        fare: fare,
        date: new Date().toLocaleString()
    };

    rides.unshift(ride);

    localStorage.setItem(
        "autosetuRides",
        JSON.stringify(rides)
    );

    document.getElementById("bookingMessage").innerText =
        "Your " +
        selectedService +
        " from " +
        pickup +
        " to " +
        destination +
        " is being matched with a nearby driver.";

    document
        .getElementById("bookingModal")
        .classList.add("show");

    displayHistory();
}


// ===============================
// RIDE HISTORY
// ===============================

function displayHistory() {

    const history =
        document.getElementById("historyList");

    if (rides.length === 0) {

        history.innerHTML =
            '<p class="empty">No rides booked yet.</p>';

        return;
    }

    history.innerHTML = "";

    rides.forEach(function(ride) {

        const div =
            document.createElement("div");

        div.className = "history-item";

        div.innerHTML = `
            <div>
                <strong>${ride.service}</strong>
                <p>${ride.pickup} → ${ride.destination}</p>
                <small>${ride.date}</small>
            </div>

            <strong>₹${ride.fare}</strong>
        `;

        history.appendChild(div);
    });
}


// ===============================
// GPS LOCATION
// ===============================

function getLocation() {

    if (!navigator.geolocation) {

        alert(
            "GPS is not supported by your browser."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            document.getElementById("pickup").value =
                "Current Location (" +
                latitude.toFixed(5) +
                ", " +
                longitude.toFixed(5) +
                ")";

            alert(
                "📍 Your current location has been detected!"
            );

            calculateFare();
        },

        function(error) {

            if (error.code === 1) {

                alert(
                    "Location permission denied. Please allow location permission."
                );

            } else {

                alert(
                    "Unable to detect your location."
                );
            }
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ===============================
// QUICK LOCATION
// ===============================

function setLocation(location) {

    document.getElementById("pickup").value =
        location;

    calculateFare();

    alert(
        "📍 Pickup set to: " + location
    );
}


// ===============================
// LOGIN MODAL
// ===============================

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");
}


function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");
}


// ===============================
// LOGIN
// ===============================

function login() {

    const phone =
        document.getElementById("phone").value.trim();

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }

    localStorage.setItem(
        "autosetuUser",
        phone
    );

    alert(
        "✅ Login successful!\nWelcome to AutoSetu."
    );

    closeLogin();
}


// ===============================
// BOOKING MODAL
// ===============================

function closeBooking() {

    document
        .getElementById("bookingModal")
        .classList.remove("show");
}


// ===============================
// OFFERS
// ===============================

function showOffer(code) {

    alert(
        "🎁 AutoSetu Offer\n\n" +
        "Offer Code: " +
        code +
        "\n\nOffer saved successfully!"
    );
}


// ===============================
// SOS
// ===============================

function sos() {

    const confirmSOS =
        confirm(
            "🆘 EMERGENCY SOS\n\n" +
            "Are you sure you want to activate emergency assistance?"
        );

    if (confirmSOS) {

        alert(
            "🚨 SOS ACTIVATED!\n\n" +
            "In the real AutoSetu application, " +
            "your emergency contacts and support team " +
            "would be notified."
        );
    }
}


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("show");
}


// ===============================
// HERO BOOK BUTTON
// ===============================

function scrollToServices() {

    document
        .getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ===============================

window.addEventListener("click", function(event) {

    const loginModal =
        document.getElementById("loginModal");

    const bookingModal =
        document.getElementById("bookingModal");

    if (event.target === loginModal) {
        closeLogin();
    }

    if (event.target === bookingModal) {
        closeBooking();
    }
});


// ===============================
// ESC KEY CLOSE
// ===============================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeLogin();
            closeBooking();
        }
    }
);


// ===============================
// INPUT EVENTS
// ===============================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayHistory();

        const pickup =
            document.getElementById("pickup");

        const destination =
            document.getElementById("destination");

        pickup.addEventListener(
            "input",
            calculateFare
        );

        destination.addEventListener(
            "input",
            calculateFare
        );

        // Default fare
        calculateFare();

    }
);

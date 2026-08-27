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


// QUICK LOCATION

function setLocation(location) {

    document.getElementById("pickup").value = location;

}


// LOGIN

function openLogin() {

    document.getElementById("loginModal")
        .classList.add("show");

}


function closeLogin() {

    document.getElementById("loginModal")
        .classList.remove("show");

}


function login() {

    let phone =
        document.getElementById("phone").value.trim();

    if (phone.length < 10) {
        alert("Please enter a valid mobile number.");
        return;
    }

    localStorage.setItem("autosetuUser", phone);

    alert("Login successful!");

    closeLogin();

}


// BOOKING CLOSE

function closeBooking() {

    document.getElementById("bookingModal")
        .classList.remove("show");

}


// OFFERS

function showOffer(code) {

    alert(
        "Offer Code: " + code +
        "\nApply this code during booking."
    );

}


// SOS

function sos() {

    let confirmSOS =
        confirm(
            "Emergency SOS\n\nAre you sure you want to activate emergency assistance?"
        );

    if (confirmSOS) {

        alert(
            "SOS activated.\nEmergency contacts would be notified in the real application."
        );

    }

}


// MOBILE MENU

function toggleMenu() {

    document.getElementById("navMenu")
        .classList.toggle("show");

}


// SCROLL

function scrollToServices() {

    document.getElementById("services")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// PAGE LOAD

document.addEventListener("DOMContentLoaded", function() {

    displayHistory();

    document.getElementById("pickup")
        .addEventListener("input", calculateFare);

    document.getElementById("destination")
        .addEventListener("input", calculateFare);

});

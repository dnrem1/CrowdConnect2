document.addEventListener('DOMContentLoaded', () => {
    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAKnzediUMKH4-mx2pqtqz-4fJGejX3ilk",
        authDomain: "emerging-tech-finals.firebaseapp.com",
        projectId: "emerging-tech-finals",
        storageBucket: "emerging-tech-finals.appspot.com",
        messagingSenderId: "1083068487578",
        appId: "1:1083068487578:web:f415f95b999aac1b03cc23"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Function to generate a random 6-digit ID
    function generateUserID() {
        return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
    }

    // Function to handle user registration
    function registerUser() {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validate input fields
        if (!username || !email || !password) {
            alert("All fields are required.");
            return;
        }

        // Generate a random 6-digit ID
        const userID = generateUserID();

        // Register user in Firestore
        db.collection("accounts").doc(email.toString()).set({
            accountUsername: username,
            email: email,
            accountPassword: password,
            ID: userID,
            isAdmin: false
        })
        .then(() => {
            console.log("User registered successfully with ID:", userID);
            alert("User registered successfully!");
            // Redirect to login page or any other page
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Error registering user:", error);
            alert("An error occurred while registering the user. Please try again later.");
        });
    }

    // Attach registration event to the form
    document.getElementById("registration-form").addEventListener("submit", (event) => {
        event.preventDefault();
        registerUser();
    });
});

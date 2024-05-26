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
    const auth = firebase.auth();

    // Function to check if the user is logged in
    function ifOut() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (!isLoggedIn) {
            window.location.href = "index.html";
        }
    }

    // Function to log out the user
    function logOut() {
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "index.html";
    }

    // Function to handle login
    function login() {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        checkCredentials(login, password);
    }

    // Function to check credentials
    function checkCredentials(login, password) {
        console.log("Login:", login);
        console.log("Password:", password);

        db.collection("accounts")
            .doc(login)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const credentials = doc.data();
                    console.log("Credentials:", credentials);

                    if (login === credentials.email && password === credentials.accountPassword) {
                        localStorage.setItem("isLoggedIn", "true");
                        console.log("Login successful");
                        window.location.href = "test.html";
                    } else {
                        document.getElementById("error-message").textContent = "Invalid credentials";
                        console.log("Invalid credentials");
                    }
                } else {
                    document.getElementById("error-message").textContent = "Invalid credentials";
                    console.log("Invalid credentials");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    // Function to change password
    function passwordChange() {
        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("REpassword").value;
        const userRef = db.collection("accounts").doc("accountsCollection");

        db.collection("accounts")
            .doc("accountsCollection")
            .get()
            .then((doc) => {
                const docPassword = doc.data();
                if (oldPassword !== docPassword.accountPassword) {
                    document.getElementById("error-message2").textContent = "Old Password is Incorrect";
                } else if (newPassword !== confirmPassword) {
                    document.getElementById("error-message2").textContent = "Passwords do not match";
                } else {
                    userRef.update({
                        accountPassword: newPassword
                    })
                    .then(() => {
                        console.log("Password changed successfully.");
                        document.getElementById("error-message2").textContent = "Password changed successfully!";
                    })
                    .catch((error) => {
                        console.error("Error changing password:", error);
                    });
                }
            });
    }

    // Attach login event to the form
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();
        login();
    });

    // Expose functions to global scope
    window.ifOut = ifOut;
    window.logOut = logOut;
    window.passwordChange = passwordChange;
});

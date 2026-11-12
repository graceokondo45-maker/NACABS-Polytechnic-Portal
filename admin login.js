
// =====================================
// NACABS POLYTECHNIC ADMIN LOGIN
// =====================================

const adminLoginForm = document.getElementById("adminLoginForm");
const adminMessage = document.getElementById("adminMessage");

if (adminLoginForm) {

    adminLoginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username = document.getElementById("adminUsername").value.trim();

        const password = document.getElementById("adminPassword").value;

        // GET SAVED ADMIN DETAILS

        const savedUsername =
            localStorage.getItem("nacabsAdminUsername") || "admin";

        const savedPassword =
            localStorage.getItem("nacabsAdminPassword") || "admin123";

        // CHECK LOGIN DETAILS

        if (username === savedUsername && password === savedPassword) {

            localStorage.setItem("nacabsAdminLoggedIn", "true");

            adminMessage.style.color = "green";
            adminMessage.textContent = "Login successful!";

            window.location.href = "admin.html";

        } else {

            adminMessage.style.color = "red";

            adminMessage.textContent =
                "Incorrect username or password.";

        }

    });

}

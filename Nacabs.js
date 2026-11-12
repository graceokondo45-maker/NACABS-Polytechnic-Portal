
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Collect the student's details
        const student = {
            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            matric: document.getElementById("matric").value.trim(),
            department: document.getElementById("department").value,
            course: document.getElementById("course").value,
            level: document.getElementById("level").value
        };

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        // Check password length
        if (password.length < 8) {
            message.style.color = "red";
            message.textContent = "Password must be at least 8 characters.";
            return;
        }

        // Confirm both passwords match
        if (password !== confirmPassword) {
            message.style.color = "red";
            message.textContent = "Passwords do not match!";
            return;
        }

        // Save student details in the browser
        localStorage.setItem("nacabsStudent", JSON.stringify(student));

        message.style.color = "green";
        message.textContent = "Registration successful! Your details have been saved.";

        console.log(student);
    });
}

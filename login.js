const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // GET LOGIN DETAILS
        const matric = document.getElementById("matric").value.trim().toUpperCase();
        const password = document.getElementById("password").value;
        const message = document.getElementById("loginMessage");

        // GET ALL REGISTERED STUDENTS
        const students = JSON.parse(
            localStorage.getItem("nacabsStudents")
        ) || [];

        // FIND STUDENT ACCOUNT
        const student = students.find(existingStudent =>
            (existingStudent.matric || "").toUpperCase() === matric
        );

        // CHECK IF ACCOUNT EXISTS
        if (!student) {
            message.style.color = "red";
            message.textContent = "Student account not found. Please register first.";
            return;
        }

        // CHECK ACCOUNT STATUS
        if (student.status === "inactive") {
            message.style.color = "red";
            message.textContent = "Your account has been deactivated. Contact the administrator.";
            return;
        }

        // CHECK PASSWORD
        if (password !== student.password) {
            message.style.color = "red";
            message.textContent = "Incorrect password.";
            return;
        }

        // SAVE CURRENT STUDENT SESSION
        const loggedInStudent = {
            fullname: student.fullname,
            email: student.email,
            matric: student.matric,
            department: student.department,
            course: student.course,
            level: student.level
        };

        localStorage.setItem(
            "nacabsStudent",
            JSON.stringify(loggedInStudent)
        );

        localStorage.setItem("nacabsLoggedIn", "true");

        message.style.color = "green";
        message.textContent = "Login successful! Welcome.";

        // OPEN STUDENT DASHBOARD
        setTimeout(function() {
            window.location.href = "dashboard.html";
        }, 1000);
    });
}
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // COLLECT STUDENT INFORMATION
        const student = {
            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim().toLowerCase(),
            matric: document.getElementById("matric").value.trim().toUpperCase(),
            department: document.getElementById("department").value,
            course: document.getElementById("course").value,
            level: document.getElementById("level").value
        };

        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("message");

        // CHECK PASSWORD LENGTH
        if (password.length < 8) {
            message.style.color = "red";
            message.textContent = "Password must be at least 8 characters.";
            return;
        }

        // CHECK PASSWORD MATCH
        if (password !== confirmPassword) {
            message.style.color = "red";
            message.textContent = "Passwords do not match!";
            return;
        }

        // GET ALL REGISTERED STUDENTS
        let students = JSON.parse(localStorage.getItem("nacabsStudents")) || [];

        // MIGRATE THE OLD SINGLE STUDENT ACCOUNT, IF ONE EXISTS
        const oldStudent = localStorage.getItem("nacabsStudent");
        const oldPassword = localStorage.getItem("nacabsPassword");

        if (students.length === 0 && oldStudent && oldPassword) {
            const previousStudent = JSON.parse(oldStudent);

            students.push({
                ...previousStudent,
                email: (previousStudent.email || "").toLowerCase(),
                matric: (previousStudent.matric || "").toUpperCase(),
                password: oldPassword,
                status: "active"
            });
        }

        // CHECK FOR EXISTING MATRIC NUMBER
        const matricExists = students.some(existingStudent =>
            (existingStudent.matric || "").toUpperCase() === student.matric
        );

        if (matricExists) {
            message.style.color = "red";
            message.textContent = "This matriculation number is already registered.";
            return;
        }

        // CHECK FOR EXISTING EMAIL
        const emailExists = students.some(existingStudent =>
            (existingStudent.email || "").toLowerCase() === student.email
        );

        if (emailExists) {
            message.style.color = "red";
            message.textContent = "This email address is already registered.";
            return;
        }

        // CREATE THE NEW STUDENT ACCOUNT
        const newStudent = {
            ...student,
            password: password,
            status: "active",
            createdAt: new Date().toISOString()
        };

        // ADD NEW STUDENT TO THE STUDENT LIST
        students.push(newStudent);

        // SAVE ALL STUDENTS
        localStorage.setItem("nacabsStudents", JSON.stringify(students));

        // DISPLAY SUCCESS MESSAGE
        message.style.color = "green";
        message.textContent =
            "Registration successful! You can now log in with your matric number and password.";

        // CLEAR THE FORM
        signupForm.reset();

        console.log("Student account created:", student);
    });
}
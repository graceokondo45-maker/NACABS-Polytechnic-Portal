
// =====================================
// NACABS POLYTECHNIC PASSWORD RECOVERY
// =====================================


// =====================================
// SHOW OR HIDE PASSWORD
// =====================================

function showHidePassword(inputId, button) {

    const passwordInput = document.getElementById(inputId);

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        button.textContent = "🙈";

    } else {

        passwordInput.type = "password";
        button.textContent = "👁";

    }

}


// =====================================
// RESET FORGOTTEN PASSWORD
// =====================================

const forgotPasswordForm =
    document.getElementById("forgotPasswordForm");

if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const matric = document.getElementById("matric")
            .value.trim().toUpperCase();

        const email = document.getElementById("email")
            .value.trim().toLowerCase();

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("resetMessage");


        // GET REGISTERED STUDENTS

        const students = JSON.parse(
            localStorage.getItem("nacabsStudents")
        ) || [];


        // FIND STUDENT ACCOUNT

        const studentIndex = students.findIndex(student =>
            (student.matric || "").toUpperCase() === matric &&
            (student.email || "").toLowerCase() === email
        );


        // CHECK ACCOUNT

        if (studentIndex === -1) {

            message.style.color = "red";

            message.textContent =
                "Matriculation number or email address is incorrect.";

            return;

        }


        // CHECK PASSWORD LENGTH

        if (newPassword.length < 6) {

            message.style.color = "red";

            message.textContent =
                "Password must contain at least 6 characters.";

            return;

        }


        // CHECK PASSWORD MATCH

        if (newPassword !== confirmPassword) {

            message.style.color = "red";

            message.textContent =
                "The passwords do not match.";

            return;

        }


        // UPDATE PASSWORD

        students[studentIndex].password = newPassword;

        localStorage.setItem(
            "nacabsStudents",
            JSON.stringify(students)
        );


        // SUCCESS MESSAGE

        message.style.color = "green";

        message.textContent =
            "Password reset successful! You can now log in.";


        forgotPasswordForm.reset();

    });

}

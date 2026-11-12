
// GET HTML ELEMENTS
const courseForm = document.getElementById("courseForm");
const studentCourseList = document.getElementById("studentCourseList");
const totalUnits = document.getElementById("totalUnits");
const courseMessage = document.getElementById("courseMessage");

// GET STUDENT INFORMATION
const student = JSON.parse(localStorage.getItem("nacabsStudent"));

// CHECK LOGIN
if (!student || localStorage.getItem("nacabsLoggedIn") !== "true") {
    window.location.href = "login.html";
} else {

// SAMPLE COURSES
const sampleCourses = [
    {
        department: "Computer Science",
        level: "ND II",
        semester: "Second Semester",
        courseCode: "CSC 201",
        courseTitle: "Introduction to Programming",
        creditUnits: 3
    },
    {
        department: "Computer Science",
        level: "ND II",
        semester: "Second Semester",
        courseCode: "CSC 202",
        courseTitle: "Computer Hardware",
        creditUnits: 2
    },
    {
        department: "Computer Science",
        level: "ND II",
        semester: "Second Semester",
        courseCode: "CSC 203",
        courseTitle: "Database Management",
        creditUnits: 3
    }
];

// GET ADMIN COURSES
const adminCourses = JSON.parse(localStorage.getItem("nacabsCourses")) || [];

// USE ADMIN COURSES IF AVAILABLE
const allCourses = adminCourses.length > 0 ? adminCourses : sampleCourses;

// FILTER COURSES
const availableCourses = allCourses.filter(course =>
    course.department.trim().toLowerCase() ===
        (student.department || "").trim().toLowerCase() &&
    course.level.trim().toLowerCase() ===
        (student.level || "").trim().toLowerCase() &&
    course.semester === "Second Semester"
);

// DISPLAY COURSES
function displayCourses() {
    studentCourseList.innerHTML = "";

    if (availableCourses.length === 0) {
        studentCourseList.textContent =
            "No courses are available for your department and level yet. Please contact the administrator.";
        return;
    }

    availableCourses.forEach(course => {
        const label = document.createElement("label");
        label.className = "course-option";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = course.courseCode;
        checkbox.dataset.title = course.courseTitle;
        checkbox.dataset.units = course.creditUnits;

        const span = document.createElement("span");
        span.textContent =
            `${course.courseCode} - ${course.courseTitle} (${course.creditUnits} Units)`;

        label.append(checkbox, span);
        studentCourseList.appendChild(label);

        checkbox.addEventListener("change", calculateUnits);
    });

    calculateUnits();
}

// CALCULATE CREDIT UNITS
function calculateUnits() {
    const selected = studentCourseList.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    let total = 0;

    selected.forEach(course => {
        total += Number(course.dataset.units);
    });

    totalUnits.textContent = total;
}

// SUBMIT REGISTRATION
courseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const selected = studentCourseList.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    if (selected.length === 0) {
        courseMessage.textContent = "Please select at least one course.";
        courseMessage.style.color = "red";
        return;
    }

    const registeredCourses = Array.from(selected).map(course => ({
        courseCode: course.value,
        courseTitle: course.dataset.title,
        creditUnits: Number(course.dataset.units)
    }));

    let registrations =
        JSON.parse(localStorage.getItem("nacabsRegistrations")) || [];

    registrations = registrations.filter(registration =>
        !(registration.matric === student.matric &&
          registration.semester === "Second Semester")
    );

    registrations.push({
        matric: student.matric,
        fullname: student.fullname,
        department: student.department,
        level: student.level,
        semester: "Second Semester",
        courses: registeredCourses
    });

    localStorage.setItem(
        "nacabsRegistrations",
        JSON.stringify(registrations)
    );

    courseMessage.textContent =
        "Course registration submitted successfully!";
    courseMessage.style.color = "green";
});

displayCourses();

}

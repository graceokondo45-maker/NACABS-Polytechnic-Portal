
// =====================================
// NACABS POLYTECHNIC ADMIN DASHBOARD
// COMPLETE UPDATED ADMIN JAVASCRIPT
// =====================================


// =====================================
// CHECK ADMIN LOGIN
// =====================================

if (localStorage.getItem("nacabsAdminLoggedIn") !== "true") {

    window.location.href = "admin%20login.html";

} else {

    // =====================================
    // GET HTML ELEMENTS
    // =====================================

    const adminCourseForm = document.getElementById("adminCourseForm");
    const adminCourseList = document.getElementById("adminCourseList");
    const adminCourseMessage = document.getElementById("adminCourseMessage");

    const studentRegistrationList = document.getElementById("studentRegistrationList");
    const studentAccountList = document.getElementById("studentAccountList");
    const adminLogout = document.getElementById("adminLogout");

    // STUDENT ACCOUNT FILTERS
    const accountSearch = document.getElementById("accountSearch");
    const accountDepartment = document.getElementById("accountDepartment");
    const accountLevel = document.getElementById("accountLevel");
    const resetAccountFilters = document.getElementById("resetAccountFilters");

    // STUDENT REGISTRATION FILTERS
    const studentSearch = document.getElementById("studentSearch");
    const filterDepartment = document.getElementById("filterDepartment");
    const filterLevel = document.getElementById("filterLevel");
    const resetStudentFilters = document.getElementById("resetStudentFilters");

    // RESULT ELEMENTS
    const adminResultForm = document.getElementById("adminResultForm");
    const adminResultList = document.getElementById("adminResultList");
    const resultMessage = document.getElementById("resultMessage");

    const resultStudentMatric = document.getElementById("resultStudentMatric");
    const resultCourseTitle = document.getElementById("resultCourseTitle");
    const resultCourseCode = document.getElementById("resultCourseCode");
    const resultCA = document.getElementById("resultCA");
    const resultExam = document.getElementById("resultExam");
    const resultTotal = document.getElementById("resultTotal");
    const resultGrade = document.getElementById("resultGrade");
    const resultRemark = document.getElementById("resultRemark");
    const resultSemester = document.getElementById("resultSemester");
    const resultSession = document.getElementById("resultSession");

    // SCHOOL FEES ELEMENTS
    const adminFeesForm = document.getElementById("adminFeesForm");
    const adminFeesList = document.getElementById("adminFeesList");
    const adminFeesMessage = document.getElementById("adminFeesMessage");

    const feeStudentMatric = document.getElementById("feeStudentMatric");
    const feeAcademicSession = document.getElementById("feeAcademicSession");
    const totalSchoolFees = document.getElementById("totalSchoolFees");
    const amountPaid = document.getElementById("amountPaid");

    // ADMIN PROFILE ELEMENTS
    const adminProfileUsername = document.getElementById("adminProfileUsername");
    const adminPasswordForm = document.getElementById("adminPasswordForm");
    const currentAdminPassword = document.getElementById("currentAdminPassword");
    const newAdminPassword = document.getElementById("newAdminPassword");
    const confirmAdminPassword = document.getElementById("confirmAdminPassword");
    const adminPasswordMessage = document.getElementById("adminPasswordMessage");

    // PAYMENT VERIFICATION ELEMENTS
    const adminPaymentList = document.getElementById("adminPaymentList");
    const totalSubmittedPayments = document.getElementById("totalSubmittedPayments");
    const pendingPayments = document.getElementById("pendingPayments");
    const approvedPayments = document.getElementById("approvedPayments");


    // =====================================
    // LOAD SAVED DATA
    // =====================================

    function loadSavedData(key) {
        try {
            const savedData = JSON.parse(localStorage.getItem(key));
            return Array.isArray(savedData) ? savedData : [];
        } catch (error) {
            console.error("Error loading " + key, error);
            return [];
        }
    }

    let courses = loadSavedData("nacabsCourses");
    let registrations = loadSavedData("nacabsRegistrations");
    let students = loadSavedData("nacabsStudents");
    let results = loadSavedData("nacabsResults");
    let fees = loadSavedData("nacabsFees");


    // =====================================
    // SAVE DATA
    // =====================================

    function saveCourses() {
        localStorage.setItem("nacabsCourses", JSON.stringify(courses));
    }

    function saveRegistrations() {
        localStorage.setItem("nacabsRegistrations", JSON.stringify(registrations));
    }

    function saveStudents() {
        localStorage.setItem("nacabsStudents", JSON.stringify(students));
    }

    function saveResults() {
        localStorage.setItem("nacabsResults", JSON.stringify(results));
    }

    function saveFees() {
        localStorage.setItem("nacabsFees", JSON.stringify(fees));
    }


    // =====================================
    // HELPER FUNCTIONS
    // =====================================

    function normalizeMatric(value) {
        return String(value || "")
            .trim()
            .toUpperCase()
            .replace(/\s+/g, "");
    }

    function getStudentMatric(student) {
        if (!student) return "";

        return normalizeMatric(
            student.matric ||
            student.studentMatric ||
            student.matricNumber
        );
    }

    function getCourseCode(item) {
        if (typeof item === "string") {
            return item.trim().toUpperCase();
        }

        if (item && typeof item === "object") {
            return String(
                item.courseCode ||
                item.code ||
                item.course_code ||
                ""
            ).trim().toUpperCase();
        }

        return "";
    }

    function getCourseTitle(item) {
        if (typeof item === "string") {
            return item.trim();
        }

        if (item && typeof item === "object") {
            return String(
                item.courseTitle ||
                item.title ||
                item.name ||
                ""
            ).trim();
        }

        return "";
    }

    function findStudentByMatric(matric) {
        const normalizedMatric = normalizeMatric(matric);

        return students.find(student =>
            getStudentMatric(student) === normalizedMatric
        );
    }

    function findStudentRegistration(matric) {
        const normalizedMatric = normalizeMatric(matric);

        return registrations.find(registration =>
            getStudentMatric(registration) === normalizedMatric
        );
    }

    function findCourseByCode(code) {
        const normalizedCode = getCourseCode(code);

        return courses.find(course =>
            getCourseCode(course) === normalizedCode
        );
    }

    function getRegisteredCourseNames(registration) {
        if (
            !registration ||
            !Array.isArray(registration.courses) ||
            registration.courses.length === 0
        ) {
            return "No courses registered";
        }

        return registration.courses.map(item => {
            const code = getCourseCode(item);
            const title = getCourseTitle(item);

            const matchingCourse = courses.find(course =>
                getCourseCode(course) === code ||
                (
                    title &&
                    getCourseTitle(course).toLowerCase() === title.toLowerCase()
                )
            );

            if (matchingCourse) {
                return getCourseCode(matchingCourse) +
                    " - " +
                    getCourseTitle(matchingCourse);
            }

            return (code ? code + " - " : "") + (title || code);

        }).join(", ");
    }


    // =====================================
    // AUTOMATIC GRADE CALCULATION
    // =====================================

    function calculateGrade(total) {
        if (total >= 70) return "A";
        if (total >= 60) return "B";
        if (total >= 50) return "C";
        if (total >= 45) return "D";
        return "F";
    }

    function calculateRemark(grade) {
        if (grade === "A") return "Excellent";
        if (grade === "B") return "Very Good";
        if (grade === "C") return "Good";
        if (grade === "D") return "Pass";
        return "Fail";
    }


    // =====================================
    // AUTOMATIC RESULT CALCULATION
    // =====================================

    function updateCalculatedResult() {
        if (!resultCA || !resultExam) return;

        const caValue = resultCA.value;
        const examValue = resultExam.value;

        if (caValue === "" || examValue === "") {
            if (resultTotal) resultTotal.value = "";
            if (resultGrade) resultGrade.value = "";
            if (resultRemark) resultRemark.value = "";
            return;
        }

        const ca = Number(caValue);
        const exam = Number(examValue);

        if (
            !Number.isFinite(ca) ||
            !Number.isFinite(exam) ||
            ca < 0 || ca > 30 ||
            exam < 0 || exam > 70
        ) {
            if (resultTotal) resultTotal.value = "";
            if (resultGrade) resultGrade.value = "";
            if (resultRemark) resultRemark.value = "";
            return;
        }

        const total = ca + exam;
        const grade = calculateGrade(total);

        if (resultTotal) resultTotal.value = total;
        if (resultGrade) resultGrade.value = grade;
        if (resultRemark) resultRemark.value = calculateRemark(grade);
    }

    if (resultCA) {
        resultCA.addEventListener("input", updateCalculatedResult);
    }

    if (resultExam) {
        resultExam.addEventListener("input", updateCalculatedResult);
    }


    // =====================================
    // COURSE MANAGEMENT
    // =====================================

    function displayCourses() {
        if (!adminCourseList) return;

        adminCourseList.innerHTML = "";

        if (courses.length === 0) {
            adminCourseList.textContent = "No courses available.";
            return;
        }

        courses.forEach((course, index) => {
            const card = document.createElement("div");
            card.className = "admin-course-item";

            const details = document.createElement("p");
            details.textContent =
                "Course Code: " + (course.courseCode || "N/A") +
                " | Course Title: " + (course.courseTitle || "N/A") +
                " | Department: " + (course.department || "N/A") +
                " | Level: " + (course.level || "N/A") +
                " | Semester: " + (course.semester || "N/A") +
                " | Credit Units: " + (course.creditUnits || 0);

            const editButton = document.createElement("button");
            editButton.textContent = "Edit Course";
            editButton.className = "admin-btn";

            editButton.addEventListener("click", function() {
                document.getElementById("courseDepartment").value = course.department || "";
                document.getElementById("courseLevel").value = course.level || "";
                document.getElementById("courseSemester").value = course.semester || "";
                document.getElementById("courseCode").value = course.courseCode || "";
                document.getElementById("courseTitle").value = course.courseTitle || "";
                document.getElementById("creditUnits").value = course.creditUnits || "";

                courses.splice(index, 1);
                saveCourses();
                displayCourses();

                if (adminCourseMessage) {
                    adminCourseMessage.textContent =
                        "Edit the course details and submit to save.";
                    adminCourseMessage.style.color = "blue";
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Course";
            deleteButton.className = "admin-btn";

            deleteButton.addEventListener("click", function() {
                if (confirm("Are you sure you want to delete this course?")) {
                    courses.splice(index, 1);
                    saveCourses();
                    displayCourses();
                    updateSummary();
                }
            });

            card.append(details, editButton, deleteButton);
            adminCourseList.appendChild(card);
        });
    }


    // =====================================
    // ADD COURSE
    // =====================================

    if (adminCourseForm) {
        adminCourseForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const department = document.getElementById("courseDepartment").value.trim();
            const level = document.getElementById("courseLevel").value.trim();
            const semester = document.getElementById("courseSemester").value.trim();
            const courseCode = document.getElementById("courseCode").value.trim().toUpperCase();
            const courseTitle = document.getElementById("courseTitle").value.trim();
            const creditUnits = document.getElementById("creditUnits").value.trim();

            if (!department || !level || !semester || !courseCode || !courseTitle || !creditUnits) {
                if (adminCourseMessage) {
                    adminCourseMessage.textContent = "Please fill in all course details.";
                    adminCourseMessage.style.color = "red";
                }
                return;
            }

            const existingCourse = courses.find(course =>
                getCourseCode(course) === courseCode
            );

            if (existingCourse) {
                if (adminCourseMessage) {
                    adminCourseMessage.textContent = "This course code already exists.";
                    adminCourseMessage.style.color = "red";
                }
                return;
            }

            courses.push({
                department,
                level,
                semester,
                courseCode,
                courseTitle,
                creditUnits: Number(creditUnits)
            });

            saveCourses();
            displayCourses();
            updateSummary();
            adminCourseForm.reset();

            if (adminCourseMessage) {
                adminCourseMessage.textContent = "Course added successfully.";
                adminCourseMessage.style.color = "green";
            }
        });
    }


    // =====================================
    // DISPLAY STUDENT REGISTRATIONS
    // =====================================

    function displayStudentRegistrations() {
        if (!studentRegistrationList) return;

        studentRegistrationList.innerHTML = "";

        if (registrations.length === 0) {
            studentRegistrationList.textContent =
                "No student course registrations available.";
            return;
        }

        registrations.forEach(registration => {
            const card = document.createElement("div");
            card.className = "admin-course-item";

            const details = document.createElement("p");
            details.textContent =
                "Student Name: " + (registration.fullname || "N/A") +
                " | Matric Number: " + getStudentMatric(registration) +
                " | Department: " + (registration.department || "N/A") +
                " | Level: " + (registration.level || "N/A") +
                " | Semester: " + (registration.semester || "N/A");

            const courseDetails = document.createElement("p");
            courseDetails.textContent =
                "Registered Courses: " + getRegisteredCourseNames(registration);

            card.append(details, courseDetails);
            studentRegistrationList.appendChild(card);
        });
    }


    // =====================================
    // STUDENT ACCOUNT MANAGEMENT
    // =====================================

    function displayStudents() {
        if (!studentAccountList) return;

        studentAccountList.innerHTML = "";

        const searchText = accountSearch
            ? accountSearch.value.trim().toLowerCase()
            : "";

        const departmentValue = accountDepartment
            ? accountDepartment.value.trim().toLowerCase()
            : "";

        const levelValue = accountLevel
            ? accountLevel.value.trim().toLowerCase()
            : "";

        const filteredStudents = students.filter(student => {
            const name = (student.fullname || "").toLowerCase();
            const matric = getStudentMatric(student).toLowerCase();
            const department = (student.department || "").toLowerCase();
            const level = (student.level || "").toLowerCase();

            return (
                (name.includes(searchText) || matric.includes(searchText)) &&
                (!departmentValue || department === departmentValue) &&
                (!levelValue || level === levelValue)
            );
        });

        if (filteredStudents.length === 0) {
            studentAccountList.textContent =
                students.length === 0
                    ? "No registered student accounts found."
                    : "No matching student accounts found.";
            return;
        }

        filteredStudents.forEach(student => {
            const card = document.createElement("div");
            card.className = "admin-course-item";

            const photo = document.createElement("img");
            photo.className = "admin-student-photo";
            photo.alt = "Student Passport";

            if (
                typeof student.passportPhoto === "string" &&
                student.passportPhoto.startsWith("data:image/")
            ) {
                photo.src = student.passportPhoto;
            } else {
                photo.style.display = "none";
            }

            const details = document.createElement("p");
            details.textContent =
                "Name: " + (student.fullname || "N/A") +
                " | Matric Number: " + getStudentMatric(student) +
                " | Email: " + (student.email || "N/A") +
                " | Department: " + (student.department || "N/A") +
                " | Course: " + (student.course || "N/A") +
                " | Level: " + (student.level || "N/A");

            const active =
                student.active !== false &&
                student.status !== "deactivated";

            const status = document.createElement("p");
            status.textContent = active
                ? "Account Status: Active"
                : "Account Status: Deactivated";

            const toggleButton = document.createElement("button");
            toggleButton.textContent = active
                ? "Deactivate Account"
                : "Activate Account";
            toggleButton.className = "admin-btn";

            toggleButton.addEventListener("click", function() {
                student.active = !active;
                student.status = student.active ? "active" : "deactivated";
                saveStudents();
                displayStudents();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Student";
            deleteButton.className = "admin-btn";

            deleteButton.addEventListener("click", function() {
                if (confirm("Are you sure you want to delete this student account?")) {
                    const studentIndex = students.indexOf(student);

                    if (studentIndex !== -1) {
                        students.splice(studentIndex, 1);
                    }

                    saveStudents();
                    displayStudents();
                    updateSummary();
                }
            });

            card.append(photo, details, status, toggleButton, deleteButton);
            studentAccountList.appendChild(card);
        });
    }


    // STUDENT ACCOUNT FILTERS

    if (accountSearch) {
        accountSearch.addEventListener("input", displayStudents);
    }

    if (accountDepartment) {
        accountDepartment.addEventListener("change", displayStudents);
    }

    if (accountLevel) {
        accountLevel.addEventListener("change", displayStudents);
    }

    if (resetAccountFilters) {
        resetAccountFilters.addEventListener("click", function() {
            if (accountSearch) accountSearch.value = "";
            if (accountDepartment) accountDepartment.value = "";
            if (accountLevel) accountLevel.value = "";
            displayStudents();
        });
    }


    // =====================================
    // SEARCH AND FILTER COURSE REGISTRATIONS
    // =====================================

    function searchStudentRegistrations() {
        if (!studentRegistrationList) return;

        const searchText = studentSearch
            ? studentSearch.value.trim().toLowerCase()
            : "";

        const departmentValue = filterDepartment
            ? filterDepartment.value.trim().toLowerCase()
            : "";

        const levelValue = filterLevel
            ? filterLevel.value.trim().toLowerCase()
            : "";

        const filtered = registrations.filter(registration => {
            const name = (registration.fullname || "").toLowerCase();
            const matric = getStudentMatric(registration).toLowerCase();
            const department = (registration.department || "").toLowerCase();
            const level = (registration.level || "").toLowerCase();

            return (
                (name.includes(searchText) || matric.includes(searchText)) &&
                (!departmentValue || department === departmentValue) &&
                (!levelValue || level === levelValue)
            );
        });

        studentRegistrationList.innerHTML = "";

        if (filtered.length === 0) {
            studentRegistrationList.textContent =
                "No matching student course registrations found.";
            return;
        }

        filtered.forEach(registration => {
            const card = document.createElement("div");
            card.className = "admin-course-item";

            const details = document.createElement("p");
            details.textContent =
                "Student Name: " + (registration.fullname || "N/A") +
                " | Matric Number: " + getStudentMatric(registration) +
                " | Department: " + (registration.department || "N/A") +
                " | Level: " + (registration.level || "N/A") +
                " | Semester: " + (registration.semester || "N/A");

            const courseDetails = document.createElement("p");
            courseDetails.textContent =
                "Registered Courses: " + getRegisteredCourseNames(registration);

            card.append(details, courseDetails);
            studentRegistrationList.appendChild(card);
        });
    }

    if (studentSearch) {
        studentSearch.addEventListener("input", searchStudentRegistrations);
    }

    if (filterDepartment) {
        filterDepartment.addEventListener("change", searchStudentRegistrations);
    }

    if (filterLevel) {
        filterLevel.addEventListener("change", searchStudentRegistrations);
    }

    if (resetStudentFilters) {
        resetStudentFilters.addEventListener("click", function() {
            if (studentSearch) studentSearch.value = "";
            if (filterDepartment) filterDepartment.value = "";
            if (filterLevel) filterLevel.value = "";
            searchStudentRegistrations();
        });
    }


    // =====================================
    // UPDATE DASHBOARD SUMMARY
    // =====================================

    function updateSummary() {
        const totalStudents = document.getElementById("totalStudents");
        const totalCourses = document.getElementById("totalCourses");
        const totalRegistrations = document.getElementById("totalRegistrations");

        if (totalStudents) totalStudents.textContent = students.length;
        if (totalCourses) totalCourses.textContent = courses.length;
        if (totalRegistrations) totalRegistrations.textContent = registrations.length;
    }


    // =====================================
    // LOAD ONLY COURSES REGISTERED BY STUDENT
    // =====================================

    function loadStudentRegisteredCourses() {
        if (!resultStudentMatric || !resultCourseTitle) return;

        const matric = normalizeMatric(resultStudentMatric.value);

        resultCourseTitle.innerHTML =
            '<option value="">Enter matric number first</option>';

        if (resultCourseCode) resultCourseCode.value = "";
        if (resultSemester) resultSemester.value = "";
        if (resultMessage) resultMessage.textContent = "";

        if (!matric) return;

        const registration = findStudentRegistration(matric);

        if (
            !registration ||
            !Array.isArray(registration.courses) ||
            registration.courses.length === 0
        ) {
            resultCourseTitle.innerHTML =
                '<option value="">No registered courses found</option>';

            if (resultMessage) {
                resultMessage.textContent =
                    "No course registration was found for this matric number.";
                resultMessage.style.color = "red";
            }

            return;
        }

        resultCourseTitle.innerHTML =
            '<option value="">Select Registered Course</option>';

        registration.courses.forEach(registeredCourse => {
            const registeredCode = getCourseCode(registeredCourse);
            const registeredTitle = getCourseTitle(registeredCourse);

            const matchingCourse = courses.find(course => {
                const adminCode = getCourseCode(course);
                const adminTitle = getCourseTitle(course).toLowerCase();

                return (
                    (registeredCode && adminCode === registeredCode) ||
                    (
                        registeredTitle &&
                        adminTitle === registeredTitle.toLowerCase()
                    )
                );
            });

            const courseCode = registeredCode ||
                (matchingCourse ? getCourseCode(matchingCourse) : "");

            const courseTitle = registeredTitle ||
                (matchingCourse ? getCourseTitle(matchingCourse) : "");

            const creditUnits = Number(
                registeredCourse.creditUnits ||
                (matchingCourse && matchingCourse.creditUnits) ||
                0
            );

            if (!courseCode && !courseTitle) return;

            const option = document.createElement("option");
            option.value = courseCode || courseTitle;
            option.textContent =
                (courseCode ? courseCode + " - " : "") +
                (courseTitle || courseCode);

            option.dataset.courseCode = courseCode;
            option.dataset.courseTitle = courseTitle || courseCode;
            option.dataset.creditUnits = creditUnits;

            option.dataset.semester =
                registration.semester ||
                (matchingCourse ? matchingCourse.semester : "") ||
                registeredCourse.semester ||
                "";

            resultCourseTitle.appendChild(option);
        });

        if (resultCourseTitle.options.length === 1) {
            resultCourseTitle.innerHTML =
                '<option value="">No registered courses found</option>';

            if (resultMessage) {
                resultMessage.textContent =
                    "No valid registered courses were found for this student.";
                resultMessage.style.color = "red";
            }

            return;
        }

        if (resultSemester && registration.semester) {
            resultSemester.value = registration.semester;
        }

        if (resultMessage) {
            resultMessage.textContent =
                "Registered courses loaded successfully.";
            resultMessage.style.color = "green";
        }
    }

    if (resultStudentMatric) {
        resultStudentMatric.addEventListener("input", loadStudentRegisteredCourses);
        resultStudentMatric.addEventListener("change", loadStudentRegisteredCourses);
    }


    // =====================================
    // UPDATE COURSE INFORMATION IN RESULT FORM
    // =====================================

    if (resultCourseTitle) {
        resultCourseTitle.addEventListener("change", function() {
            const selectedOption =
                resultCourseTitle.options[resultCourseTitle.selectedIndex];

            if (!selectedOption || !resultCourseTitle.value) {
                if (resultCourseCode) resultCourseCode.value = "";
                return;
            }

            const selectedCode =
                selectedOption.dataset.courseCode ||
                resultCourseTitle.value;

            if (resultCourseCode) {
                resultCourseCode.value = selectedCode;
            }

            if (resultSemester && selectedOption.dataset.semester) {
                resultSemester.value = selectedOption.dataset.semester;
            }
        });
    }


    // =====================================
    // DISPLAY UPLOADED RESULTS
    // =====================================

    function displayAdminResults() {
        if (!adminResultList) return;

        adminResultList.innerHTML = "";

        if (results.length === 0) {
            adminResultList.textContent = "No results uploaded yet.";
            return;
        }

        results.forEach((result, index) => {
            const card = document.createElement("div");
            card.className = "admin-course-item";

            const grade = result.grade ||
                calculateGrade(Number(result.total) || 0);

            const remark = result.remark || calculateRemark(grade);

            const details = document.createElement("p");
            details.textContent =
                "Matric: " + result.matric +
                " | Student: " + (result.fullname || "N/A") +
                " | Course: " + (result.courseTitle || result.courseCode) +
                " | Code: " + result.courseCode +
                " | CA: " + result.ca +
                " | Exam: " + result.exam +
                " | Total: " + result.total +
                " | Grade: " + grade +
                " | Remark: " + remark +
                " | Semester: " + result.semester +
                " | Session: " + result.session;

            const editButton = document.createElement("button");
            editButton.textContent = "Edit Result";
            editButton.className = "admin-btn";

            editButton.addEventListener("click", function() {
                resultStudentMatric.value = result.matric;
                loadStudentRegisteredCourses();

                let matchingOption = Array.from(
                    resultCourseTitle.options
                ).find(option =>
                    getCourseCode(option.dataset.courseCode) ===
                    getCourseCode(result.courseCode)
                );

                if (!matchingOption) {
                    const option = document.createElement("option");
                    option.value = result.courseCode;
                    option.textContent =
                        (result.courseCode || "") +
                        " - " +
                        (result.courseTitle || "");

                    option.dataset.courseCode = result.courseCode || "";
                    option.dataset.courseTitle = result.courseTitle || "";
                    option.dataset.creditUnits = result.creditUnits || 0;
                    option.dataset.semester = result.semester || "";

                    resultCourseTitle.appendChild(option);
                    matchingOption = option;
                }

                resultCourseTitle.value = matchingOption.value;
                resultCourseTitle.dispatchEvent(new Event("change"));

                resultCA.value = result.ca;
                resultExam.value = result.exam;
                resultSession.value = result.session;

                if (resultSemester) {
                    resultSemester.value = result.semester;
                }

                updateCalculatedResult();

                if (resultMessage) {
                    resultMessage.textContent =
                        "Result loaded for editing. Make your changes and click Save Student Result.";
                    resultMessage.style.color = "blue";
                }

                if (adminResultForm) {
                    adminResultForm.scrollIntoView({ behavior: "smooth" });
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Result";
            deleteButton.className = "admin-btn";

            deleteButton.addEventListener("click", function() {
                if (confirm("Are you sure you want to delete this result?")) {
                    results.splice(index, 1);
                    saveResults();
                    displayAdminResults();

                    if (resultMessage) {
                        resultMessage.textContent =
                            "Student result deleted successfully.";
                        resultMessage.style.color = "green";
                    }
                }
            });

            card.append(details, editButton, deleteButton);
            adminResultList.appendChild(card);
        });
    }


    // =====================================
    // SUBMIT STUDENT RESULT
    // =====================================

    if (adminResultForm) {
        adminResultForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const matric = normalizeMatric(resultStudentMatric.value);

            const selectedOption =
                resultCourseTitle.options[resultCourseTitle.selectedIndex];

            const courseCode = selectedOption
                ? getCourseCode(selectedOption.dataset.courseCode) ||
                  getCourseCode(resultCourseTitle.value)
                : "";

            const courseTitle = selectedOption
                ? selectedOption.dataset.courseTitle ||
                  selectedOption.textContent
                : "";

            const ca = Number(resultCA.value);
            const exam = Number(resultExam.value);
            const session = resultSession.value.trim();

            const registration = findStudentRegistration(matric);

            const registeredCourse = registration &&
                Array.isArray(registration.courses)
                ? registration.courses.find(item =>
                    (
                        getCourseCode(item) &&
                        getCourseCode(item) === courseCode
                    ) ||
                    (
                        getCourseTitle(item) &&
                        getCourseTitle(item).toLowerCase() ===
                        courseTitle.toLowerCase()
                    )
                )
                : null;

            const course = findCourseByCode(courseCode);

            if (!matric || !courseCode || !session) {
                resultMessage.textContent =
                    "Please complete all required fields.";
                resultMessage.style.color = "red";
                return;
            }

            if (!registration) {
                resultMessage.textContent =
                    "Student course registration was not found.";
                resultMessage.style.color = "red";
                return;
            }

            if (!selectedOption || !resultCourseTitle.value) {
                resultMessage.textContent =
                    "Please select a registered course.";
                resultMessage.style.color = "red";
                return;
            }

            if (!registeredCourse) {
                resultMessage.textContent =
                    "This course is not registered by the selected student.";
                resultMessage.style.color = "red";
                return;
            }

            if (
                resultCA.value === "" ||
                resultExam.value === "" ||
                !Number.isFinite(ca) ||
                !Number.isFinite(exam) ||
                ca < 0 || ca > 30 ||
                exam < 0 || exam > 70
            ) {
                resultMessage.textContent =
                    "CA must be between 0 and 30, and Exam must be between 0 and 70.";
                resultMessage.style.color = "red";
                return;
            }

            const total = ca + exam;
            const grade = calculateGrade(total);
            const remark = calculateRemark(grade);

            const semester =
                resultSemester && resultSemester.value
                    ? resultSemester.value
                    : registration.semester ||
                      (course ? course.semester : "");

            if (!semester) {
                resultMessage.textContent = "Please select a semester.";
                resultMessage.style.color = "red";
                return;
            }

            const resultData = {
                matric,
                fullname: registration.fullname || "",
                department: registration.department || "",
                level: registration.level || "",
                courseCode,
                courseTitle,
                creditUnits: Number(
                    (registeredCourse && registeredCourse.creditUnits) ||
                    (course && course.creditUnits) ||
                    0
                ),
                ca,
                exam,
                total,
                grade,
                remark,
                semester,
                session
            };

            const existingIndex = results.findIndex(result =>
                normalizeMatric(result.matric) === matric &&
                getCourseCode(result.courseCode) === courseCode &&
                result.semester === semester &&
                result.session === session
            );

            if (existingIndex !== -1) {
                const confirmUpdate = confirm(
                    "This result already exists. Do you want to update it?"
                );

                if (!confirmUpdate) return;

                results[existingIndex] = resultData;
                resultMessage.textContent =
                    "Student result updated successfully.";
            } else {
                results.push(resultData);
                resultMessage.textContent =
                    "Student result uploaded successfully.";
            }

            saveResults();
            displayAdminResults();

            resultMessage.style.color = "green";
            adminResultForm.reset();

            resultCourseTitle.innerHTML =
                '<option value="">Enter matric number first</option>';

            if (resultCourseCode) resultCourseCode.value = "";
            if (resultTotal) resultTotal.value = "";
            if (resultGrade) resultGrade.value = "";
            if (resultRemark) resultRemark.value = "";
        });
    }


    // =====================================
    // SCHOOL FEES MANAGEMENT
    // =====================================

    function displayAdminFees() {
        if (!adminFeesList) return;

        adminFeesList.innerHTML = "";

        if (fees.length === 0) {
            adminFeesList.textContent = "No fee records available yet.";
            return;
        }

        fees.forEach((fee, index) => {
            const card = document.createElement("div");
            card.className = "admin-course-item";

            const details = document.createElement("p");
            details.textContent =
                "Student Name: " + (fee.fullname || "N/A") +
                " | Matric Number: " + fee.matric +
                " | Session: " + fee.session;

            const total = document.createElement("p");
            total.textContent =
                "Total School Fees: ₦" +
                Number(fee.totalFees).toLocaleString("en-NG");

            const paid = document.createElement("p");
            paid.textContent =
                "Amount Paid: ₦" +
                Number(fee.amountPaid).toLocaleString("en-NG");

            const balance = document.createElement("p");
            balance.textContent =
                "Outstanding Balance: ₦" +
                Number(fee.balance).toLocaleString("en-NG");

            const status = document.createElement("p");
            status.textContent = "Payment Status: " + fee.status;

            if (fee.status === "Paid") {
                status.style.color = "green";
            } else if (fee.status === "Part Payment") {
                status.style.color = "orange";
            } else {
                status.style.color = "red";
            }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete Fee Record";
            deleteButton.className = "admin-btn";

            deleteButton.addEventListener("click", function() {
                if (confirm("Are you sure you want to delete this fee record?")) {
                    fees.splice(index, 1);
                    saveFees();
                    displayAdminFees();
                }
            });

            card.append(details, total, paid, balance, status, deleteButton);
            adminFeesList.appendChild(card);
        });
    }


    // =====================================
    // SAVE STUDENT FEE PAYMENT
    // =====================================

    if (adminFeesForm) {
        adminFeesForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const matric = normalizeMatric(feeStudentMatric.value);
            const session = feeAcademicSession.value.trim();
            const totalFees = Number(totalSchoolFees.value);
            const paid = Number(amountPaid.value);

            const student = findStudentByMatric(matric);

            if (!student) {
                adminFeesMessage.textContent =
                    "Student not found. Check the matric number.";
                adminFeesMessage.style.color = "red";
                return;
            }

            if (
                totalSchoolFees.value === "" ||
                amountPaid.value === "" ||
                !Number.isFinite(totalFees) ||
                !Number.isFinite(paid) ||
                totalFees <= 0 ||
                paid < 0
            ) {
                adminFeesMessage.textContent =
                    "Enter valid school fee amounts.";
                adminFeesMessage.style.color = "red";
                return;
            }

            if (paid > totalFees) {
                adminFeesMessage.textContent =
                    "Amount paid cannot be greater than total school fees.";
                adminFeesMessage.style.color = "red";
                return;
            }

            if (!session) {
                adminFeesMessage.textContent =
                    "Please enter the academic session.";
                adminFeesMessage.style.color = "red";
                return;
            }

            const balance = totalFees - paid;

            let status;

            if (balance === 0) {
                status = "Paid";
            } else if (paid > 0) {
                status = "Part Payment";
            } else {
                status = "Unpaid";
            }

            const feeData = {
                matric,
                fullname: student.fullname || "N/A",
                department: student.department || "N/A",
                level: student.level || "N/A",
                session,
                totalFees,
                amountPaid: paid,
                balance,
                status
            };

            const existingIndex = fees.findIndex(fee =>
                normalizeMatric(fee.matric) === matric &&
                fee.session === session
            );

            if (existingIndex !== -1) {
                fees[existingIndex] = feeData;
                adminFeesMessage.textContent =
                    "Student fee record updated successfully.";
            } else {
                fees.push(feeData);
                adminFeesMessage.textContent =
                    "Student fee payment saved successfully.";
            }

            adminFeesMessage.style.color = "green";
            saveFees();
            displayAdminFees();
            adminFeesForm.reset();
        });
    }


    // =====================================
    // VIEW PAYMENT TRANSFER PROOF
    // =====================================

    function viewPaymentProof(payment) {

        const proof = payment.proofData;

        if (
            typeof proof !== "string" ||
            (
                !proof.startsWith("data:image/") &&
                !proof.startsWith("data:application/pdf")
            )
        ) {
            alert("No valid transfer proof is available for this payment.");
            return;
        }

        const proofWindow = window.open(
            proof,
            "_blank",
            "noopener,noreferrer"
        );

        if (!proofWindow) {
            alert("Your browser blocked the proof window. Please allow pop-ups and try again.");
        }
    }


    // =====================================
    // PAYMENT VERIFICATION
    // =====================================

    async function displaySubmittedPayments() {

        if (!adminPaymentList) return;

        adminPaymentList.textContent = "Loading payments...";

        try {

            const response = await fetch(
                "http://localhost:5000/api/payments"
            );

            if (!response.ok) {
                throw new Error("Unable to load payments.");
            }

            const data = await response.json();

            const payments = Array.isArray(data.payments)
                ? data.payments
                : [];

            adminPaymentList.innerHTML = "";

            const pending = payments.filter(payment =>
                payment.status === "Pending Verification"
            ).length;

            const approved = payments.filter(payment =>
                payment.status === "Approved"
            ).length;

            if (totalSubmittedPayments) {
                totalSubmittedPayments.textContent = payments.length;
            }

            if (pendingPayments) {
                pendingPayments.textContent = pending;
            }

            if (approvedPayments) {
                approvedPayments.textContent = approved;
            }

            if (payments.length === 0) {
                adminPaymentList.textContent =
                    "No student payments submitted yet.";
                return;
            }

            payments.forEach(payment => {

                const card = document.createElement("div");
                card.className = "admin-course-item";

                const details = document.createElement("p");

                details.textContent =
                    "Payment ID: " + (payment.paymentId || "N/A") +
                    " | Matric Number: " + (payment.matric || "N/A") +
                    " | Session: " + (payment.session || "N/A") +
                    " | Amount: ₦" +
                    Number(payment.amount || 0).toLocaleString("en-NG");

                const reference = document.createElement("p");

                reference.textContent =
                    "Transaction Reference: " +
                    (payment.reference || "N/A");

                const date = document.createElement("p");

                date.textContent =
                    "Payment Date: " +
                    (payment.paymentDate || "N/A");

                const status = document.createElement("p");

                status.textContent =
                    "Status: " +
                    (payment.status || "Pending Verification");

                if (payment.status === "Approved") {
                    status.style.color = "green";
                } else if (payment.status === "Rejected") {
                    status.style.color = "red";
                } else {
                    status.style.color = "orange";
                }

                card.append(details, reference, date, status);


                // =====================================
                // VIEW TRANSFER PROOF BUTTON
                // =====================================

                const proofButton = document.createElement("button");

                proofButton.textContent = "View Transfer Proof";
                proofButton.className = "admin-btn";

                proofButton.addEventListener("click", function() {
                    viewPaymentProof(payment);
                });

                card.appendChild(proofButton);


                // =====================================
                // APPROVE AND REJECT PENDING PAYMENTS
                // =====================================

                if (payment.status === "Pending Verification") {

                    // APPROVE PAYMENT

                    const approveButton = document.createElement("button");

                    approveButton.textContent = "Approve Payment";
                    approveButton.className = "admin-btn";

                    approveButton.addEventListener("click", async function() {

                        const confirmed = confirm(
                            "Have you confirmed that this money entered the school's bank account? Only approve after confirmation."
                        );

                        if (!confirmed) return;

                        approveButton.disabled = true;

                        try {

                            const result = await fetch(
                                "http://localhost:5000/api/payments/" +
                                encodeURIComponent(payment.paymentId) +
                                "/approve",
                                {
                                    method: "PUT"
                                }
                            );

                            const responseData = await result.json();

                            if (!result.ok) {
                                throw new Error(
                                    responseData.message ||
                                    "Unable to approve payment."
                                );
                            }

                            alert(responseData.message);

                            await displaySubmittedPayments();

                        } catch (error) {

                            console.error("Approval error:", error);
                            alert(error.message);

                            approveButton.disabled = false;
                        }
                    });


                    // REJECT PAYMENT

                    const rejectButton = document.createElement("button");

                    rejectButton.textContent = "Reject Payment";
                    rejectButton.className = "admin-btn";

                    rejectButton.addEventListener("click", async function() {

                        const reason = prompt(
                            "Enter the reason for rejecting this payment:"
                        );

                        if (reason === null) return;

                        if (!reason.trim()) {
                            alert("Please provide a rejection reason.");
                            return;
                        }

                        rejectButton.disabled = true;

                        try {

                            const result = await fetch(
                                "http://localhost:5000/api/payments/" +
                                encodeURIComponent(payment.paymentId) +
                                "/reject",
                                {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        reason: reason.trim()
                                    })
                                }
                            );

                            const responseData = await result.json();

                            if (!result.ok) {
                                throw new Error(
                                    responseData.message ||
                                    "Unable to reject payment."
                                );
                            }

                            alert(responseData.message);

                            await displaySubmittedPayments();

                        } catch (error) {

                            console.error("Rejection error:", error);
                            alert(error.message);

                            rejectButton.disabled = false;
                        }
                    });

                    card.append(approveButton, rejectButton);
                }


                // =====================================
                // DISPLAY REJECTION REASON
                // =====================================

                if (payment.status === "Rejected") {

                    const rejection = document.createElement("p");

                    rejection.textContent =
                        "Rejection Reason: " +
                        (payment.rejectionReason || "Not provided.");

                    card.appendChild(rejection);
                }


                // =====================================
                // DISPLAY VERIFICATION DATE
                // =====================================

                if (payment.verifiedAt) {

                    const verified = document.createElement("p");

                    verified.textContent =
                        "Verified At: " +
                        new Date(payment.verifiedAt).toLocaleString();

                    card.appendChild(verified);
                }

                adminPaymentList.appendChild(card);
            });

        } catch (error) {

            console.error("Payment loading error:", error);

            adminPaymentList.textContent =
                "Unable to load payments. Make sure the backend server is running.";
        }
    }


    // =====================================
    // ADMIN PROFILE AND SETTINGS
    // =====================================

    if (adminProfileUsername) {

        const savedUsername =
            localStorage.getItem("nacabsAdminUsername") || "admin";

        adminProfileUsername.textContent = savedUsername;
    }


    // =====================================
    // CHANGE ADMIN PASSWORD
    // =====================================

    if (adminPasswordForm) {

        adminPasswordForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const currentPassword = currentAdminPassword.value;
            const newPassword = newAdminPassword.value;
            const confirmPassword = confirmAdminPassword.value;

            const savedPassword =
                localStorage.getItem("nacabsAdminPassword") || "admin123";

            if (currentPassword !== savedPassword) {

                adminPasswordMessage.textContent =
                    "Incorrect current password.";

                adminPasswordMessage.style.color = "red";
                return;
            }

            if (newPassword.length < 6) {

                adminPasswordMessage.textContent =
                    "New password must contain at least 6 characters.";

                adminPasswordMessage.style.color = "red";
                return;
            }

            if (newPassword !== confirmPassword) {

                adminPasswordMessage.textContent =
                    "New passwords do not match.";

                adminPasswordMessage.style.color = "red";
                return;
            }

            if (newPassword === currentPassword) {

                adminPasswordMessage.textContent =
                    "Please choose a different password.";

                adminPasswordMessage.style.color = "red";
                return;
            }

            localStorage.setItem("nacabsAdminPassword", newPassword);

            adminPasswordMessage.textContent =
                "Admin password updated successfully.";

            adminPasswordMessage.style.color = "green";

            adminPasswordForm.reset();
        });
    }


    // =====================================
    // ADMIN LOGOUT
    // =====================================

    if (adminLogout) {

        adminLogout.addEventListener("click", function() {

            if (confirm("Are you sure you want to logout?")) {

                localStorage.removeItem("nacabsAdminLoggedIn");

                window.location.href = "admin%20login.html";
            }
        });
    }


    // =====================================
    // LOAD DASHBOARD INFORMATION
    // =====================================

    displayCourses();
    displayStudentRegistrations();
    displayStudents();
    displayAdminResults();
    displayAdminFees();
    updateSummary();
    displaySubmittedPayments();

}

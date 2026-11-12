// =====================================
// NACABS POLYTECHNIC STUDENT DASHBOARD
// =====================================


// =====================================
// GET STUDENT INFORMATION
// =====================================

const student = JSON.parse(
    localStorage.getItem("nacabsStudent")
);


// =====================================
// CHECK STUDENT LOGIN
// =====================================

if (!student || localStorage.getItem("nacabsLoggedIn") !== "true") {

    window.location.href = "login.html";

} else {

    // =====================================
    // NORMALIZE MATRIC NUMBER
    // =====================================

    function normalizeMatric(value) {
        return String(value || "").trim().toUpperCase();
    }


    // =====================================
    // GET REGISTERED STUDENT RECORD
    // =====================================

    let students = JSON.parse(
        localStorage.getItem("nacabsStudents")
    ) || [];

    let registeredStudent = students.find(item =>

        normalizeMatric(item.matric) ===
        normalizeMatric(student.matric)

    );


    // =====================================
    // LOAD SAVED PASSPORT INTO SESSION
    // =====================================

    if (registeredStudent && registeredStudent.passportPhoto) {

        student.passportPhoto = registeredStudent.passportPhoto;

        localStorage.setItem(
            "nacabsStudent",
            JSON.stringify(student)
        );

    }


    // =====================================
    // DISPLAY STUDENT PROFILE
    // =====================================

    document.getElementById("studentName").textContent =
        student.fullname || "Student";

    document.getElementById("studentInitial").textContent =
        (student.fullname || "S").charAt(0).toUpperCase();

    document.getElementById("studentLevel").textContent =
        student.level || "Not available";

    document.getElementById("profileName").textContent =
        student.fullname || "Not available";


    // =====================================
    // EDIT AND UPDATE STUDENT PROFILE
    // =====================================

    const editProfileForm = document.getElementById("editProfileForm");

    const editFullName = document.getElementById("editFullName");
    const editEmail = document.getElementById("editEmail");
    const editDepartment = document.getElementById("editDepartment");
    const editCourse = document.getElementById("editCourse");
    const editLevel = document.getElementById("editLevel");

    const editProfileMessage =
        document.getElementById("editProfileMessage");


    // LOAD EXISTING STUDENT INFORMATION INTO FORM

    if (editProfileForm) {

        editFullName.value = student.fullname || "";
        editEmail.value = student.email || "";
        editDepartment.value = student.department || "";
        editCourse.value = student.course || "";
        editLevel.value = student.level || "";


        // UPDATE STUDENT PROFILE

        editProfileForm.addEventListener("submit", function(event) {

            event.preventDefault();

            const updatedName = editFullName.value.trim();
            const updatedEmail = editEmail.value.trim();
            const updatedDepartment = editDepartment.value.trim();
            const updatedCourse = editCourse.value.trim();
            const updatedLevel = editLevel.value.trim();

            if (
                !updatedName ||
                !updatedEmail ||
                !updatedDepartment ||
                !updatedCourse ||
                !updatedLevel
            ) {

                editProfileMessage.textContent =
                    "Please complete all profile fields.";

                editProfileMessage.style.color = "red";

                return;
            }


            // GET LATEST STUDENT RECORDS

            let currentStudents = JSON.parse(
                localStorage.getItem("nacabsStudents")
            ) || [];


            // FIND CURRENT STUDENT

            const studentIndex = currentStudents.findIndex(item =>

                normalizeMatric(item.matric) ===
                normalizeMatric(student.matric)

            );


            if (studentIndex === -1) {

                editProfileMessage.textContent =
                    "Student account could not be found.";

                editProfileMessage.style.color = "red";

                return;
            }


            // UPDATE REGISTERED STUDENT RECORD

            currentStudents[studentIndex].fullname = updatedName;
            currentStudents[studentIndex].email = updatedEmail;
            currentStudents[studentIndex].department = updatedDepartment;
            currentStudents[studentIndex].course = updatedCourse;
            currentStudents[studentIndex].level = updatedLevel;


            // SAVE STUDENT RECORDS

            localStorage.setItem(
                "nacabsStudents",
                JSON.stringify(currentStudents)
            );


            // UPDATE CURRENT STUDENT SESSION

            student.fullname = updatedName;
            student.email = updatedEmail;
            student.department = updatedDepartment;
            student.course = updatedCourse;
            student.level = updatedLevel;

            localStorage.setItem(
                "nacabsStudent",
                JSON.stringify(student)
            );


            // UPDATE STUDENT REGISTRATION RECORDS

            let currentRegistrations = JSON.parse(
                localStorage.getItem("nacabsRegistrations")
            ) || [];

            currentRegistrations.forEach(registration => {

                if (
                    normalizeMatric(registration.matric) ===
                    normalizeMatric(student.matric)
                ) {

                    registration.fullname = updatedName;
                    registration.department = updatedDepartment;
                    registration.level = updatedLevel;

                }

            });

            localStorage.setItem(
                "nacabsRegistrations",
                JSON.stringify(currentRegistrations)
            );


            // UPDATE RESULT RECORDS

            let currentResults = JSON.parse(
                localStorage.getItem("nacabsResults")
            ) || [];

            currentResults.forEach(result => {

                if (
                    normalizeMatric(result.matric) ===
                    normalizeMatric(student.matric)
                ) {

                    result.fullname = updatedName;

                }

            });

            localStorage.setItem(
                "nacabsResults",
                JSON.stringify(currentResults)
            );


            // UPDATE PROFILE DISPLAY

            document.getElementById("studentName").textContent =
                updatedName;

            document.getElementById("studentInitial").textContent =
                updatedName.charAt(0).toUpperCase();

            document.getElementById("studentLevel").textContent =
                updatedLevel;

            document.getElementById("profileName").textContent =
                updatedName;

            document.getElementById("profileEmail").textContent =
                updatedEmail;

            document.getElementById("profileDepartment").textContent =
                updatedDepartment;

            document.getElementById("profileCourse").textContent =
                updatedCourse;

            document.getElementById("profileLevel").textContent =
                updatedLevel;

            document.getElementById("resultStudentName").textContent =
                updatedName;


            // UPDATE LOCAL STUDENT RECORD VARIABLE

            registeredStudent = currentStudents[studentIndex];


            // SUCCESS MESSAGE

            editProfileMessage.textContent =
                "Your profile has been updated successfully!";

            editProfileMessage.style.color = "green";

        });

    }


    // =====================================
    // DISPLAY STUDENT PROFILE DETAILS
    // =====================================

    document.getElementById("profileMatric").textContent =
        student.matric || "Not available";

    document.getElementById("profileEmail").textContent =
        student.email || "Not available";

    document.getElementById("profileDepartment").textContent =
        student.department || "Not available";

    document.getElementById("profileCourse").textContent =
        student.course || "Not available";

    document.getElementById("profileLevel").textContent =
        student.level || "Not available";


    // =====================================
    // GET STUDENT COURSE REGISTRATIONS
    // =====================================

    const registrations = JSON.parse(
        localStorage.getItem("nacabsRegistrations")
    ) || [];

    const studentRegistration = registrations.find(registration =>

        normalizeMatric(registration.matric) ===
        normalizeMatric(student.matric) &&
        registration.semester === "Second Semester"

    );


    // =====================================
    // DISPLAY STUDENT SEMESTER
    // =====================================

    const profileSemester =
        document.getElementById("profileSemester");

    if (profileSemester) {

        const studentSemester =
            student.semester ||
            registeredStudent?.semester ||
            studentRegistration?.semester;

        profileSemester.textContent =
            studentSemester || "Not available";

    }


    // DISPLAY REGISTERED COURSE COUNT

    document.getElementById("registeredCourseCount").textContent =
        studentRegistration && studentRegistration.courses
            ? studentRegistration.courses.length
            : 0;


    // =====================================
    // DISPLAY REGISTERED COURSES
    // =====================================

    const registeredCoursesList =
        document.getElementById("registeredCoursesList");

    if (registeredCoursesList) {

        registeredCoursesList.innerHTML = "";

        if (
            studentRegistration &&
            studentRegistration.courses &&
            studentRegistration.courses.length > 0
        ) {

            studentRegistration.courses.forEach((course, index) => {

                const courseItem = document.createElement("div");
                courseItem.className = "admin-course-item";

                const courseName = document.createElement("h3");

                courseName.textContent =
                    (index + 1) + ". " +
                    (course.courseTitle || "Course Title");

                const courseCode = document.createElement("p");

                courseCode.textContent =
                    "Course Code: " + (course.courseCode || "N/A");

                const units = document.createElement("p");

                units.textContent =
                    "Credit Units: " + (course.creditUnits || 0);

                courseItem.append(courseName, courseCode, units);

                registeredCoursesList.appendChild(courseItem);

            });

        } else {

            registeredCoursesList.textContent =
                "You have not registered any courses yet.";

        }

    }


    // =====================================
    // STUDENT RESULT INFORMATION
    // =====================================

    document.getElementById("resultStudentName").textContent =
        student.fullname || "Not available";

    document.getElementById("resultStudentMatric").textContent =
        student.matric || "Not available";


    // =====================================
    // GRADE CALCULATION
    // =====================================

    function getGrade(total) {

        if (total >= 75) return "A";
        if (total >= 70) return "AB";
        if (total >= 65) return "B";
        if (total >= 60) return "BC";
        if (total >= 55) return "C";
        if (total >= 50) return "CD";
        if (total >= 45) return "D";
        if (total >= 40) return "E";

        return "F";

    }


    // =====================================
    // GRADE POINT CALCULATION
    // =====================================

    function getGradePoint(grade) {

        const points = {
            A: 4.0,
            AB: 3.5,
            B: 3.0,
            BC: 2.5,
            C: 2.0,
            CD: 1.5,
            D: 1.0,
            E: 0.5,
            F: 0.0
        };

        return points[String(grade || "").toUpperCase()] ?? 0;

    }


    // =====================================
    // AUTOMATIC REMARK CALCULATION
    // =====================================

    function getRemark(grade) {

        const remarks = {
            A: "Excellent",
            AB: "Excellent",
            B: "Very Good",
            BC: "Very Good",
            C: "Good",
            CD: "Good",
            D: "Pass",
            E: "Pass",
            F: "Fail"
        };

        return remarks[String(grade || "").toUpperCase()] || "N/A";

    }


    // =====================================
    // LOAD RESULTS AND CALCULATE GPA
    // =====================================

    function displayStudentResults() {

        const allResults = JSON.parse(
            localStorage.getItem("nacabsResults")
        ) || [];

        const studentResults = allResults.filter(result => {

            const resultMatric =
                result.matric ||
                result.studentMatric ||
                result.resultStudentMatric;

            return normalizeMatric(resultMatric) ===
                normalizeMatric(student.matric);

        });

        const resultsList =
            document.getElementById("studentResultsList");

        const resultStatus =
            document.getElementById("studentResultStatus");

        const resultStatusText =
            document.getElementById("studentResultStatusText");

        const sessionDisplay =
            document.getElementById("resultAcademicSession");

        const semesterDisplay =
            document.getElementById("resultAcademicSemester");

        resultsList.innerHTML = "";


        // CHECK WHETHER RESULTS EXIST

        if (studentResults.length === 0) {

            resultsList.innerHTML =
                "<p>No results uploaded for your matriculation number yet.</p>";

            resultStatus.textContent = "Pending";

            resultStatusText.textContent =
                "Awaiting uploaded results";

            sessionDisplay.textContent = "Not available";

            semesterDisplay.textContent = "Not available";

            return;

        }


        // UPDATE RESULT STATUS

        resultStatus.textContent = "Available";

        resultStatusText.textContent =
            studentResults.length + " result(s) uploaded";


        // DISPLAY LATEST SESSION AND SEMESTER

        const latestResult =
            studentResults[studentResults.length - 1];

        sessionDisplay.textContent =
            latestResult.session ||
            latestResult.academicSession ||
            "N/A";

        semesterDisplay.textContent =
            latestResult.semester || "N/A";


        // =====================================
        // CREATE RESULTS TABLE
        // =====================================

        const table = document.createElement("table");

        const thead = document.createElement("thead");

        const headerRow = document.createElement("tr");

        const headings = [
            "S/N",
            "Course Title",
            "Course Code",
            "CA",
            "Exam",
            "Total",
            "Grade",
            "Remark",
            "Credit Units"
        ];

        headings.forEach(heading => {

            const th = document.createElement("th");

            th.textContent = heading;

            headerRow.appendChild(th);

        });

        thead.appendChild(headerRow);

        const tbody = document.createElement("tbody");


        // GPA VARIABLES

        let totalGradePoints = 0;

        let totalCreditUnits = 0;


        studentResults.forEach((result, index) => {

            const ca = Number(result.ca ?? result.CA ?? 0);

            const exam = Number(
                result.exam ??
                result.examScore ??
                result.Exam ??
                0
            );

            const total = Number(
                result.total ??
                result.totalScore ??
                (ca + exam)
            );

            const grade =
                result.grade ||
                result.Grade ||
                getGrade(total);

            const remark =
                result.remark ||
                result.Remark ||
                getRemark(grade);


            // FIND COURSE CREDIT UNITS

            const registeredCourse =
                studentRegistration?.courses?.find(course =>

                    normalizeMatric(course.courseCode) ===
                    normalizeMatric(result.courseCode)

                    ||

                    normalizeMatric(course.courseTitle) ===
                    normalizeMatric(
                        result.courseTitle || result.title
                    )

                );

            const creditUnits = Number(
                result.creditUnits ??
                result.creditUnit ??
                result.units ??
                registeredCourse?.creditUnits ??
                0
            );

            const gradePoint = getGradePoint(grade);

            if (creditUnits > 0) {

                totalGradePoints += gradePoint * creditUnits;

                totalCreditUnits += creditUnits;

            }


            // CREATE TABLE ROW

            const row = document.createElement("tr");

            const values = [
                index + 1,
                result.courseTitle || result.title || "N/A",
                result.courseCode || "N/A",
                ca,
                exam,
                total,
                grade,
                remark,
                creditUnits || "N/A"
            ];

            values.forEach(value => {

                const td = document.createElement("td");

                td.textContent = value;

                row.appendChild(td);

            });

            tbody.appendChild(row);

        });

        table.append(thead, tbody);

        resultsList.appendChild(table);


        // =====================================
        // STUDENT RESULT SUMMARY
        // =====================================

        const gpaBox = document.createElement("div");

        gpaBox.style.marginTop = "20px";
        gpaBox.style.padding = "20px";
        gpaBox.style.backgroundColor = "#eef4ff";
        gpaBox.style.borderRadius = "8px";
        gpaBox.style.border = "1px solid #cbdaf5";

        const gpaHeading = document.createElement("h3");

        gpaHeading.textContent = "STUDENT RESULT SUMMARY";

        const courseCount = document.createElement("p");

        courseCount.textContent =
            "Total Courses: " + studentResults.length;

        const creditDisplay = document.createElement("p");

        creditDisplay.textContent =
            "Total Credit Units: " + totalCreditUnits;

        const gpaValue = document.createElement("h2");

        gpaValue.style.marginTop = "10px";
        gpaValue.style.color = "#174ea6";

        const performance = document.createElement("p");

        performance.style.marginTop = "10px";
        performance.style.fontWeight = "bold";


        if (totalCreditUnits > 0) {

            const gpa = totalGradePoints / totalCreditUnits;

            gpaValue.textContent =
                "GPA: " + gpa.toFixed(2) + " / 4.00";

            if (gpa >= 3.5) {

                performance.textContent =
                    "Overall Performance: Excellent";

            } else if (gpa >= 3.0) {

                performance.textContent =
                    "Overall Performance: Very Good";

            } else if (gpa >= 2.0) {

                performance.textContent =
                    "Overall Performance: Good";

            } else if (gpa >= 1.0) {

                performance.textContent =
                    "Overall Performance: Pass";

            } else {

                performance.textContent =
                    "Overall Performance: Needs Improvement";

            }

        } else {

            gpaValue.textContent = "GPA: Not available";

            performance.textContent =
                "Overall Performance: Not available";

        }

        gpaBox.append(
            gpaHeading,
            courseCount,
            creditDisplay,
            gpaValue,
            performance
        );

        resultsList.appendChild(gpaBox);


        // DISPLAY SESSION AND SEMESTER DETAILS

        const details = document.createElement("p");

        details.style.marginTop = "20px";
        details.style.fontWeight = "bold";

        details.textContent =
            "Academic Session: " +
            (latestResult.session ||
                latestResult.academicSession ||
                "N/A") +
            " | Semester: " +
            (latestResult.semester || "N/A");

        resultsList.appendChild(details);

    }


    // LOAD RESULTS WHEN DASHBOARD OPENS

    displayStudentResults();


    // =====================================
    // VIEW RESULTS BUTTON
    // =====================================

    document.getElementById("resultButton").addEventListener(
        "click",
        function() {

            displayStudentResults();

            document.getElementById("results").scrollIntoView({
                behavior: "smooth"
            });

        }
    );


    // =====================================
    // PASSPORT PHOTOGRAPH FUNCTIONS
    // =====================================

    const passportUpload =
        document.getElementById("passportUpload");

    const studentPassport =
        document.getElementById("studentPassport");

    const passportPlaceholder =
        document.getElementById("passportPlaceholder");

    const passportMessage =
        document.getElementById("passportMessage");


    // DISPLAY PASSPORT

    function displayPassport(photo) {

        if (photo) {

            studentPassport.src = photo;

            studentPassport.style.display = "block";

            passportPlaceholder.style.display = "none";

        } else {

            studentPassport.style.display = "none";

            passportPlaceholder.style.display = "flex";

        }

    }


    // LOAD SAVED PASSPORT FROM REGISTERED STUDENT RECORD

    if (registeredStudent && registeredStudent.passportPhoto) {

        student.passportPhoto = registeredStudent.passportPhoto;

        localStorage.setItem(
            "nacabsStudent",
            JSON.stringify(student)
        );

        displayPassport(registeredStudent.passportPhoto);

    } else if (student.passportPhoto) {

        displayPassport(student.passportPhoto);

    } else {

        displayPassport("");

    }


    // =====================================
    // UPLOAD AND SAVE PASSPORT
    // =====================================

    if (passportUpload) {

        passportUpload.addEventListener("change", function() {

            const file = this.files[0];

            if (!file) return;


            // CHECK IMAGE FORMAT

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (!allowedTypes.includes(file.type)) {

                passportMessage.textContent =
                    "Please select a JPG, PNG or WEBP image.";

                passportMessage.style.color = "red";

                this.value = "";

                return;

            }


            // CHECK IMAGE SIZE

            if (file.size > 1024 * 1024) {

                passportMessage.textContent =
                    "Image is too large. Please select an image below 1MB.";

                passportMessage.style.color = "red";

                this.value = "";

                return;

            }


            // READ IMAGE

            const reader = new FileReader();

            reader.onload = function(event) {

                const photo = event.target.result;

                try {

                    // GET LATEST STUDENT RECORDS

                    let currentStudents = JSON.parse(
                        localStorage.getItem("nacabsStudents")
                    ) || [];


                    // FIND CURRENT STUDENT

                    const studentIndex = currentStudents.findIndex(item =>

                        normalizeMatric(item.matric) ===
                        normalizeMatric(student.matric)

                    );


                    if (studentIndex === -1) {

                        passportMessage.textContent =
                            "Student account could not be found.";

                        passportMessage.style.color = "red";

                        return;

                    }


                    // SAVE PASSPORT TO STUDENT RECORD

                    currentStudents[studentIndex].passportPhoto = photo;

                    localStorage.setItem(
                        "nacabsStudents",
                        JSON.stringify(currentStudents)
                    );


                    // UPDATE CURRENT SESSION

                    student.passportPhoto = photo;

                    localStorage.setItem(
                        "nacabsStudent",
                        JSON.stringify(student)
                    );


                    // UPDATE DISPLAY

                    registeredStudent = currentStudents[studentIndex];

                    displayPassport(photo);

                    passportMessage.textContent =
                        "Passport photograph uploaded successfully!";

                    passportMessage.style.color = "green";

                } catch (error) {

                    passportMessage.textContent =
                        "Unable to save photograph. Please try a smaller image.";

                    passportMessage.style.color = "red";

                }

            };


            reader.onerror = function() {

                passportMessage.textContent =
                    "Unable to read this image. Please try another one.";

                passportMessage.style.color = "red";

            };


            reader.readAsDataURL(file);

        });

    }

}


// =====================================
// COURSE REGISTRATION BUTTON
// =====================================

document.getElementById("courseButton").addEventListener(
    "click",
    function() {

        window.location.href = "course.html";

    }
);


// =====================================
// SCHOOL FEES BUTTON
// =====================================

const feesButton = document.getElementById("feesButton");
const feesMessage = document.getElementById("feesMessage");

if (feesButton && feesMessage) {

    feesButton.addEventListener("click", function() {

        // GET THE CURRENT STUDENT

        const currentStudent = JSON.parse(
            localStorage.getItem("nacabsStudent")
        );

        if (!currentStudent) {

            feesMessage.textContent =
                "Student information could not be found. Please log in again.";

            return;

        }


        // GET SAVED FEE RECORDS

        const allFees = JSON.parse(
            localStorage.getItem("nacabsFees")
        ) || [];


        // NORMALIZE MATRIC NUMBERS FOR MATCHING

        function normalizeFeeMatric(value) {

            return String(value || "").trim().toUpperCase();

        }


        const currentMatric = normalizeFeeMatric(
            currentStudent.matric ||
            currentStudent.matricNumber ||
            currentStudent.matricNo
        );


        // FIND THIS STUDENT'S FEE RECORDS

        const studentFees = allFees.filter(function(fee) {

            const feeMatric =
                fee.matricNumber ||
                fee.matric ||
                fee.studentMatric ||
                fee.studentMatricNumber;

            return normalizeFeeMatric(feeMatric) === currentMatric;

        });


        // CLEAR PREVIOUS DISPLAY

        feesMessage.innerHTML = "";

        if (studentFees.length === 0) {

            feesMessage.textContent =
                "No school fee record was found for your account. Please contact the administrator.";

            return;

        }


        // DISPLAY EACH ACADEMIC SESSION

        studentFees.forEach(function(fee) {

            const total = Number(
                fee.totalFees ??
                fee.totalSchoolFees ??
                fee.totalAmount ??
                0
            );

            const paid = Number(
                fee.amountPaid ??
                fee.paidAmount ??
                0
            );

            const balance = Math.max(0, total - paid);

            let status = fee.status || "";


            // CALCULATE STATUS IF IT WAS NOT SAVED IN THE RECORD

            if (!status) {

                if (total > 0 && paid >= total) {

                    status = "Paid";

                } else if (paid > 0) {

                    status = "Part Payment";

                } else {

                    status = "Unpaid";

                }

            }


            const record = document.createElement("div");

            record.className = "fee-record";
            record.style.padding = "16px";
            record.style.margin = "12px 0";
            record.style.border = "1px solid #d8e0ea";
            record.style.borderRadius = "8px";
            record.style.backgroundColor = "#ffffff";


            const heading = document.createElement("h3");

            heading.textContent =
                "Academic Session: " +
                (fee.academicSession || fee.session || "Not specified");


            const totalLine = document.createElement("p");

            totalLine.textContent =
                "Total School Fees: ₦" + total.toLocaleString("en-NG");


            const paidLine = document.createElement("p");

            paidLine.textContent =
                "Amount Paid: ₦" + paid.toLocaleString("en-NG");


            const balanceLine = document.createElement("p");

            balanceLine.textContent =
                "Outstanding Balance: ₦" + balance.toLocaleString("en-NG");


            const statusLine = document.createElement("p");

            statusLine.textContent = "Payment Status: " + status;
            statusLine.style.fontWeight = "bold";


            if (status.toLowerCase() === "paid") {

                statusLine.style.color = "green";

            } else if (status.toLowerCase().includes("part")) {

                statusLine.style.color = "#b77900";

            } else {

                statusLine.style.color = "red";

            }


            record.append(
                heading,
                totalLine,
                paidLine,
                balanceLine,
                statusLine
            );

            feesMessage.appendChild(record);

        });

    });

}


// =====================================
// STUDENT LOGOUT
// =====================================

document.getElementById("logoutButton").addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        localStorage.removeItem("nacabsLoggedIn");

        localStorage.removeItem("nacabsStudent");

        window.location.href = "login.html";

    }
);


// =====================================
// PRINT FULL STUDENT DASHBOARD
// =====================================

const printResultButton =
    document.getElementById("printResultButton");

if (printResultButton) {

    printResultButton.addEventListener("click", function() {

        // Add temporary print heading
        const printHeader = document.createElement("div");

        printHeader.id = "printHeader";

        printHeader.innerHTML = `
            <h1>NACABS POLYTECHNIC</h1>
            <h2>KABAYI STUDY CENTER</h2>
            <p>STUDENT ACADEMIC RECORD</p>
            <hr>
        `;

        document.body.insertBefore(
            printHeader,
            document.body.firstChild
        );

        window.print();

        // Remove heading after printing
        setTimeout(function() {

            printHeader.remove();

        }, 1000);

    });

}
document.getElementById("printResultButton").addEventListener(
    "click",
    function() {

        const results = JSON.parse(
            localStorage.getItem("nacabsResults")
        ) || [];

        const currentStudent = JSON.parse(
            localStorage.getItem("nacabsStudent")
        );

        const studentResults = results.filter(result => {

            const matric =
                result.matric ||
                result.studentMatric ||
                result.resultStudentMatric;

            return String(matric || "").trim().toUpperCase() ===
                String(currentStudent?.matric || "").trim().toUpperCase();

        });

        if (studentResults.length === 0) {

            alert("No examination result is available for printing yet.");

            return;

        }

        window.print();

    }
);


// =====================================
// CHANGE STUDENT PASSWORD
// =====================================

const changePasswordForm =
    document.getElementById("changePasswordForm");

if (changePasswordForm) {

    changePasswordForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const currentPassword =
            document.getElementById("currentPassword").value;

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const passwordMessage =
            document.getElementById("passwordMessage");


        // GET STUDENT RECORDS

        const students = JSON.parse(
            localStorage.getItem("nacabsStudents")
        ) || [];

        const currentStudent = JSON.parse(
            localStorage.getItem("nacabsStudent")
        );


        const studentIndex = students.findIndex(item =>

            String(item.matric || "").trim().toUpperCase() ===
            String(currentStudent?.matric || "").trim().toUpperCase()

        );


        if (studentIndex === -1) {

            passwordMessage.textContent =
                "Student account could not be found.";

            passwordMessage.style.color = "red";

            return;

        }


        // CHECK CURRENT PASSWORD

        if (students[studentIndex].password !== currentPassword) {

            passwordMessage.textContent =
                "Your current password is incorrect.";

            passwordMessage.style.color = "red";

            return;

        }


        // CHECK NEW PASSWORD LENGTH

        if (newPassword.length < 6) {

            passwordMessage.textContent =
                "New password must contain at least 6 characters.";

            passwordMessage.style.color = "red";

            return;

        }


        // CHECK PASSWORD CONFIRMATION

        if (newPassword !== confirmPassword) {

            passwordMessage.textContent =
                "New password and confirmation do not match.";

            passwordMessage.style.color = "red";

            return;

        }


        // UPDATE PASSWORD

        students[studentIndex].password = newPassword;

        localStorage.setItem(
            "nacabsStudents",
            JSON.stringify(students)
        );


        passwordMessage.textContent =
            "Password changed successfully!";

        passwordMessage.style.color = "green";

        changePasswordForm.reset();

    });

}
// =====================================
// STUDENT PAYMENT HISTORY
// =====================================

const paymentHistoryButton =
    document.getElementById("paymentHistoryButton");

const paymentHistoryMessage =
    document.getElementById("paymentHistoryMessage");

const studentPaymentHistory =
    document.getElementById("studentPaymentHistory");


// =====================================
// DISPLAY PAYMENT HISTORY
// =====================================


function displayStudentPaymentHistory(payments) {

    studentPaymentHistory.innerHTML = "";

    if (!payments || payments.length === 0) {
        studentPaymentHistory.textContent =
            "You have not made any payment yet.";
        return;
    }

    const currentStudent = JSON.parse(
        localStorage.getItem("nacabsStudent") || "null"
    );

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, function(char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    [
        "S/N",
        "Academic Session",
        "Amount",
        "Reference",
        "Payment Date",
        "Status",
        "Receipt"
    ].forEach(function(heading) {
        const th = document.createElement("th");
        th.textContent = heading;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    const tbody = document.createElement("tbody");

    payments.forEach(function(payment, index) {

        const row = document.createElement("tr");

        const amount = Number(
            payment.amount || payment.amountPaid || 0
        );

        const reference =
            payment.reference ||
            payment.transactionReference ||
            "N/A";

        const session =
            payment.session ||
            payment.academicSession ||
            "N/A";

        const dateValue =
            payment.paymentDate ||
            payment.createdAt ||
            payment.date;

        let formattedDate = "N/A";

        if (dateValue) {
            const date = new Date(dateValue);

            if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleDateString("en-NG");
            }
        }

        const status = payment.status || "Pending";

        const values = [
            index + 1,
            session,
            "₦" + amount.toLocaleString("en-NG"),
            reference,
            formattedDate,
            status
        ];

        values.forEach(function(value, cellIndex) {

            const td = document.createElement("td");
            td.textContent = value;

            if (cellIndex === 5) {
                td.style.fontWeight = "bold";

                if (String(status).toLowerCase() === "approved") {
                    td.style.color = "green";
                } else if (
                    String(status).toLowerCase() === "rejected"
                ) {
                    td.style.color = "red";
                } else {
                    td.style.color = "#b77900";
                }
            }

            row.appendChild(td);
        });

        // RECEIPT BUTTON

        const receiptCell = document.createElement("td");

        if (String(status).toLowerCase() === "approved") {

            const receiptButton = document.createElement("button");

            receiptButton.textContent = "Print Receipt";
            receiptButton.className = "print-receipt-btn";

            receiptButton.type = "button";

            receiptButton.addEventListener("click", function() {

                const receiptWindow = window.open("", "_blank");

                if (!receiptWindow) {
                    alert("Please allow pop-ups to print your receipt.");
                    return;
                }

                const receiptHTML = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Payment Receipt</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                padding: 35px;
                                color: #222;
                            }

                            .receipt {
                                max-width: 650px;
                                margin: auto;
                                border: 2px solid #174ea6;
                                padding: 30px;
                            }

                            h1, h2 {
                                text-align: center;
                            }

                            h1 {
                                color: #174ea6;
                            }

                            .approved {
                                color: green;
                                font-weight: bold;
                                text-align: center;
                            }

                            .details {
                                margin-top: 25px;
                            }

                            .details p {
                                padding: 10px 0;
                                border-bottom: 1px solid #ddd;
                            }

                            .footer {
                                text-align: center;
                                margin-top: 30px;
                            }

                            @media print {
                                button {
                                    display: none;
                                }
                            }
                        </style>
                    </head>

                    <body>
                        <div class="receipt">

                            <h1>NACABS POLYTECHNIC</h1>
                            <h2>KABAYI STUDY CENTER</h2>

                            <h2>OFFICIAL PAYMENT RECEIPT</h2>

                            <p class="approved">
                                PAYMENT APPROVED
                            </p>

                            <div class="details">

                                <p><strong>Student Name:</strong>
                                    ${escapeHTML(currentStudent.fullname || "N/A")}
                                </p>

                                <p><strong>Matric Number:</strong>
                                    ${escapeHTML(currentStudent.matric || "N/A")}
                                </p>

                                <p><strong>Academic Session:</strong>
                                    ${escapeHTML(session)}
                                </p>

                                <p><strong>Amount Paid:</strong>
                                    ₦${amount.toLocaleString("en-NG")}
                                </p>

                                <p><strong>Payment Reference:</strong>
                                    ${escapeHTML(reference)}
                                </p>

                                <p><strong>Payment Date:</strong>
                                    ${escapeHTML(formattedDate)}
                                </p>

                                <p><strong>Payment Status:</strong>
                                    Approved
                                </p>

                            </div>

                            <div class="footer">
                                <p>Thank you for your payment.</p>
                                <p>Keep this receipt for your records.</p>
                            </div>

                            <button onclick="window.print()">
                                Print Receipt
                            </button>

                        </div>
                    </body>
                    </html>
                `;

                receiptWindow.document.write(receiptHTML);
                receiptWindow.document.close();

            });

            receiptCell.appendChild(receiptButton);

        } else {

            receiptCell.textContent = "Not available";

        }

        row.appendChild(receiptCell);
        tbody.appendChild(row);

    });

    table.append(thead, tbody);
    studentPaymentHistory.appendChild(table);
}



// =====================================
// LOAD PAYMENT HISTORY FROM SERVER
// =====================================

if (paymentHistoryButton) {

    paymentHistoryButton.addEventListener(
        "click",
        async function() {

            const currentStudent = JSON.parse(
                localStorage.getItem("nacabsStudent") || "null"
            );

            if (!currentStudent || !currentStudent.matric) {

                paymentHistoryMessage.textContent =
                    "Student information could not be found. Please log in again.";

                paymentHistoryMessage.style.color = "red";

                return;
            }

            const matric = currentStudent.matric.trim();

            paymentHistoryButton.disabled = true;

            paymentHistoryButton.textContent =
                "Loading payment history...";

            paymentHistoryMessage.textContent = "";

            studentPaymentHistory.innerHTML = "";

            try {

                const response = await fetch(
                    "http://localhost:5000/api/payments/student/" +
                    encodeURIComponent(matric)
                );

                const result = await response.json();

                if (!response.ok || result.success === false) {

                    throw new Error(
                        result.message ||
                        "Unable to retrieve payment history."
                    );
                }

                const payments = result.payments || [];

                paymentHistoryMessage.textContent =
                    "Total payment records: " +
                    (result.totalPayments ?? payments.length);

                paymentHistoryMessage.style.color = "green";

                displayStudentPaymentHistory(payments);

            } catch (error) {

                paymentHistoryMessage.textContent =
                    "Unable to load payment history. Please make sure the server is running and try again.";

                paymentHistoryMessage.style.color = "red";

                console.error("Payment history error:", error);

            } finally {

                paymentHistoryButton.disabled = false;

                paymentHistoryButton.textContent =
                    "Refresh Payment History";

            }

        }
    );

}

// =====================================
// NACABS POLYTECHNIC
// UNIVERSAL PASSWORD SHOW/HIDE FEATURE
// =====================================

function addPasswordToggles() {

    const passwordFields = document.querySelectorAll(
        'input[type="password"]'
    );

    passwordFields.forEach(function(input) {

        // PREVENT DUPLICATE EYE ICONS
        if (input.dataset.toggleAdded === "true") {
            return;
        }

        input.dataset.toggleAdded = "true";

        // CREATE PASSWORD WRAPPER
        const wrapper = document.createElement("div");

        wrapper.className = "password-toggle-wrapper";

        // INSERT WRAPPER
        input.parentNode.insertBefore(wrapper, input);

        wrapper.appendChild(input);

        // CREATE EYE BUTTON
        const button = document.createElement("button");

        button.type = "button";
        button.className = "password-toggle-button";
        button.textContent = "👁";
        button.title = "Show password";
        button.setAttribute("aria-label", "Show password");

        wrapper.appendChild(button);

        // SHOW OR HIDE PASSWORD
        button.addEventListener("click", function() {

            if (input.type === "password") {

                input.type = "text";
                button.textContent = "🙈";
                button.title = "Hide password";
                button.setAttribute("aria-label", "Hide password");

            } else {

                input.type = "password";
                button.textContent = "👁";
                button.title = "Show password";
                button.setAttribute("aria-label", "Show password");

            }

        });

    });

}


// RUN WHEN PAGE IS READY
if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", addPasswordToggles);

} else {

    addPasswordToggles();

}

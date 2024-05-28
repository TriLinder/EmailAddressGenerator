document.addEventListener("DOMContentLoaded", function() {
    const statusElement = document.querySelector("#status");
    const emailAddressElement = document.querySelector("#email-address");
    const copyButtonElement = document.querySelector("#copy-button");

    let currentEmailAddress = "";

    function showStatus(status, timeout=800) {
        emailAddressElement.style.display = "none";
        statusElement.style.display = "inherit";
        statusElement.innerText = status;

        setTimeout(function() {
            emailAddressElement.style.display = "inherit";
            statusElement.style.display = "none";
        }, timeout);
    }

    async function copy() {
        try {
            await navigator.clipboard.writeText(currentEmailAddress);

            showStatus("Copied! 🙂");
        } catch(e) {
            showStatus(e, 5000);
        }
    }

    async function update() {
        try {
            currentEmailAddress = await generateEmailAddress();
            emailAddressElement.innerText = currentEmailAddress;
        } catch(e) {
            showStatus(e, 5000);
        }
        
        setTimeout(update, 250);
    }

    update();
    copyButtonElement.addEventListener("click", copy);
    emailAddressElement.addEventListener("click", copy);
});

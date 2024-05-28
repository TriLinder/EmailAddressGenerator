document.addEventListener("keydown", async function(event) {
    // Detect the `CTRL + ALT + E` shortcut
    if (event.ctrlKey && event.altKey && event.key == "e") {
        // Fill out the active element's value
        const activeElement = document.activeElement;
        activeElement.value = await generateEmailAddress();
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const errorTextElement = document.querySelector("#error");
    const inputElement = document.querySelector("input");
    const setButton = document.querySelector("button");

    async function load() {
        inputElement.value = await getEmailDomain();
        inputElement.disabled = false;
        await save();
    }

    async function save() {
        try {
            await browser.storage.local.set({
                emailDomain: inputElement.value
            });

            console.log("Value set");
        } catch(e) {
            errorTextElement.innerText = e;
        }
    }

    load();
    setButton.addEventListener("click", save);
});
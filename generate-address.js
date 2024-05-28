const TIME_0 = new Date("2024-05-01");

const FORMAT_VERSION = "a"
const CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789_";

function dateToNumber(date) {
    return Math.floor(date / 1000);
}

function encode(num) {
    let encoded = "";

    while (num > 0) {
        encoded = CHARACTERS[num % CHARACTERS.length] + encoded;
        num = Math.floor(num / CHARACTERS.length);
    }
    return encoded;
}

function decode(encoded) {
    let decoded = 0;
    
    for (let i = 0; i < encoded.length; i++) {
        let charIndex = CHARACTERS.indexOf(encoded[i]);
        decoded = decoded * CHARACTERS.length + charIndex;
    }
    
    return decoded;
}

async function getCurrentTabUrl() {
    if (!document.location.protocol.includes("extension")) {
        return document.location.href;
    }
    
    try {
        // Query the current active tab
        const tabs = await browser.tabs.query({active: true, currentWindow: true});
        
        // Get the URL of the first tab in the array (there should be only one)
        const tab = tabs[0];
        const url = tab.url;
        return url;
    } catch (error) {
        console.error('Error getting current tab location:', error);
        return null;
    }
}

function urlToSiteIdentificator(url) {
    const a = document.createElement("a");
    a.href = url;

    const identificator = a.hostname.replace(/^www\./, "").replaceAll(".", "-");

    if (!identificator) {
        return "unknown";
    }

    return identificator;
}

async function getEmailDomain() {
    try {
        const emailDomain = (await browser.storage.local.get()).emailDomain;

        if (typeof(emailDomain) == "string") {
            return emailDomain;
        } else {
            return "example.com";
        }
    } catch(e) {
        return e;
    }
}

async function generateEmailAddress() { 
    const siteIdentificator = urlToSiteIdentificator(await getCurrentTabUrl());
    const encodedTimestamp = encode(dateToNumber(Date.now()) - dateToNumber(TIME_0));
    const emailDomain = await getEmailDomain();

    return `${siteIdentificator}.${encodedTimestamp}${FORMAT_VERSION}@${emailDomain}`;
}

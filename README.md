<h1 align="center">Email Address Generator</h1>

<p align="center">
    <a src="https://addons.mozilla.org/en-US/firefox/addon/email-address-generator/">
        <img src="README_ASSETS/firefox-badge.svg" alt="Get the addon for Mozilla Firefox" height="60">
    </a>
</p>

An addon for generating unique email aliases for a domain with a catch-all email address set-up.

## Screenshots

## The format

The email addresses are generated in the following format:

```xml
<site-identifier>.<encoded-timestamp><format-version>@<email-domain>
```

### Components

1. **Site identifier:**
   
   - Derived from the hostname of the current site
   - Dots are replaced with hypens
   - The `www.` prefix is removed
   - Example: `https://www.mail.google.com` -> `mail-google-com`

2. **Encoded timestamp:**
   
   - Represents the time the email address was generated in seconds since **May 1st 2024 00:00 UTC**
   
   - The value is encoded into a string using this alphabet `abcdefghijklmnopqrstuvwxyz0123456789_`
     
     ```javascript
     const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789_";
     
     function encodeTimestamp(num) {
         let encoded = "";
     
         while (num > 0) {
             encoded = ALPHABET[num % ALPHABET.length] + encoded;
             num = Math.floor(num / ALPHABET.length);
         }
     
         return encoded;
     }
     
     function decodeTimestamp(encoded) {
         let decoded = 0;
     
         for (let i = 0; i < encoded.length; i++) {
             let charIndex = ALPHABET.indexOf(encoded[i]);
             decoded = decoded * ALPHABET.length + charIndex;
         }
     
         return decoded;
     }
     ```

3. **Format version identifier**:
   
   - Current value: `a`
   - Subject to change in the future (allows future extensions to the format)

4. **Email domain**
   
   - Your email domain
   - Set in the extension's options page

Example of an email address: `mail-google-com.d2l8da@example.com`
The code for generating addresses can be found [here](/generate-address.js) (in the `generate-address.js` file).
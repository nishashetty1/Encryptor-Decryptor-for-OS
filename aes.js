function encryptText() {
    const key = document.getElementById('key').value;
    const text = document.getElementById('text').value;
    
    if (!key || !text) {
        alert("Please provide both a secret key and text to encrypt.");
        return;
    }
    
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    document.getElementById('result').value = encrypted;
}

function decryptText() {
    const key = document.getElementById('key').value;
    const encryptedText = document.getElementById('result').value;
    
    if (!key || !encryptedText) {
        alert("Please provide both a secret key and encrypted text to decrypt.");
        return;
    }
    
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedText) {
        alert("Decryption failed. Please check your key and the encrypted text.");
    } else {
        document.getElementById('result').value = decryptedText;
    }
}

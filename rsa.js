let publicKey;
let privateKey;

function generateKeys() {
    const { pki } = forge;
    const keypair = pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
    publicKey = pki.publicKeyToPem(keypair.publicKey);
    privateKey = pki.privateKeyToPem(keypair.privateKey);
    
    document.getElementById('publicKey').value = publicKey;
    document.getElementById('privateKey').value = privateKey;
}

function encryptText() {
    const text = document.getElementById('text').value;
    
    if (!publicKey || !text) {
        alert("Please generate a key pair and provide text to encrypt.");
        return;
    }

    const { pki, util } = forge;
    const publicKeyObj = pki.publicKeyFromPem(publicKey);
    const encrypted = publicKeyObj.encrypt(text, 'RSA-OAEP');

    document.getElementById('result').value = forge.util.encode64(encrypted);
}

function decryptText() {
    const encryptedText = document.getElementById('result').value;

    if (!privateKey || !encryptedText) {
        alert("Please generate a key pair and provide encrypted text to decrypt.");
        return;
    }

    const { pki, util } = forge;
    const privateKeyObj = pki.privateKeyFromPem(privateKey);
    const decrypted = privateKeyObj.decrypt(forge.util.decode64(encryptedText), 'RSA-OAEP');

    document.getElementById('result').value = decrypted;
}

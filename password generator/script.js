const charset = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","!","£","$","%","&","*","@","#","/","+",",","=","-","_"];
const password = document.getElementById("generated_password");
const password_button = document.getElementById("generate_password_button")
const copy_button = document.getElementById("img_clipboard")

function generate() {
    let generated_password = "";
    for (let i = 0; i < 20; i++) {
        let x = 0;
        x = Math.floor(Math.random() * 76);
        generated_password += charset[x];
    };
    password.innerText = generated_password
};

function copy_to_clipboard() {
    navigator.clipboard.writeText(password.innerText)
    alert("Password copied to clipboard")
}

password_button.addEventListener("click", generate);
copy_button.addEventListener("click", copy_to_clipboard)
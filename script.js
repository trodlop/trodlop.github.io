// import * as THREE from "https://threejs.org/"
// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js" // Imports js library to work with 3d objects
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js" // Imports controls to let the camera move around
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js"


const cube_wireframe = document.getElementById("cube_wireframe");
const project_1 = document.getElementById("project_1");
const project_2 = document.getElementById("project_2");
const project_3 = document.getElementById("project_3");
const project_4 = document.getElementById("project_4")

const main_heading_div = document.getElementById("main_heading_div")
const signature = document.getElementById("tristan_rodriguez")
const menu = document.getElementById("menu")

const password = document.getElementById("password_animation")
var char1 = document.getElementById("char1")
var char2 = document.getElementById("char2")
var char3 = document.getElementById("char3")
var char4 = document.getElementById("char4")
var char5 = document.getElementById("char5")
var char6 = document.getElementById("char6")
var char7 = document.getElementById("char7")
var char8 = document.getElementById("char8")

const city = document.getElementById("city_icon")

const copy = document.getElementById("copy_clipboard")

// // Used when checking scroll direction
// var old_scrollY = window.scrollY

const charset = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","!","£","$","%","&","*","@","#","/","+",",","=","-","_"];

shrunk = false

function shrink_signature() {

    // // Grows when scroll up, shrinks when scroll down    
    // if (window.scrollY > old_scrollY) { 

    //     if (shrunk != true) {
    //         signature.style.animationName = "signature_shrink"
    //         signature.style.animationDuration = "0.5s"
    //         signature.style.animationFillMode = "forwards";
    //         menu.style.marginTop = "50px"
    //         main_heading_div.style.animationName = "main_heading_div_shrink"
    //         main_heading_div.style.animationDuration = "0.5s"
    //         main_heading_div.style.animationFillMode = "forwards";
    //     }
    //     shrunk = true

    // }
    // else if (window.scrollY < old_scrollY) {
        
    //     if (shrunk != false) {
    //         signature.style.animationName = "signature_grow"
    //         signature.style.animationDuration = "0.5s"
    //         signature.style.animationFillMode = "forwards";
    //         menu.style.marginTop = "100px"
    //         main_heading_div.style.animationName = "main_heading_div_grow"
    //         main_heading_div.style.animationDuration = "0.5s"
    //         main_heading_div.style.animationFillMode = "forwards";
    //     }
    //     shrunk = false

    // };

    // old_scrollY = window.scrollY

    // Grows when scroll to top, shrinks when scroll down
    if (window.scrollY > 50) { 

        if (shrunk != true) {
            signature.style.animationName = "signature_shrink";
            signature.style.animationDuration = "0.5s";
            signature.style.animationFillMode = "forwards";
            menu.style.animationName = "menu_shrink"
            menu.style.animationDuration = "0.5s";
            menu.style.animationFillMode = "forwards";
            main_heading_div.style.animationName = "main_heading_div_shrink";
            main_heading_div.style.animationDuration = "0.5s";
            main_heading_div.style.animationFillMode = "forwards";
        }
        shrunk = true;

    };
};

function grow_signature() {
    if (window.scrollY < 50) {
        
        if (shrunk != false) {
            signature.style.animationName = "signature_grow";
            signature.style.animationDuration = "0.5s";
            signature.style.animationFillMode = "forwards";
            menu.style.animationName = "menu_grow"
            menu.style.animationDuration = "0.5s";
            menu.style.animationFillMode = "forwards";
            main_heading_div.style.animationName = "main_heading_div_grow";
            main_heading_div.style.animationDuration = "0.5s";
            main_heading_div.style.animationFillMode = "forwards";
        }
        shrunk = false;

    };
};

document.addEventListener("scroll",shrink_signature)
document.addEventListener("scroll",grow_signature)

function project1_hover() {
    cube_wireframe.style.animationName = "cube_wireframe_hover";
    cube_wireframe.style.animationDuration = "1s";
    cube_wireframe.style.animationFillMode = "forwards";
};

function project1_not_hover() {
    cube_wireframe.style.animationName = "cube_wireframe_not_hover";
    cube_wireframe.style.animationDuration = "1s";
    cube_wireframe.style.animationFillMode = "forwards";
};

project_1.addEventListener("mouseover",project1_hover);
project_1.addEventListener("mouseout",project1_not_hover);

function project2_hover() {

    password.style.animationName = "password_grow"
    password.style.animationDuration = "1s"
    password.style.animationFillMode = "forwards";

    i = Math.floor(Math.random() * 76);
    char1.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char2.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char3.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char4.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char5.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char6.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char7.innerText = `${charset[i]}`
    i = Math.floor(Math.random() * 76);
    char8.innerText = `${charset[i]}` 

};

function project2_not_hover() {

    password.style.animationName = "password_shrink"
    password.style.animationDuration = "1s"
    password.style.animationFillMode = "forwards";
    
    char1.innerText = ""
    char2.innerText = ""
    char3.innerText = ""
    char4.innerText = ""
    char5.innerText = ""
    char6.innerText = ""
    char7.innerText = ""
    char8.innerText = ""

};

project_2.addEventListener("mouseover",project2_hover)
project_2.addEventListener("mouseout",project2_not_hover)

function project4_hover() {
    city.src = "images/icon lit.png"
    city.style.animationName = "city_icon_grow"
    city.style.animationDuration = "1s"
    city.style.animationFillMode = "forwards";
}

function project4_not_hover() {
    city.src = "images/icon white.png"
    city.style.animationName = "city_icon_shrink"
    city.style.animationDuration = "1s"
    city.style.animationFillMode = "forwards";
}

project_4.addEventListener("mouseover",project4_hover)
project_4.addEventListener("mouseout",project4_not_hover)

// // Typewriting effect test
// var i = 0;
// var txt = "Test sentence"
// var speed = 100;

// function typewrite () {
//     if (i < txt.length) {
//         typewrite_p.innerText += txt[i];
//         i++;
//         setTimeout(typewrite, speed);
//       }
// };

// document.addEventListener("click",typewrite)
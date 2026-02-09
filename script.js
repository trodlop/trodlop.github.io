// import * as THREE from "https://threejs.org/"
// import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js" // Imports js library to work with 3d objects
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js" // Imports controls to let the camera move around
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js"

async function get_commit_count(username) {
    const url = `https://api.github.com/search/commits?q=author:${username}`;
    const headers = {
        'Accept': 'application/vnd.github.cloak-preview' // Required header for the commit search API   (•ิ_•ิ)?
    };
    
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();

        return data.total_count;
    } catch (error) {
        console.error('Error fetching github commit count:', error);
        return null;
    }
};
let commit_count;
get_commit_count('trodlop').then(commitCount => {
    if (commitCount != undefined) {
        commit_count = commitCount;
    }
    else {
        commit_count = "--";
    };
});

document.addEventListener("DOMContentLoaded", () => {
    // Wait 2 seconds before starting the typewriter effect
    fun_facts_typewrite();
});

function delay(ms) { // Function to allow functions to be paused midway through
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function fun_facts_typewrite() { // Needs to be an asymchronous function so that it can be paused halfway through
    const element1 = document.getElementById("coffees_this_month");
    element1.innerText = "";
    element1.classList.remove("no-caret");
    const element2 = document.getElementById("lines_of_code");
    element2.innerText = "";
    element2.classList.remove("no-caret");
    const element3 = document.getElementById("github_commits");
    element3.innerText = "";
    element3.classList.remove("no-caret");
    let index = 0;

    await delay(3000); // pauses for 3 seconds

    const text1 = "23";
    const text2 = "14,500";
    const text3 = `${commit_count}`;
    const loops = text1.length + text2.length + text3.length;

    function typewrite() {
        
        if (index < text1.length) {
            // text += text1[index];
            element1.innerText += text1[index];
        }
        else if (index < text1.length + text2.length) {
            element2.innerText += text2[index - text1.length];
            element1.classList.add("no-caret");
        }
        else if (index < text1.length + text2.length + text3.length) {
            element3.innerText += text3[index - (text1.length + text2.length)];
            element2.classList.add("no-caret");
        }
        index++;

        if (index < loops) {
            setTimeout(typewrite, 150);
        }
        else {
            element3.classList.add("no-caret");
            return
        };
    };
    
    typewrite();
    setTimeout(fun_facts_typewrite, 20000);
};

const cube_wireframe = document.getElementById("cube_wireframe");
const project_1 = document.getElementById("project_1");
const project_2 = document.getElementById("project_2");
const project_3 = document.getElementById("project_3");
const project_4 = document.getElementById("project_4");
const project_5 = document.getElementById("project_5");

const main_heading_div = document.getElementById("main_heading_div");
const signature = document.getElementById("tristan_rodriguez");
const menu = document.getElementById("menu");

const audio_level = document.getElementById("audio_level_animation");
var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var bar3 = document.getElementById("bar3");
var bar4 = document.getElementById("bar4");
var bar5 = document.getElementById("bar5");
var bar6 = document.getElementById("bar6");
var bar7 = document.getElementById("bar7");
var bar8 = document.getElementById("bar8");

const calc = document.getElementById("calculator_icon");

const city = document.getElementById("city_icon");

const password = document.getElementById("password_animation");
var char1 = document.getElementById("char1");
var char2 = document.getElementById("char2");
var char3 = document.getElementById("char3");
var char4 = document.getElementById("char4");
var char5 = document.getElementById("char5");
var char6 = document.getElementById("char6");
var char7 = document.getElementById("char7");
var char8 = document.getElementById("char8");

const copy = document.getElementById("copy_clipboard");

const charset = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","!","£","$","%","&","*","@","#","/","+",",","=","-","_"];

shrunk = false;

function shrink_signature() {
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
document.addEventListener("scroll",shrink_signature);
document.addEventListener("scroll",grow_signature);

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

    i = Math.floor(Math.random() * 30 + 5);
    bar1.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar2.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar3.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar4.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar5.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar6.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar7.style.height = `${i}px`;
    i = Math.floor(Math.random() * 30 + 5);
    bar8.style.height = `${i}px`;

};

function project2_not_hover() {
    
    bar1.style.height = "5px"
    bar2.style.height = "5px"
    bar3.style.height = "5px"
    bar4.style.height = "5px"
    bar5.style.height = "5px"
    bar6.style.height = "5px"
    bar7.style.height = "5px"
    bar8.style.height = "5px"

};

project_2.addEventListener("mouseover",project2_hover);
project_2.addEventListener("mouseout",project2_not_hover);

function project3_hover() {
    calc.style.animationName = "calc_icon_grow"
    calc.style.animationDuration = "1s"
    calc.style.animationFillMode = "forwards";
};

function project3_not_hover() {
    calc.style.animationName = "calc_icon_shrink"
    calc.style.animationDuration = "1s"
    calc.style.animationFillMode = "forwards";
};

project_3.addEventListener("mouseover",project3_hover);
project_3.addEventListener("mouseout",project3_not_hover); 

function project4_hover() {
    city.src = "images/icon lit.png"
    city.style.animationName = "city_icon_grow"
    city.style.animationDuration = "1s"
    city.style.animationFillMode = "forwards";
};

function project4_not_hover() {
    city.src = "images/icon white.png"
    city.style.animationName = "city_icon_shrink"
    city.style.animationDuration = "1s"
    city.style.animationFillMode = "forwards";
};

project_4.addEventListener("mouseover",project4_hover);
project_4.addEventListener("mouseout",project4_not_hover);

function project5_hover() {

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

function project5_not_hover() {

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

project_5.addEventListener("mouseover",project5_hover);
project_5.addEventListener("mouseout",project5_not_hover);

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
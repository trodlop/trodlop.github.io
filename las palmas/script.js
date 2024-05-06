const logo = document.getElementById("lpcc_logo")

const planning_doc = document.getElementById("planning_document")
const planning_doc_cover = document.getElementById("planning_document_cover")
const planning_doc_download = document.getElementById("planning_document_download")

shrunk = false

function shrink_logo() {
    if (window.scrollY > 50) { 

        if (shrunk != true) {
            logo.style.animationName = "lpcc_logo_shrink";
            logo.style.animationDuration = "0.25s";
            logo.style.animationFillMode = "forwards";
        }
        shrunk = true;

    };
};

function grow_logo() {
    if (window.scrollY < 50) { 

        if (shrunk != false) {
            logo.style.animationName = "lpcc_logo_grow";
            logo.style.animationDuration = "0.25s";
            logo.style.animationFillMode = "forwards";
        }
        shrunk = false;

    };
};

document.addEventListener("scroll",shrink_logo);
document.addEventListener("scroll",grow_logo);

function planning_doc_hover() {
    planning_doc_cover.style.opacity = "50%"
    planning_doc_download.style.opacity = "75%"
};

function planning_doc_not_hover() {
    planning_doc_cover.style.opacity = "100%"
    planning_doc_download.style.opacity = "0%"
};

planning_doc.addEventListener("mouseover",planning_doc_hover);
planning_doc.addEventListener("mouseout",planning_doc_not_hover);
/**
* @returns {HTMLElement[]}
*/
function querySelectorAll(selectors, target=document) {
    return Array.from(target.querySelectorAll(selectors));
}

document.querySelector("#input-file").onchange = function() {
    let file = this.files[0];
    selectFile(file);
}

function removeEmptyClassFromMain() {
    document.querySelector("main").classList.remove("empty");
}

/**
* @param {File} file 
*/
function selectFile(file) {
    console.log("READ FILE");
    
    // Create a FileReader object to read the contents of the file
    const reader = new FileReader();
    
    // Add an event listener to handle when the file is loaded
    reader.onload = function(event) {
        let fileContents = event.target.result;

        // Display the file contents on the page
        document.querySelector('#original-json').innerHTML = JSONToHTML(fileContents);

        let jsonText;
        try {
            jsonText = JSON.parse(fileContents);
            jsonText = JSON.stringify(jsonText);
        }
        catch(e) {
            jsonText = "Not valid JSON";
            console.log(e)
        }

        // Display the file contents on the page
        document.querySelector('#compressed-json').innerHTML = jsonText;
    };
    
    // Read the file as text
    reader.readAsText(file);
    
    removeEmptyClassFromMain();
}

function JSONToHTML(jsonText) {
    jsonText = jsonText.replace(/(?<=\n)\s+/g, str => {
        return new Array(str.length).fill("&nbsp;").join("");
    });
    jsonText = jsonText.replace(/\n/g, "<br>");
    jsonText = jsonText.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    return jsonText;
}

/**
* @param {DragEvent} event 
*/
function fileDropped(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    
    // Hide the drag'n'drop section
    hideDropFileSection();
    
    selectFile(event.dataTransfer.files[0]);
}

function onDragOverInputSection(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    
    showDropFileSection();
}

function onMouseOutInputSection(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    
    hideDropFileSection();
}

function showDropFileSection() {
    document.querySelector(".drop-file-section").classList.add("shown");
}

function hideDropFileSection() {
    document.querySelector(".drop-file-section").classList.remove("shown");
}

function setup() {
    let sectionDropFile = document.body
    // To allow dropping
    sectionDropFile.addEventListener("dragover", onDragOverInputSection)
    sectionDropFile.addEventListener("dragstart", onDragOverInputSection)
    sectionDropFile.addEventListener("mouseout", onMouseOutInputSection)
    sectionDropFile.addEventListener("drop", fileDropped)
}

setup()
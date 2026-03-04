// Wait for the DOM to be ready before accessing any elements.
var files = {
    name: "root",
    type: "folder",
    content: [{
        name: "warrens",
        type: "folder",
        content: [{
            name: "Warrens",
            type: "image",
            content: "warrens.png"
        }]
    },{
        name: "trivia",
        type: "folder",
        content: [{
            name: "Silksong",
            type: "text",
            content: "Trobbio's name is a play on the name of his voice actor, Matt Trobbiani.<br>The reason Silksong took so long to release was because the devs were having too much fun adding so much content, and that sized up the scope so much that there became a point where Team Cherry realized there's too much for them to finish.<br>The boss Seth is named after a Hollow Knight fan named Seth Goldman, who was struggling with cancer and had a few months to live and managed to meet Team Cherry during that time.<br>Silksong was originally designed to be DLC for the original Hollow Knight, but got so big it became a full fledged sequel.<br>The reveal trailer for Silksong had many cut areas, such as the Red Coral Gorge, the Pharloom Bay, and more."
        },{
            name: "WarriorCats",
            type: "text",
            content: `The Prophecies Begin originally didn't have an official arc name, with most fans referring to it as The Original Series, until Kate Cary revealed in 2014 that it would officially be called, "The Prophecies Begin" with the launch of the paperback reprints.<br>In an interview with Victoria Holmes, she mentioned that Tigerstar's original name in the drafts of Into the Wild was Hammerclaw, but was changed because cats do not know what hammers are.<br>Firestar has the most chapters in his point of view in the entire series, totaling at 176 chapters.<br>Cherith has said that Firestar's "love" relationship with Spottedleaf was never shown often when she was alive because he was only a new apprentice at the time. She also feels that the relationship would not have gotten much farther due to the fact medicine cats cannot have mates.<br>Cherith says that if she could have made Ravenpaw a warrior, she would name him Ravenwing. He also has been mistakenly called Ravepaw.<br>Greystripe's name has been mistakenly spelled as "Grewpaw".`
        }]
    },{
        name: "notes",
        type: "folder",
        content: [{
            name: "2026March4",
            type: "html",
            content: `
                <p>Hello! My name is ██████. Or, well, that isn't my name, I just like censoring it to feel mysterious. This is a little project I've decided to make, ██████ OS! I named it that because I couldn't think of a better name... and I like feeling mysterious. Anyways, I just made this as my own personal way to catalog my notes, files, and more. Although nobody was ever meant to find this outside of myself, I wouldn't be surprised if someone manages to stumble upon this mess of spaghetti code. Either way, I do hope someone else finds the things I put here as interesting as I do!
                <br><br>
                - ██████</p>
            `
        }]
    }]
}

var mainBody
document.addEventListener('DOMContentLoaded', function() {
    var tickInterval = setInterval(tick, 100);
    var d = 0;

    function tick(){
        document.getElementById("body").style.backgroundPositionY = d + "px";
        if(d < 3){
            d += 0.2;
        } else{
            d = 0;
        }

        var currentTime = new Date().toLocaleTimeString();
        document.getElementById("time").innerHTML = currentTime;
    }

    loadWindows()
    mainBody = document.getElementById("body")
    closeFolder()
});

var notifsHidden = true;
function toggleNotifs(){
    if(notifsHidden){
        document.getElementById("notifs").style.right = "0px";
        notifsHidden = false;
    }else{
        document.getElementById("notifs").style.right = "-480px";
        notifsHidden = true;
    }
}

var selectedWindow = undefined
// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
    // Step 8.5: Add the selected class to the window
    selectWindow(element)
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function closeWindow(closedWindow){
    document.getElementById(closedWindow).style.visibility = "hidden";
}
function openWindow(openedWindow){
    document.getElementById(openedWindow).style.visibility = "visible";
    document.getElementById(openedWindow).style.top = "32px";
    document.getElementById(openedWindow).style.left = "32px";
    selectWindow(document.getElementById(openedWindow))
}
function loadWindows(){
    // Make the DIV element draggable once the element exists.
    for(let i = 0; i < document.getElementsByClassName("window").length; i++){
        dragElement(document.getElementsByClassName("window")[i]);
        document.getElementsByClassName("window")[i].addEventListener("mousedown", () => selectWindow(document.getElementsByClassName("window")[i]));
    }
}

var maxZ = 0;
function selectWindow(element){
    if(selectedWindow != undefined){
        selectedWindow.classList.remove("selected");
    }
    selectedWindow = element;
    selectedWindow.classList.add("selected");

    maxZ++;
    selectedWindow.style.zIndex = maxZ;
    console.log(selectedWindow)
}
function deselectWindow(element){
    element.classList.remove("selected");
}

var currentFolder = []
function openFile(fileLocation){
    fileSearch = files
    for(let i = 0; i < fileLocation.length; i++){
        fileSearch = fileSearch.content[fileLocation[i]]
    }
    if(fileSearch.type == "image"){
        openImage(fileSearch)
    }
    if(fileSearch.type == "text"){
        openText(fileSearch)
    }
    if(fileSearch.type == "html"){
        openContent(fileSearch)
    }
    return fileSearch
}
function openRelativeFile(fileLocation){
    file = openFile(currentFolder + fileLocation)
    if(file.type == "folder"){
        currentFolder.push(fileLocation)
        openFolder()
    }
    console.log(file)
}
function closeFolder(){
    currentFolder.pop()
    file = openFile(currentFolder)
    if(file.type == "folder"){
        openFolder()
    }
    return file
}
function getcurrentFolder(){
    return openFile(currentFolder)
}

function openFolder(openFolder = currentFolder){
    var folderWindow = document.getElementById("folderContent");
    folderWindow.innerHTML = ""
    var folderContent = openFile(openFolder).content
    for(let i = 0; i < folderContent.length; i++){
        folderWindow.innerHTML += "<p onclick='openRelativeFile(" + i + ")'><img class='fileIcons' src='" + folderContent[i].type + "-icon.png'>" + folderContent[i].name + "</p>"
    }
}
function openImage(currentFile){
    if(document.getElementById(currentFile.name + "Window") == null){
        mainBody.innerHTML += `<div id="`+currentFile.name+`Window" class="window" style="visibility: hidden;">
            <div class="header" id="`+currentFile.name+`Windowheader"><img src="x.png" class="xButton" onclick="closeWindow('`+currentFile.name+`Window')"></div>
                <img src="`+currentFile.content+`">
        </div>`
        loadWindows()
        deselectWindow(document.getElementById("folderWindow"))
    }
    openWindow(currentFile.name + "Window")
}
function openText(currentFile){
    if(document.getElementById(currentFile.name + "Window") == null){
        mainBody.innerHTML += `<div id="`+currentFile.name+`Window" class="window" style="visibility: hidden;">
            <div class="header" id="`+currentFile.name+`Windowheader"><img src="x.png" class="xButton" onclick="closeWindow('`+currentFile.name+`Window')"></div><div class="windowContent">
                <p contenteditable="true" spellcheck="false">`+currentFile.content+`</p>
        </div></div>`
        loadWindows()
        deselectWindow(document.getElementById("folderWindow"))
    }
    openWindow(currentFile.name + "Window")
}
function openContent(currentFile){
    if(document.getElementById(currentFile.name + "Window") == null){
        mainBody.innerHTML += `<div id="`+currentFile.name+`Window" class="window" style="visibility: hidden;">
            <div class="header" id="`+currentFile.name+`Windowheader"><img src="x.png" class="xButton" onclick="closeWindow('`+currentFile.name+`Window')"></div>
                <div class="windowContent">`+currentFile.content+`</div>
            </div>`
        loadWindows()
        deselectWindow(document.getElementById("folderWindow"))
    }
    openWindow(currentFile.name + "Window")
}
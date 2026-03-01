// Wait for the DOM to be ready before accessing any elements.
document.addEventListener('DOMContentLoaded', function() {
    var tickInterval = setInterval(tick, 100);
    var d = 0;

    // Make the DIV element draggable once the element exists.
    dragElement(document.getElementById("warrensWindow"));
    dragElement(document.getElementById("skongWindow"));

    function tick(){
        document.getElementById("body").style.backgroundPositionY = d + "px";
        if(d < 5){
            d++;
        } else{
            d = 0;
        }

        var currentTime = new Date().toLocaleTimeString();
        document.getElementById("time").innerHTML = currentTime;
    }

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
}
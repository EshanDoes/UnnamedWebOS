'use client'
import { useEffect, useRef } from 'react'

// Module-level variables for window management
let selectedWindow = undefined
let maxZ = 3

// Window animation variables
let lastUpdate = null
let delta = 0
let animatedWindow
let animationOffset = 8
const animationLength = 150.0

// Selecting/deselecting windows
export function selectWindow(element) {
  if (selectedWindow != undefined) {
    selectedWindow.classList.remove("selected")
  }
  selectedWindow = element
  selectedWindow.classList.add("selected")
  maxZ++
  selectedWindow.style.zIndex = maxZ
}

export function deselectWindow(element) {
  element.classList.remove("selected")
}

// Window animation
export function startWindowAnim(element) {
  // Assuming options.animations is true or handled elsewhere
  animatedWindow = element
  delta = 0
  requestAnimationFrame(windowAnim)
}

function windowAnim() {
  if (delta < animationLength) {
    if (lastUpdate == null) {
      lastUpdate = Date.now()
    }
    var now = Date.now()
    delta += now - lastUpdate
    lastUpdate = now
    animatedWindow.style.transform = "translate(0, " + Math.round(animationOffset - (Math.sin(delta / animationLength * Math.PI / 2)) * animationOffset) + "px)"
    requestAnimationFrame(windowAnim)
  } else {
    lastUpdate = null
    animatedWindow.style.transform = "translate(0px, 0px)"
  }
}

// Open window function (adapted for React)
export function openWindow(openedWindow, event = null) {
  const openingWindow = document.getElementById(openedWindow)
  if (!openingWindow) return
  openingWindow.style.visibility = "visible"
  
  const mainBody = document.getElementById('body') // Adjust if your main container has a different ID
  if (!mainBody) return
  
  let windowTop, windowLeft
  if (event) {
    windowTop = event.clientY - (window.innerHeight - mainBody.getBoundingClientRect().height) / 2
    windowLeft = event.clientX - (window.innerWidth - mainBody.getBoundingClientRect().width) / 2
  } else {
    // Default positioning if no event (set to 16px manually)
    windowTop = 16
    windowLeft = 16
  }
  
  // Boundary checks
  if (mainBody.getBoundingClientRect().height - (windowTop + openingWindow.getBoundingClientRect().height) < 36) {
    windowTop = mainBody.getBoundingClientRect().height - openingWindow.getBoundingClientRect().height - 46
  }
  if (mainBody.getBoundingClientRect().width - (windowLeft + openingWindow.getBoundingClientRect().width) < 0) {
    windowLeft = mainBody.getBoundingClientRect().width - openingWindow.getBoundingClientRect().width - 6
  }
  if (windowLeft < 0) {
    windowLeft = 4
  }
  if (windowTop < 0) {
    windowTop = 4
  }
  
  openingWindow.style.top = windowTop + "px"
  openingWindow.style.left = windowLeft + "px"
  selectWindow(openingWindow)
  startWindowAnim(openingWindow)
}

function setIframePointerEvents(value) {
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.style.pointerEvents = value
  })
}

export function handleWindowInteraction(windowRef, headerRef, xButtonRef) {
  const dragState = useRef({
    dragging: false,
    startX: 0,
    startY: 0
  })
  const maxZ = useRef(0)
  useEffect(() => {
    const element = windowRef.current
    const handle = headerRef?.current ?? element
    const xButton = xButtonRef?.current ?? element
    if (!element || !handle) return

    // Dragging code
    function onMouseDown(e) {
      e.preventDefault()
      dragState.current.dragging = true
      dragState.current.startX = e.clientX - element.getBoundingClientRect().left;
      dragState.current.startY = e.clientY - element.getBoundingClientRect().top;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      setIframePointerEvents('none');
    }

    function onMouseMove(e) {
      if (!dragState.current.dragging) return
      e.preventDefault()

      const dx = e.clientX - dragState.current.startX
      const dy = e.clientY - dragState.current.startY

      const rect = element.getBoundingClientRect()
      element.style.top = `${dy - element.parentElement.getBoundingClientRect().top}px`
      element.style.left = `${dx - element.parentElement.getBoundingClientRect().left}px`
    }

    function onMouseUp() {
      dragState.current.dragging = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      setIframePointerEvents('auto')
    }

    function xButtonClick() {
        element.style.visibility = "hidden";
    }

    handle.addEventListener('mousedown', onMouseDown)
    xButton.addEventListener('mousedown', xButtonClick)
    element.addEventListener('mousedown', function (e) {selectWindow(this);})

    return () => {
      handle.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [windowRef, headerRef, xButtonRef])
}

// Most code before this comment is written by AI at first, but read through and modified with human hands

export function SimpleWindow({ windowName, children, windowStyle = {}, headerStyle = {}, headerChildren = <></> }) {
  const windowRef = useRef(null)
  const headerRef = useRef(null)
  const xButtonRef = useRef(null)

  handleWindowInteraction(windowRef, headerRef, xButtonRef)

  return (
    <div ref={windowRef} id={windowName} className="window" style={windowStyle}>
      <div ref={headerRef} className="header" id={`${windowName}header`} style={headerStyle}>
        {headerChildren}
        <img ref={xButtonRef} src="/images/ui/main/x.png" className="xButton" />
      </div>
      {children}
    </div>
  )
}
export default function Window({ windowName, children, windowStyle = {}, headerStyle = {}, contentStyle = {} }){
    return (
    <SimpleWindow windowName={windowName} windowStyle={windowStyle} headerStyle={headerStyle}>
        <div className="windowContent" style={contentStyle}>
            {children}
        </div>
    </SimpleWindow>)
}
export function FileWindow(){
    return (
    <SimpleWindow windowName="folderWindow" headerChildren={
        <img src="/images/ui/main/back.png" className="backButton" />
    }>
        <div className="windowContent" id="folderContent" />
    </SimpleWindow>
    )
}

export function WindowIcon({ window, name = window }){
    var linkedWindow
    if (window == name){
        linkedWindow = window + "Window"
    } else {
        linkedWindow = window
    }
    return (<img src={"/images/ui/icons/apps/"+name+".png"} onClick={(e) => openWindow(linkedWindow, e)} />)
}

export function WindowDiv(){
  return (<div id="windows">
    <Window windowName="notesWindow" contentStyle={{ minHeight: 0 }}><p contentEditable="true" spellCheck="false" /></Window>
    <FileWindow />
    <Window windowName="gameWindow" windowStyle={{ padding: "16px 0px 0px 0px", height: 400 }}>
      <iframe
        frameBorder={0}
        src="https://itch.io/embed-upload/16855415?color=0f380f"
        allowFullScreen=""
        width={400}
        height={420}
        id="gameFrame"
      />
    </Window>
    <Window windowName="newsWindow">
      <img src="/images/news/article1/header.png" className="fill" />
        <h1>WEIRD PEN APPEARED</h1>
        <p>
          A really weird pen appeared in the outskirts of Nashville, Ohio and
          was discovered by a local resident. It was shown to everyone else in
          the town, and was feared by many, while others laughed or were just
          confused. We've asked a local about what they thought, and here's what
          they said:
          <br />
          <br />
          <q>
            It's really weird. I think- I think they should bring it to Area 51,
            I dunno.
          </q>
          <br />
          <br />
          When the pen is used on some parts of the paper, it seems to work just
          fine, while on others it's like it isn't even a pen at all. Currently
          scientists are studying this pen and its properties in order to find
          out where the pen came from, what the pen truly is, and why it acts
          like this.
        </p>
        <p>
          More info will be documented and revealed on here when it comes out.
          In the meantime, it's best to stay away from any silver pens with a
          blue tip until the matter has been resolved.
        </p>
        <p>
          This is Mystery Man, and you've just finished reading the current
          article of Mystery Man's Hobbyist News.
        </p>
        <br />
        <br />
        <p style={{ textAlign: "center" }}>
          <small>Article 1 - April 1st, 2026 - Updated every Friday</small>
        </p>
        {/*<p style="text-align: center;"><small>All articles taken from Mystery Man's Hobbyist News</small></p>*/}
    </Window>
    <Window windowName="touchscreenWindow">
      <h1>NOTICE</h1>
      <p>
          This site doesn't work well on touchscreen devices! You can try to use
          it, just know that it'll be very broken with features like dragging
          windows and I am still working on proper touchscreen compatability.
          Feel free to close this window if you think you'll still be able to
          use it.
      </p>
    </Window>
  </div>);
}
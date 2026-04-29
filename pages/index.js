import Head from 'next/head';
import { useRef, useEffect } from 'react';

import { Window, SimpleWindow, FileWindow, WindowDiv, WindowIcon } from '../components/interactive.js'
import { Time } from '../components/live.js'

export default function Main(){
  const mainBody = useRef(null)

  var output = <>
  <Head>
    <link rel="icon" href="/images/siteicon.png" />
    <title>██████ OS</title>
  </Head>
  <span className="onTop" id="bgOverlay" />
  <div ref={mainBody} id="body">
    <div className="icons">
      <WindowIcon window="folderWindow" name="files" />
      <WindowIcon window="notesWindow" name="notes" />
      <WindowIcon window="game" />
      <WindowIcon window="news" />
    </div>
    <WindowDiv>
    <Window windowName="notesWindow" contentStyle={{ minHeight: 0 }}><p contentEditable="true" spellCheck="false" /></Window>
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
      <img src="/images/news/article1/header.png" className="fill" alt="A header image featuring a pen." />
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
    </WindowDiv>
    <div
      id="options"
      className="onTop animated"
      style={{ bottom: "calc(-40% - 32px)", visibility: "hidden" }}
    >
      <p>Options</p>
      <br />
      <p /*onClick={toggleOption('animations')}*/ >
        <img className="checkbox" id="animationsCheckbox" /> Enable animations
      </p>
    </div>
    <div className="bottombar onTop">
      <Time />
      <span style={{ width: 4, height: "100%", backgroundColor: "#306230" }} />
      <a href="https://discord.gg/ENChZjqFBx" aria-label="Join the Technical Difficulties Discord server">
        <img src="/images/ui/icons/bottombar/chat.png" alt="A chat icon under the link to a Discord server." />
      </a>
      <img
        src="/images/ui/icons/bottombar/notif.png"
        id="notifButton"
        // onClick={toggleNotifs()}
      />
    </div>
    <div
      className="notifs onTop animated"
      id="notifs"
      alt="A currently unused notifications button."
      style={{ visibility: "hidden" }}
    >
      <div>
        <p>No notifications...</p>
      </div>
    </div>
  </div>
</>

  useEffect(() => {
    mainBody.current.addEventListener('scroll', evt => {
      evt.target.scrollTop = 0;
      evt.target.scrollLeft = 0;
    })
  })
  function shakeBody(){
    useEffect(() => {
      mainBody.style.transform = "translate("+(Math.random()*12-6)+"px, "+(Math.random()*12-6)+"px)";
      requestAnimationFrame(shakeBody)
    })
  }

  return (output);
}
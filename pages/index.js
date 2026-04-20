import Head from 'next/head';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Main(){
var output = < >
  <Head>
    <link rel="icon" href="/images/siteicon.png" />
    <title>██████ OS</title>
  </Head>
  <span className="onTop" id="bgOverlay" />
  <div id="body">
    <div className="icons">
      <img
        src="/images/ui/icons/apps/files.png"
        // onClick={openWindow('folderWindow')}
      />
      <img
        src="/images/ui/icons/apps/notes.png"
        // onClick={openWindow('notesWindow')}
      />
      <img
        src="/images/ui/icons/apps/game.png"
        // onClick={openWindow('gameWindow')}
      />
      <img
        src="/images/ui/icons/apps/news.png"
        // onClick={openWindow('newsWindow')}
      />
    </div>
    <div id="notesWindow" className="window" style={{ visibility: "hidden" }}>
      <div className="header" id="notesWindowheader">
        <img
          src="/images/ui/main/x.png"
          className="xButton"
          // onClick={closeWindow('notesWindow')}
        />
      </div>
      <div className="windowContent" style={{ minHeight: 0 }}>
        <p contentEditable="true" spellCheck="false" />
      </div>
    </div>
    <div id="folderWindow" className="window" style={{ visibility: "hidden" }}>
      <div className="header" id="folderWindowheader">
        <img
          src="/images/ui/main/back.png"
          className="backButton"
          // onClick={closeFolder()}
        />
        <img
          src="/images/ui/main/x.png"
          className="xButton"
          // onClick={closeWindow('folderWindow')}
        />
      </div>
      <div className="windowContent" id="folderContent"></div>
    </div>
    <div
      id="gameWindow"
      className="window"
      style={{ visibility: "hidden", padding: "16px 0px 0px 0px", height: 400 }}
    >
      <div className="header" id="gameWindowheader">
        <img
          src="/images/ui/main/x.png"
          className="xButton"
          // onClick={closeWindow('gameWindow')}
        />
      </div>
      <iframe
        frameBorder={0}
        src="https://itch.io/embed-upload/16855415?color=0f380f"
        allowFullScreen=""
        width={400}
        height={420}
        id="gameFrame"
      >
      </iframe>
    </div>
    <div id="newsWindow" className="window" style={{ visibility: "hidden" }}>
      <div className="header" id="newsWindowheader">
        <img
          src="/images/ui/main/x.png"
          className="xButton"
          // onClick={closeWindow('newsWindow')}
        />
      </div>
      <div className="windowContent">
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
      </div>
    </div>
    <div id="touchscreenWindow" className="window">
      <div className="header" id="touchscreenWindowheader">
        <img
          src="/images/ui/main/x.png"
          className="xButton"
          // onClick={closeWindow('touchscreenWindow')}
        />
      </div>
      <div className="windowContent">
        <h1>NOTICE</h1>
        <p>
          This site doesn't work well on touchscreen devices! You can try to use
          it, just know that it'll be very broken with features like dragging
          windows and I am still working on proper touchscreen compatability.
          Feel free to close this window if you think you'll still be able to
          use it.
        </p>
      </div>
    </div>
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
      <p
        style={{ marginRight: 16, verticalAlign: "center" }}
        id="time"
        className=""
      >
        10:20 AM
      </p>
      <span style={{ width: 4, height: "100%", backgroundColor: "#306230" }} />
      <a href="https://discord.gg/ENChZjqFBx">
        <img src="/images/ui/icons/bottombar/chat.png" />
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
      style={{ visibility: "hidden" }}
    >
      <div>
        <p>No notifications...</p>
      </div>
    </div>
  </div>
</>

    return (output);
}
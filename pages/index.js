import Head from 'next/head';
import { useEffect } from 'react';
import { useRef } from 'react';

import { Window } from './components/interactive.js'
import { SimpleWindow } from './components/interactive.js'
import { WindowDiv } from './components/interactive.js'
import { WindowIcon } from './components/interactive.js'
import { Time } from './components/live.js'

export default function Main(){
var output = < >
  <Head>
    <link rel="icon" href="/images/siteicon.png" />
    <title>██████ OS</title>
  </Head>
  <span className="onTop" id="bgOverlay" />
  <div id="body">
    <div className="icons">
      <WindowIcon window="folderWindow" name="files" />
      <WindowIcon window="notesWindow" name="notes" />
      <WindowIcon window="game" />
      <WindowIcon window="news" />
    </div>
    <WindowDiv />
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
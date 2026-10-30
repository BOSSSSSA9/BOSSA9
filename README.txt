BERSERK-INSPIRED PROFILE WEBSITE

Open index.html in your browser (or use VS Code Live Server).

IMAGE UPDATE:
- assets/guts-wallpaper-hq.webp = high-resolution widescreen background
- assets/guts-pfp.webp = separate, sharper profile picture
- assets/guts-background-hq.webp = enlarged clean Guts portrait asset

EDIT YOUR DETAILS:
- index.html: change YOUR NAME, About Me text and social URLs.
- script.js: set MUSIC_FILE, MUSIC_TITLE and START_VOLUME.
- Put your MP3 in assets/ and update MUSIC_FILE, e.g. assets/my-song.mp3.

The music player opens from the small music button at the bottom-left.
The visitor number in this static version is local to each browser; a shared global visitor counter needs a hosted counter/database.


MUSIC START / END:
Open script.js and edit:
- MUSIC_START_SECONDS = 35;  // starts at 00:35
- MUSIC_END_SECONDS = 95;    // stops at 01:35, then repeats from 00:35
Use seconds (60 = 01:00). Set MUSIC_END_SECONDS = 0 to play to the end.
The website tries autoplay, but Chrome/other browsers may block autoplay with sound.
If blocked, the visitor needs to press the small play button once.

CUSTOM IMAGES:
The background and profile picture use the two image URLs supplied in the chat.
They load from images.openai.com, so the website needs an internet connection;
if those temporary image URLs expire, download the images and update the URLs
in style.css (background) and index.html (profile-picture img src).

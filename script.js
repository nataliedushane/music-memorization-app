function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const musicSets = {
    traditionals: [
  {title: "07 Illinois March", audio: "audio/07 Illinois March.mp3", pdf: "Illinois March.pdf"},
  {title: "Dismissal", audio: "audio/Dismissal.mp3", pdf: null},
  {title: "Hail to the Orange", audio: "audio/Hail to the Orange.mp3", pdf: null},
  {title: "Illinois Loyalty", audio: "audio/Illinois Loyalty.mp3", pdf: "Illinois Loyalty.pdf"},
  {title: "Illinois March", audio: "audio/Illinois March.mp3", pdf: "Illinois March.pdf"},
  {title: "Oskee-Wow-Wow (from the top)", audio: "audio/Oskee-Wow-Wow (from the top).mp3", pdf: "Oskee Wow Wow.pdf"},
  {title: "Oskee Fanfare", audio: "audio/OskeeFanfare.mp3", pdf: "Oskee Fanfare.pdf"},
  {title: "Patriotic Medley", audio: "audio/Patriotic Medley.mp3", pdf: "Patriotic Medley.pdf"},
  {title: "Revised Entrance #3", audio: "audio/Revised Entrance #3.mp3", pdf: "Run-On_Revised.pdf"},
  {title: "The Sequence", audio: "audio/The Sequence.mp3", pdf: null},
  {title: "Three-In-One", audio: "audio/Three-In-One.mp3", pdf: "Three In One.pdf"},
  {title: "William Tell", audio: "audio/William Tell.mp3", pdf: "William Tell.pdf"}
],
    lotTunes: [
  {title: "Bump", audio: "audio/tamborine_180bpm_4-4time_501beats_Ubchlw.mp3", pdf: "Bump.pdf"},
  {title: "Double Beat", audio: "audio/Illini Drumline Double Beat 10_22_22.mp3", pdf: "Double Beat.pdf"},
  {title: "Fast Things", audio: "audio/tamborine_196bpm_1-4time_501beats_RirUdX.mp3", pdf: "Fast Things.pdf"},
  {title: "Juice Box", audio: "audio/tamborine_190bpm_1-4time_501beats_uFLeKs.mp3", pdf: "Juice Box.pdf"},
  {title: "Latin Lover Grande", audio: "audio/LatinLoverGrande.mp3", pdf: "Latin Lover Grande.pdf"},
  {title: "Mambo", audio: "audio/2011 Illini Drumline - Mambo (9_3_11).mp3", pdf: "Mambo.pdf"}
],
    // Add more music sets as needed
};

const selectedType = getQueryParam("type") || "traditionals";
const musicPhrases = musicSets[selectedType] || [];

if (musicPhrases.length === 0) {
  alert("No music found for this category.");
  
  window.location.href = "home.html";

}

let currentIndex = Math.floor(Math.random() * musicPhrases.length);
const flashcard = document.getElementById("music-phrase");
const nextBtn = document.getElementById("next-btn");
const cheatBtn = document.getElementById("cheat-btn");
const restartBtn = document.getElementById("restart-btn");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
let currentAudio = null;

playBtn.addEventListener("click", () => {
  if (currentAudio) {
    currentAudio.play();
  } else {
    currentAudio = new Audio(musicPhrases[currentIndex].audio);
    currentAudio.play();
  }
});

stopBtn.addEventListener("click", () => {
  if (currentAudio) {
    currentAudio.pause();
;
  }
});

nextBtn.addEventListener("click", () => {
  const index = Math.floor(Math.random() * musicPhrases.length);
  currentPhrase = musicPhrases[index];
  // Stop any currently playing audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Show the new title
  flashcard.textContent = currentPhrase.title;

  // Wait 5 seconds, then play the audio
  setTimeout(() => {
    currentAudio = new Audio(currentPhrase.audio);
    currentAudio.play();
  }, 750);

  // Move to the next phrase
  currentIndex = Math.floor(Math.random() * musicPhrases.length);
});

cheatBtn.addEventListener("click", () => {
  if (!currentPhrase) {
    alert("No song selected yet. Press 'Next' first!");
    return;
  }

  //alert(`Cheat: ${currentPhrase.title}`);

  if (currentPhrase.pdf) {
    window.open(`pdf/${currentPhrase.pdf}`, "_blank");
  } else {
    alert("No sheet music available for this song.");
  }
});

restartBtn.addEventListener("click", () => {
  if (!currentPhrase) {
    alert("No song to restart. Press 'Next' first!");
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  flashcard.textContent = currentPhrase.title;
  currentAudio = new Audio(currentPhrase.audio);
  currentAudio.play();
});

const backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", () => {
  window.location.href = "home.html"; // or the correct name of your homepage file
});
window.addEventListener("DOMContentLoaded", () => {
  // (A) AUDIO OBJECT + HTML CONTROLS
  var audio = new Audio("https://d2qmbqiruxzuv.cloudfront.net/demo60-6-29-23.mp3"),
      aPlay = document.getElementById("aPlay"),
      aPlayIco = document.getElementById("aPlayIco"),
      aNow = document.getElementById("aNow"),
      aTime = document.getElementById("aTime"),
      aSeek = document.getElementById("aSeek"),
      aVolume = document.getElementById("aVolume"),
      aVolIco = document.getElementById("aVolIco");

  // (B) PLAY/PAUSE BUTTON
  // (B1) AUTO SET PLAY/PAUSE TEXT
  audio.addEventListener("play", () => {
    aPlayIco.innerHTML = "pause";
  });
  audio.addEventListener("pause", () => {
    aPlayIco.innerHTML = "play_arrow";
  });

  // (B2) CLICK TO PLAY/PAUSE
  aPlay.addEventListener("click", () => {
    if (audio.paused) { audio.play(); }
    else { audio.pause(); }
  });

  // (C) TRACK PROGRESS
  // (C1) SUPPORT FUNCTION - FORMAT HH:MM:SS
  var timeString = (secs) => {
    // HOURS, MINUTES, SECONDS
    let ss = Math.floor(secs),
        hh = Math.floor(ss / 3600),
        mm = Math.floor((ss - (hh * 3600)) / 60);
    ss = ss - (hh * 3600) - (mm * 60);

    // RETURN FORMATTED TIME
    if (hh>0) { mm = mm<10 ? "0"+mm : mm; }
    ss = ss<10 ? "0"+ss : ss;
    return hh>0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}` ;
  };

  // (C2) INIT SET TRACK TIME


  // (C3) UPDATE TIME ON PLAYING
  audio.addEventListener("timeupdate", () => {
    aNow.innerHTML = timeString(audio.currentTime);
  });

  // (D) SEEK BAR
  audio.addEventListener("loadedmetadata", () => {
    // (D1) SET SEEK BAR MAX TIME
    aSeek.max = Math.floor(audio.duration);

    // (D2) USER CHANGE SEEK BAR TIME
    var aSeeking = false; // USER IS NOW CHANGING TIME
    aSeek.addEventListener("input", () => {
      aSeeking = true; // PREVENTS CLASH WITH (D3)
    });
    aSeek.addEventListener("change", () => {
      audio.currentTime = aSeek.value;
      if (!audio.paused) { audio.play(); }
      aSeeking = false;
    });

    // (D3) UPDATE SEEK BAR ON PLAYING
    audio.addEventListener("timeupdate", () => {
      if (!aSeeking) { aSeek.value = Math.floor(audio.currentTime); }
    });
  });

  // (E) VOLUME
  aVolume.addEventListener("change", () => {
    audio.volume = aVolume.value;
    aVolIco.innerHTML = (aVolume.value==0 ? "volume_mute" : "volume_up");
  });

  // (F) ENABLE/DISABLE CONTROLS
  audio.addEventListener("canplay", () => {
    aPlay.disabled = false;
    aVolume.disabled = false;
    aSeek.disabled = false;
  });
  audio.addEventListener("waiting", () => {
    aPlay.disabled = true;
    aVolume.disabled = true;
    aSeek.disabled = true;
  });
});

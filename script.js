document.addEventListener('DOMContentLoaded', function() {
  // List of all songs
  let songs = [
    "Maranata - Ministerio Avivah",
    "Te Agradeco - Diante do Trono",
    "Nao Ha Um Nome Igual - Ministerio Avivah",
    "Filho de Deus - Projeto Sola",
    "Redencao - Projeto Sola.html"
  ];
  songs.sort()

  let songList = document.getElementById('songList');
  let songDisplay = document.getElementById('songDisplay');
  let search = document.getElementById('search');

  // Generate the song list
  for (let i = 0; i < songs.length; i++) {
    let songDiv = document.createElement('div');
    songDiv.className = "song";
    songDiv.textContent = songs[i];
    songDiv.onclick = function() {
      console.log(`Loading ${songs[i]}...`);  // Added console log
      // Load song lyrics
      fetch(`./${songs[i]}.html`)
        .then(response => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.text()
        })
        .then(data => {
          console.log(`Loaded song: ${songs[i]}`);  // Added console log
          songDisplay.innerHTML = data;
        })
        .catch(error => {
          console.log(`Failed to load song: ${songs[i]}`);  // Added console log
          console.log(error);
        });

      // Highlight the active song
      let activeSong = document.querySelector('.song.active');
      if (activeSong) {
        activeSong.classList.remove('active');
      }
      songDiv.classList.add('active');
    };
    songList.appendChild(songDiv);
  }

  // Add search functionality
  search.oninput = function() {
    let filter = search.value.toLowerCase();
    let songDivs = songList.getElementsByClassName('song');
    for (let i = 0; i < songDivs.length; i++) {
      let songDiv = songDivs[i];
      let songName = songs[i].toLowerCase();
      if (songName.includes(filter)) {
        songDiv.style.display = "";
      } else {
        songDiv.style.display = "none";
      }
    }
  };

  // Toggle sidebar visibility
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const menuIcon = document.getElementById('menu-icon');

  menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
    menuIcon.classList.toggle('fa-chevron-right');
    menuIcon.classList.toggle('fa-chevron-left');
  });

  songList.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
    menuIcon.classList.toggle('fa-chevron-right');
    menuIcon.classList.toggle('fa-chevron-left');
    songDisplay.scrollTop = 0;
  });

});

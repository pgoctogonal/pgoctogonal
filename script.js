window.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
  
    // Function to fetch songs from a specific folder
    const fetchSongsFromFolder = (folder) => {
      return fetch(`./songs/${folder}`)
        .then(response => response.text())
        .then(text => {
          const parser = new DOMParser();
          const html = parser.parseFromString(text, 'text/html');
          const links = html.querySelectorAll('a');
          const songs = [];
  
          links.forEach(link => {
            const songName = link.href.split('/').pop().replace('.txt', '');
            const songURL = `./songs/${folder}/${link.href.split('/').pop()}`;
            songs.push({ name: songName, url: songURL });
          });
  
          return songs;
        });
    };
  
    // Fetch songs from the root level
    const fetchRootSongs = fetchSongsFromFolder('');
  
    // Fetch songs from the 'folder' subdirectory
    const fetchFolderSongs = fetchSongsFromFolder('folder');
  
    // Combine and display all songs
    Promise.all([fetchRootSongs, fetchFolderSongs])
      .then(responses => {
        const allSongs = responses.flat();
        allSongs.forEach(song => {
          const listItem = document.createElement('li');
          const songTitle = document.createElement('h2');
          const preElement = document.createElement('pre');
  
          songTitle.textContent = song.name;
  
          fetch(song.url)
            .then(response => response.text())
            .then(songContent => {
              preElement.innerHTML = songContent;
            });
  
          listItem.appendChild(songTitle);
          listItem.appendChild(preElement);
          songList.appendChild(listItem);
        });
      });
  });
  
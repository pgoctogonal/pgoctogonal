window.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
  
    // Function to fetch songs from the songs folder
    const fetchSongs = () => {
      return fetch('./songs')
        .then(response => response.text())
        .then(text => {
          const parser = new DOMParser();
          const html = parser.parseFromString(text, 'text/html');
          const links = Array.from(html.querySelectorAll('a'))
            .map(link => link.getAttribute('href'));
          const songs = [];
  
          links.forEach(link => {
            const songName = link.split('/').pop().replace('.txt', '');
            const songURL = `./songs/${link}`;
            songs.push({ name: songName, url: songURL });
          });
  
          return songs;
        });
    };
  
    // Fetch songs from the songs folder
    fetchSongs()
      .then(songs => {
        songs.forEach(song => {
          const listItem = document.createElement('li');
          const songTitle = document.createElement('h2');
          const preElement = document.createElement('pre');
  
          songTitle.textContent = song.name;
          console.log(song.url)
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
  
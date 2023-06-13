window.addEventListener('DOMContentLoaded', () => {
    const songList = document.getElementById('song-list');
    fetch('./songs')
        .then(response => response.text())
        .then(text => {
            const parser = new DOMParser();
            const html = parser.parseFromString(text, 'text/html');
            const links = html.querySelectorAll('a');
            links.forEach(link => {
                const songName = link.href.split('/').pop().replace('.txt', '');
                const listItem = document.createElement('li');
                const songTitle = document.createElement('h2');
                const preElement = document.createElement('pre');
                
                songTitle.textContent = songName;
                
                fetch(link.href)
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

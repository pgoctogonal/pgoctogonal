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
                const anchor = document.createElement('a');
                anchor.href = link.href;
                anchor.textContent = songName;
                listItem.appendChild(anchor);
                songList.appendChild(listItem);
            });
        });
});
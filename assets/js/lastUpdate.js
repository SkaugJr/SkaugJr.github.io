fetch('https://api.github.com/repos/SkaugJr/SkaugJr.github.io/commits?path=index.html&page=1&per_page=1')
    .then(response => response.json())
    .then(data => {
        const lastUpdated = new Date(data[0].commit.author.date);
        document.getElementById('last-updated').textContent = 'Sist oppdatering: ' + lastUpdated.toLocaleDateString();
    })
    .catch(error => console.error(error));
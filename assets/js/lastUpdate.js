fetch('https://api.github.com/repos/SkaugJr/SkaugJr.github.io/commits?path=index.html&page=1&per_page=1')
    .then(response => response.json())
    .then(data => {
        const lastUpdated = new Date(data[0].commit.author.date);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.getElementById('last-updated').innerHTML = 'Sist oppdatering: ' + lastUpdated.toLocaleString('nb-NO', options);
    })
    .catch(error => console.error(error));
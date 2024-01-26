// Variables and Constants
const inputSearch = document.querySelector('#search-input');
const resultArtist = document.querySelector('#result-artist');
const resultPlaylist = document.querySelector('#result-playlists');

// Condition Input
inputSearch.addEventListener('input', () => {
    const searchTerm = inputSearch.value.toLowerCase();

    if(searchTerm == '')  {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return; 
    };  

    apiDataQuery(searchTerm);
});

// Functions
function displayResults (result) {
    resultPlaylist.classList.add('hidden');

    const artistName = document.querySelector('#artist-name');
    const artistImg = document.querySelector('#artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImg.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
};

async function apiDataQuery(searchTerm) {    
    try {
        const apiUrl = `http://localhost:3000/artists`;
        const response = await fetch(apiUrl);
        let data = await response.json();

        // Filtro temporario:
        let filteredItems = [];

        for (let i = 0; i < data.length; i++) {
            const artistName = data[i].name.toLowerCase();

            if (artistName.includes(searchTerm.toLowerCase())) {
                filteredItems.push(data[i]);
            };
        };
          
        displayResults(filteredItems);
    } catch {
        console.log('fuen fuen fuon');
    };
};
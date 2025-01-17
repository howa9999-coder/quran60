
//QURAN API
function getSurah() {
    axios.get(`https://mp3quran.net/api/v3/suwar`)
        .then(function (response) {
            const main = document.querySelector('main');
            main.innerHTML = '';
            const suwar = response.data.suwar;

            // Get the last 28 surahs
            const surah = suwar.slice(-28).reverse();

            surah.forEach((surah, index) => {
                num = index + 1
                main.innerHTML += `
                    <div class="content">
                        <h3 >${num})  ${surah.name}</h3>
                        <div class="icons">
                            <button class="icon quran" data="${surah.id}"><img src="audio.png" alt=""></button>
                            <button class="icon tafssir" data="${surah.id}"><img src="idea.png" alt=""></button>
                        </div>
                    </div>
                `;
            });

            const quranBtns = document.querySelectorAll('.quran')
            const tafssirBtns = document.querySelectorAll('.tafssir')

            quranBtns.forEach(quranBtn=>{
                quranBtn.addEventListener('click', function(){
                    tafssirBtns.forEach(btnTafssir => btnTafssir.classList.remove('active-tafssir') )
                    quranBtns.forEach(btn => btn.classList.remove('active-quran'));
                    const surahId = this.getAttribute('data')
                    this.classList.add('active-quran');
                    getQuran(surahId)
                    surahName(surahId)
                    
                })
            })
            tafssirBtns.forEach(tafssirBtn=>{
                tafssirBtn.addEventListener('click', function(){
                    quranBtns.forEach(btnQuran => btnQuran.classList.remove('active-quran') )
                    tafssirBtns.forEach(btn => btn.classList.remove('active-tafssir'));
                    const surahId = this.getAttribute('data')
                    this.classList.add('active-tafssir');
                    getTafssir(surahId)
                    surahName(surahId)
                    
                })
            })
        })
        .catch(function (error) {
            console.error('Error fetching surah data:', error);
        });
}

getSurah()
function getTafssir(id) {
    axios.get(`https://www.mp3quran.net/api/v3/tafsir?sura=${id}`)
        .then(function (response) {
            // Access the data properly based on the API structure
            const tafsirUrl = response.data.tafasir.soar[id][0].url; // Ensure `tafasir` exists
            audioPlayer(tafsirUrl, "#audio-player")
        })
        .catch(function (error) {
            console.error("Error fetching tafsir:", error);
        });
}
function getQuran(surahId){
    axios.get(`https://mp3quran.net/api/v3/reciters?reciter=118&rewaya=2`)
    .then(function (response) {
        const data = response.data.reciters[0].moshaf[0]
        const surahServer = data.server
        const padSurah = surahId.padStart(3, '0')
        const link = surahServer+padSurah+'.mp3'
        audioPlayer(link, "#audio-player")
})
.catch(function (error) {
    console.error('Error fetching surah link:', error);
});
}
function surahName(id){
    axios.get(`https://www.mp3quran.net/api/v3/tafsir?sura=${id}`)
    .then(function (response) {
        // Access the data properly based on the API structure
        const surahName = response.data.tafasir.soar[id][0].name; // Ensure `tafasir` exists
        const title = document.querySelector('h2')
        title.innerHTML = surahName
    })
    .catch(function (error) {
        console.error("Error fetching surah name:", error);
    });
}
function audioPlayer(link, id){
    const audioPlayer = document.querySelector(`${id}`)
    audioPlayer.src = link
    audioPlayer.play()
}

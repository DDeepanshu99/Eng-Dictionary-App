const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector(".sound");
const btn = document.querySelector(".search-btn");

btn.addEventListener("click", async () => {
    try {
        let input = document.querySelector(".input-word").value.trim();
        if (!input) {
            result.innerHTML = `<h3 class="error">Please enter a word to search.</h3>`;
            return;
        }
        let response = await fetch(`${url}${input}`);
        if (!response.ok) {
            throw new Error(`Word not found! Error Status: ${response.status}`);
        }
        let data = await response.json();

        const wordData = data[0];
        const meanings = wordData.meanings[0];
        const definition = meanings.definitions[0];
        const audioExists = wordData.phonetics.length > 0 && wordData.phonetics[0].audio;

        result.innerHTML = `
            <div class="word">
                <div class="header">
                    <h3>${input}</h3>
                    ${audioExists ? `<button class="play-sound-btn">
                        <i class="fa-solid fa-microphone"></i>
                    </button>` : ''}
                </div>
                <div class="details">
                    <p>${meanings.partOfSpeech || 'N/A'}</p>
                    <p>/${wordData.phonetic || 'N/A'}/</p>
                </div>
                <p class="word-meaning">${definition.definition}</p>
                <p class="word-example">${definition.example || 'No example available.'}</p>
            </div>`;

        if (audioExists) {
            sound.setAttribute("src", wordData.phonetics[0].audio);
            document.querySelector(".play-sound-btn")?.addEventListener("click", playSound);
        }
    } catch (error) {
        result.innerHTML = `<h3 class="error">${error.message}</h3>`;
    }
});
function playSound() {
    sound.play();
}
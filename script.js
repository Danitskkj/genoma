document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playAudio");
    const audio = document.getElementById("genomeAudio");
    const sections = document.querySelectorAll(".content-section");
    const intro = document.getElementById("intro");
    let currentSectionIndex = 0;

    playButton.addEventListener("click", () => {
        intro.style.display = "none"; // Esconde a introdução
        document.querySelector("main").style.display = "block"; // Mostra o conteúdo principal
        audio.play();
    });

    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;

        if (
            currentSectionIndex < sections.length &&
            currentTime >= parseFloat(sections[currentSectionIndex].dataset.time)
        ) {
            sections[currentSectionIndex].classList.add("active");
            currentSectionIndex++;
        }
    });

    audio.addEventListener("ended", () => {
        const thankYouMessage = document.createElement("div");
        thankYouMessage.innerHTML = "<h2 class='text-center text-2xl' id='agradecimento'>Obrigado por explorar o Genoma!</h2>";
        const footer = document.querySelector("footer");
        document.body.insertBefore(thankYouMessage, footer); // Insere a mensagem antes do rodapé
    });
});
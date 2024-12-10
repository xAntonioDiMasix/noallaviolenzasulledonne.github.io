// Bottone per la modalità scura/chiara
const themeSwitcher = document.getElementById("theme-switcher");
themeSwitcher.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
    themeSwitcher.textContent = document.body.classList.contains("dark")
        ? "☀️ Modalità Chiara"
        : "🌙 Modalità Scura";
    updateThemeColors();
});

// Funzione per aggiornare i colori dinamicamente
const updateThemeColors = () => {
    document.querySelectorAll(".chroma").forEach((element) => {
        element.style.background = document.body.classList.contains("dark")
            ? "linear-gradient(45deg, #444, #666, #444)"
            : "linear-gradient(45deg, #ff9f43, #ff6f61, #ff9f43)";
    });
};
updateThemeColors(); // Assicura che i colori siano aggiornati al caricamento

function openPost(postId) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
}

// Nascondi il loader una volta che il sito è completamente caricato
window.addEventListener("load", () => {
    const loader = document.getElementById("loading");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }
});

// Scroll fluido tra sezioni
let currentSection = 0; // Sezione iniziale
const sections = document.querySelectorAll(".section");
let isScrolling = false;

function scrollToSection() {
    const target = sections[currentSection].offsetTop;
    let startPosition = window.scrollY;
    let distance = target - startPosition;
    let duration = 800; // Durata in millisecondi
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const ease = progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;
        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

function changeSection(direction) {
    if (direction === 1 && currentSection < sections.length - 1) {
        currentSection++;
    } else if (direction === -1 && currentSection > 0) {
        currentSection--;
    }
    isScrolling = true;
    scrollToSection();

    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Cooldown di 1 secondo
}

document.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    changeSection(direction);
}, { passive: true });

document.addEventListener("keydown", (event) => {
    if (isScrolling) return;
    if (event.key === "ArrowDown") {
        changeSection(1);
    } else if (event.key === "ArrowUp") {
        changeSection(-1);
    }
});

// Elementi selezionati
const header = document.querySelector("header");
const toggleHeaderBtn = document.getElementById("toggle-header");

// Stato iniziale
let isHeaderHidden = false;

// Funzione per mostrare/nascondere l'header
function toggleHeader() {
    if (isHeaderHidden) {
        // Mostra l'header
        header.style.top = "0";
        toggleHeaderBtn.textContent = "⬆"; // Cambia l'icona
    } else {
        // Nascondi l'header
        header.style.top = `-${header.offsetHeight}px`;
        toggleHeaderBtn.textContent = "⬇"; // Cambia l'icona
    }
    isHeaderHidden = !isHeaderHidden; // Inverte lo stato
}

// Aggiungi evento di click al pulsante
toggleHeaderBtn.addEventListener("click", toggleHeader);


/// Aggiungi un riferimento alla scritta "Post in evidenza"
const postsHeading = document.querySelector("#gallery h2");

// Flag per evitare che l'animazione venga eseguita più volte
let hasShownHeading = false;

// Funzione per mostrare la scritta "Post in evidenza" al centro della seconda schermata
function showPostsHeading() {
    if (hasShownHeading) return; // Evita che venga eseguito più volte

    console.log("Mostrando la scritta 'Post in evidenza'");
    postsHeading.classList.add('show-posts-heading');
    hasShownHeading = true; // Imposta il flag per evitare animazioni future

    // Dopo 2 secondi, nascondi la scritta
    setTimeout(() => {
        postsHeading.classList.remove('show-posts-heading');
        postsHeading.classList.add('hide-posts-heading');
    }, 2000); // La scritta sparisce dopo 2 secondi
}

// Aggiungi evento di scroll per mostrare "Post in evidenza" quando arriva alla seconda schermata
document.addEventListener("scroll", () => {
    const gallerySection = document.getElementById("gallery");
    const galleryPosition = gallerySection.getBoundingClientRect().top;

    // Log della posizione per il debug
    console.log("Posizione della sezione:", galleryPosition);

    // Verifica che la seconda sezione è visibile nel viewport
    if (galleryPosition <= window.innerHeight && galleryPosition > -gallerySection.offsetHeight && !hasShownHeading) {
        showPostsHeading();
    }
});

// Funzione per gestire lo scorrimento delle immagini nei post
function enableImageScroll(postElement) {
    const images = postElement.querySelectorAll("img"); // Ottieni tutte le immagini nel post
    let currentImageIndex = 0; // Indice per tracciare l'immagine corrente
    let intervalId;

    // Funzione per mostrare l'immagine successiva
    function showNextImage() {
        images[currentImageIndex].style.opacity = "0"; // Nascondi l'immagine corrente
        currentImageIndex = (currentImageIndex + 1) % images.length; // Passa alla successiva
        images[currentImageIndex].style.opacity = "1"; // Mostra la nuova immagine
    }

    // Aggiungi evento per il passaggio del mouse
    postElement.addEventListener("mouseenter", () => {
        intervalId = setInterval(showNextImage, 2000); // Cambia immagine ogni secondo
    });

    // Aggiungi evento per l'uscita del mouse
    postElement.addEventListener("mouseleave", () => {
        clearInterval(intervalId); // Interrompi il ciclo
        // Ripristina l'immagine iniziale
        images.forEach((img, index) => {
            img.style.opacity = index === 0 ? "1" : "0"; // Mostra solo la prima immagine
        });
        currentImageIndex = 0; // Torna all'indice iniziale
    });
}

// Applica la funzione a tutti i post
document.querySelectorAll(".post").forEach(enableImageScroll);

// Funzione per gestire lo scorrimento delle immagini nei post
function enableImageScroll(postElement) {
    const images = postElement.querySelectorAll("img"); // Ottieni tutte le immagini nel post
    let currentImageIndex = 0; // Indice per tracciare l'immagine corrente
    let intervalId;

    // Funzione per mostrare l'immagine successiva
    function showNextImage() {
        images[currentImageIndex].style.opacity = "0"; // Nascondi l'immagine corrente
        currentImageIndex = (currentImageIndex + 1) % images.length; // Passa alla successiva
        images[currentImageIndex].style.opacity = "1"; // Mostra la nuova immagine
    }

    // Aggiungi evento per il passaggio del mouse
    postElement.addEventListener("mouseenter", () => {
        intervalId = setInterval(showNextImage, 1500); // Cambia immagine ogni secondo
    });

    // Aggiungi evento per l'uscita del mouse
    postElement.addEventListener("mouseleave", () => {
        clearInterval(intervalId); // Interrompi il ciclo
        // Ripristina l'immagine iniziale
        images.forEach((img, index) => {
            img.style.opacity = index === 0 ? "1" : "0"; // Mostra solo la prima immagine
        });
        currentImageIndex = 0; // Torna all'indice iniziale
    });
}

// Applica la funzione a tutti i post
document.querySelectorAll(".post").forEach(enableImageScroll);

let currentScreen = 1;

function scrollToScreen(screenNumber) {
    const screen = document.getElementById(`post-screen-${screenNumber}`);
    if (!screen) return;

    document.querySelectorAll(".post-container").forEach((container) => {
        container.classList.add("hidden");
    });

    screen.classList.remove("hidden");

    // Scroll fluido alla schermata
    screen.scrollIntoView({ behavior: "smooth" });
}

// Navigazione con il mouse o la tastiera
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && currentScreen < 2) {
        currentScreen++;
        scrollToScreen(currentScreen);
    } else if (event.key === "ArrowLeft" && currentScreen > 1) {
        currentScreen--;
        scrollToScreen(currentScreen);
    }
});

// Lista dei post e i loro dettagli
const postDetails = {
    post1: "La violenza non è amore. Non accettare che il controllo, la gelosia o le minacce siano mascherati come affetto. Chiedi aiuto al 1522, è anonimo e gratuito. Ogni passo verso la libertà inizia con una parola.",
    post2: "La forza delle donne è più grande della violenza che subiscono. Ogni giorno, milioni di donne trovano il coraggio di chiedere aiuto. Se ti senti sola, ricorda: Non sei sola. La tua voce conta. Chiama il 1522, è il primo passo per uscire dalla violenza.",
    post3: "Ogni donna ha diritto alla libertà. La violenza non è amore. Il silenzio non deve essere una prigione. Se ti senti bloccata o sola, parlare è un atto di coraggio. Esiste una rete pronta ad aiutarti. Chiama il 1522.",
    post4: "La solidarietà può salvare una vita. Insieme possiamo fare la differenza. Se qualcuno ha bisogno di aiuto, tende una mano. Aiuta a costruire una rete di sicurezza per chi soffre. Chiama il 1522, ogni piccolo gesto conta.",
    post5: "La violenza non è amore. Non accettare che il controllo, la gelosia o le minacce siano mascherati come affetto. Chiedi aiuto al 1522, è anonimo e gratuito. Ogni passo verso la libertà inizia con una parola.",
    post6: "Non sei sola. Ogni passo verso la libertà inizia con una parola. Il supporto è a portata di mano. Chiama il 1522. Insieme possiamo spezzare il silenzio e aiutare chi soffre.",
};

// Funzione per aprire il popup
function openPost(postId) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");

    if (postDetails[postId]) {
        popupText.textContent = postDetails[postId];
        popup.classList.remove("hidden");
    } else {
        console.error(`Post con ID '${postId}' non trovato.`);
    }
}

// Funzione per chiudere il popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
}

// Aggiungi evento click al Post 3
const post3 = document.getElementById("post3");
post3.addEventListener("click", () => {
    openPost("post3");
});

// Aggiungi evento per il pulsante di chiusura del popup
const closeButton = document.querySelector(".popup-content .close");
if (closeButton) {
    closeButton.addEventListener("click", closePopup);
}


toggleHeaderBtn.addEventListener("click", () => {
    const isHidden = header.classList.toggle("hidden");
    toggleHeaderBtn.textContent = isHidden ? "⬇" : "⬆";
    toggleHeaderBtn.style.top = isHidden ? "20px" : "60px";
});

// Seleziona il contenitore di Post 3
const post3_1 = document.getElementById("post3");
const video = post3_1.querySelector("video");
const preview = post3_1.querySelector(".video-preview");

// Funzione per avviare il video
function startVideo() {
    preview.classList.add("hidden"); // Nasconde l'immagine
    video.classList.add("playing"); // Mostra il video
    video.play()
        .then(() => {
            console.log("Video in riproduzione.");
        })
        .catch((error) => {
            console.error("Errore durante la riproduzione del video:", error);
        });
}

// Funzione per fermare il video
function stopVideo() {
    video.pause(); // Ferma la riproduzione
    video.currentTime = 0; // Ripristina il video al primo frame
    video.classList.remove("playing"); // Nasconde il video
    preview.classList.remove("hidden"); // Mostra l'immagine
}

// Aggiungi gli eventi di hover
post3.addEventListener("mouseenter", () => {
    console.log("Hover su Post 3");
    startVideo(); // Avvia il video quando il mouse entra
});

post3.addEventListener("mouseleave", () => {
    console.log("Mouse fuori da Post 3");
    stopVideo(); // Ferma il video quando il mouse esce
});




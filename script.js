document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("playAudio");
    const audio = document.getElementById("genomeAudio");
    const sections = document.querySelectorAll(".content-section");
    const intro = document.getElementById("intro");
    const pauseButton = document.getElementById("pauseAudio");
    const rewindButton = document.getElementById("rewindAudio");
    let currentSectionIndex = 0;

    playButton.addEventListener("click", () => {
        intro.style.display = "none"; // Hide intro
        document.querySelector("main").style.display = "block"; // Show main content
        audio.play(); // Start audio playback
    });

    pauseButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            pauseButton.textContent = "Pause";
        } else {
            audio.pause();
            pauseButton.textContent = "Play";
        }
    });

    rewindButton.addEventListener("click", () => {
        audio.currentTime = Math.max(0, audio.currentTime - 10); // Rewind 10 seconds
    });

    audio.addEventListener("timeupdate", () => {
        const currentTime = audio.currentTime;

        // Check if it's time to show the next section
        if (
            currentSectionIndex < sections.length &&
            currentTime >= parseFloat(sections[currentSectionIndex].dataset.time)
        ) {
            sections[currentSectionIndex].classList.add("active");
            currentSectionIndex++;
        }
    });

    audio.addEventListener("ended", () => {
        // Show a thank-you message when the audio ends
        const thankYouMessage = document.createElement("div");
        thankYouMessage.innerHTML = "<h2 class='text-center text-2xl'>Obrigado por explorar o Genoma!</h2>";
        document.body.appendChild(thankYouMessage);
    });

    // DNA Animation
    let renderer, scene, particles;
    const { innerWidth, innerHeight } = window;
    const DENSITY_RADIUS = 16;
    const PHASE_SHIFT = 120;
    let allPoints = [];
    const connectionPoints = [];

    const rad = (deg) => (deg / 180) * Math.PI;
    const getRandomPoint = () => DENSITY_RADIUS * Math.random() - DENSITY_RADIUS / 2;
    const range = (x) => Array(x).fill(0).map((_, index) => index);
    const lerpMap = (val, sMin, sMax, dMin, dMax) =>
        ((val - sMin) / (sMax - sMin)) * (dMax - dMin) + dMin;

    const init = () => {
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(innerWidth, innerHeight);
        document.getElementById("container").appendChild(renderer.domElement);
        const camera = new THREE.PerspectiveCamera(15, innerWidth / innerHeight, 1, 5000);
        camera.position.z = 2500;
        scene = new THREE.Scene();
        scene.background = null;

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        range(360).forEach((a) => {
            const angle = rad(a);
            const r = 100;
            const x = r * Math.sin(angle);
            const z = r * Math.cos(angle);
            const y = 1.5 * (a - 180);
            positions.push(x, y, z);
        });
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            color: 0x00ffcc,
            transparent: true,
            opacity: 0.6,
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const animate = () => {
            particles.rotation.y += 0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();
    };

    init();
});
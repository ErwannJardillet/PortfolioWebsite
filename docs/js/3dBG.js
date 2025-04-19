// 1. Créer la scène
const scene = new THREE.Scene();

// 2. Créer une caméra fixe
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

// Créer le rendu (canvas HTML) avec fond transparent
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '1'; // Assurer le canvas au-dessus des cercles
document.body.appendChild(renderer.domElement);

// 🎨 Couleurs de base (par défaut) pour les sphères
// (Ceci correspond à ton thème "sunset")
const gradientColors = {
    start: new THREE.Color(0xf12711), // Couleur de début (brun foncé)
    end: new THREE.Color(0xf5af19)    // Couleur de fin (orange)
};

// Stocker les sphères pour pouvoir les modifier plus tard
const rotatingSpheres = [];

// Configurer plusieurs sphères avec des positions différentes
const spheresConfig = [
    {
        size: 70,
        position: [-150, -40, -10]
    },
    {
        size: 75,
        position: [150, 60, -25]
    },
    {
        size: 80,
        position: [250, -90, -150]
    },
    {
        size: 85,
        position: [-200, 100, -190]
    },
    {
        size: 35,
        position: [10, 10, -10]
    },
    {
        size: 140,
        position: [-250, -400, -1000]
    }
];

// 🟢 Créer et afficher les sphères avec un dégradé
spheresConfig.forEach(({ size, position }) => {
    const sphereGeometry = new THREE.SphereGeometry(size, 32, 32);

    // Utiliser un ShaderMaterial pour appliquer un dégradé
    const sphereMaterial = new THREE.ShaderMaterial({
        uniforms: {
            color1: { value: gradientColors.start },
            color2: { value: gradientColors.end }
        },
        vertexShader: `
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec3 vPosition;

            void main() {
                float mixFactor = (vPosition.y + 70.0) / 140.0; 
                gl_FragColor = vec4(mix(color1, color2, mixFactor), 1.0);
            }
        `,
        side: THREE.DoubleSide
    });

    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sphere.position.set(...position);
    sphere.castShadow = false;
    sphere.receiveShadow = false;

    scene.add(sphere);
    rotatingSpheres.push(sphere);
});

// 💡 Lumière directionnelle avec ombres douces
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 50);
scene.add(directionalLight);

// 💡 Lumière ambiante douce pour un éclairage uniforme
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// 🎥 Positionner la caméra initialement
camera.position.set(0, 0, 100);

// 🎮 Effet de parallaxe en déplaçant uniquement la caméra
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// 🔄 Fonction d'affichage (caméra se déplace avec la souris)
function render() {
    // Gérer l'effet de parallaxe de la caméra
    target.x = mouse.x * 50; 
    target.y = mouse.y * 25; 
    
    camera.position.x += (target.x - camera.position.x) * 0.05;
    camera.position.y += (target.y - camera.position.y) * 0.05;

    // 🌪️ Faire tourner les sphères en fonction de la souris
    rotatingSpheres.forEach(sphere => {
        sphere.rotation.y = mouse.x * 2; 
        sphere.rotation.x = mouse.y; 
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// 📏 Adapter la scène au redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 🎮 Démarrer le rendu
render();

/**
 * Fonction globale permettant de mettre à jour à chaud
 * les couleurs du dégradé des sphères, appelée depuis
 * ton code React (dans settings.js).
 *
 * @param {number} startHex - Code couleur hexadécimal (ex: 0xff0000)
 * @param {number} endHex   - Code couleur hexadécimal (ex: 0x00ff00)
 */
window.updateThreeTheme = function(startHex, endHex) {
    rotatingSpheres.forEach((sphere) => {
        sphere.material.uniforms.color1.value.setHex(startHex);
        sphere.material.uniforms.color2.value.setHex(endHex);
    });
};

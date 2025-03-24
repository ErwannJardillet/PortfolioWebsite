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


// 🎨 Définir les couleurs spécifiques (pour le gradient)
const gradientColors = {
    start: new THREE.Color(0xf12711), // Couleur de début (brun foncé)
    end: new THREE.Color(0xf5af19)    // Couleur de fin (orange)
};

// Stocker les sphères pour appliquer la rotation
const rotatingSpheres = [];

// 🎯 Définir manuellement les positions des deux sphères
const spheresConfig = [
    {
        size: 70,
        position: [-150, -40, -10] // Position personnalisée pour la première sphère
    },
    {
        size: 75,
        position: [150, 60, -25] // Position personnalisée pour la seconde sphère
    },
    {
        size: 80,
        position: [250, -90, -150] // Position personnalisée pour la troisième sphère
    },
    {
        size: 85,
        position: [-200, 100, -190] // Position personnalisée pour la quatrième sphère
    },
    {
        size: 35,
        position: [10, 10, -10] // Position personnalisée pour la cinquième sphère
    },
    {
        size: 140,
        position: [-250, -400, -1000] // Position personnalisée pour la sixième sphère
    }
];

// 🟢 Créer et afficher les deux sphères avec un dégradé
spheresConfig.forEach(({ size, position }) => {
    const sphereGeometry = new THREE.SphereGeometry(size, 32, 32);

    // 🌈 Utiliser un ShaderMaterial pour appliquer un dégradé
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
                float mixFactor = (vPosition.y + 70.0) / 140.0; // Normaliser Y entre -70 et 70
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

// 💡 Ajouter une lumière ambiante douce pour un éclairage uniforme
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

    // 🌪️ Faire tourner les sphères lentement sur elles-mêmes
    rotatingSpheres.forEach(sphere => {
        sphere.rotation.y = mouse.x*2; // Rotation lente sur l'axe Y
        sphere.rotation.x = mouse.y; // Légère rotation sur l'axe X pour un effet supplémentaire
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

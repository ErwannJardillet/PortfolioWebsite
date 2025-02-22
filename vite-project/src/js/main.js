// 1. Créer la scène
const scene = new THREE.Scene();

// 2. Créer une caméra fixe
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
);

// 3. Créer un rendu (canvas HTML) avec fond transparent
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// 🎨 Définir les couleurs spécifiques
const colors = [0x61210F, 0xFF9500, 0xE0E2DB]; 

// Stocker les objets créés pour un accès facile
const objects = [];

// 🕒 Facteur de vitesse global (modifiable pour accélérer ou ralentir)
const speedFactor = 2.0; // 1.0 = vitesse normale, >1 = plus rapide, <1 = plus lent

// 🎲 Générer aléatoirement des sphères de différentes tailles, couleurs et positions
const sphereCount = 30;
const minSize = 4;
const maxSize = 15;

const positionBounds = {
    x: [-150, 150], 
    y: [-70, 70], 
    z: [-20, -5]  
};

const spheres = [];

for (let i = 0; i < sphereCount; i++) {
    const size = Math.random() * (maxSize - minSize) + minSize;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const position = [
        Math.random() * (positionBounds.x[1] - positionBounds.x[0]) + positionBounds.x[0],
        Math.random() * (positionBounds.y[1] - positionBounds.y[0]) + positionBounds.y[0],
        Math.random() * (positionBounds.z[1] - positionBounds.z[0]) + positionBounds.z[0]
    ];

    const sphereGeometry = new THREE.SphereGeometry(size, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 1.0,  
        metalness: 0.0  
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    sphere.position.set(...position);

    sphere.castShadow = false;
    sphere.receiveShadow = false;

    scene.add(sphere);
    objects.push(sphere);

    spheres.push({
        mesh: sphere,
        velocity: {
            x: (Math.random() - 0.5) * 0.5 * speedFactor, // Appliquer speedFactor
            y: (Math.random() - 0.5) * 0.5 * speedFactor,
            z: (Math.random() - 0.5) * 0.1 * speedFactor
        }
    });
}

// 💡 Lumière directionnelle avec ombres douces
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 50);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

// 💡 Ajouter une lumière ambiante douce pour un éclairage uniforme
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// 🎥 Positionner la caméra initialement
camera.position.set(0, 0, 50);

// 🎮 Effet de parallaxe en déplaçant uniquement la caméra
const mouse = { x: 0, y: 0 };
const target = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// 🔄 Fonction d'affichage avec mouvement aléatoire des sphères
function animate() {
    requestAnimationFrame(animate);

    // Déplacer les sphères de manière aléatoire avec rebond aux limites
    spheres.forEach(({ mesh, velocity }) => {
        mesh.position.x += velocity.x;
        mesh.position.y += velocity.y;
        mesh.position.z += velocity.z;

        // Gérer les rebonds contre les limites de la caméra
        if (mesh.position.x > positionBounds.x[1] || mesh.position.x < positionBounds.x[0]) {
            velocity.x *= -1;
        }
        if (mesh.position.y > positionBounds.y[1] || mesh.position.y < positionBounds.y[0]) {
            velocity.y *= -1;
        }
        if (mesh.position.z > positionBounds.z[1] || mesh.position.z < positionBounds.z[0]) {
            velocity.z *= -1;
        }
    });
    
    target.x = mouse.x * 13; 
    target.y = mouse.y * 7;  
    
    camera.position.x += (target.x - camera.position.x) * 0.05;
    camera.position.y += (target.y - camera.position.y) * 0.05;
    
    renderer.render(scene, camera);
}

// 📏 Adapter la scène au redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 🎮 Démarrer l'animation
animate();

console.log("Objets disponibles :", objects);

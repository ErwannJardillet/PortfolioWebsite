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

// ⚽ Générer des sphères de différentes tailles et couleurs
const sphereConfigs = [
    { size: 10, color: colors[0], position: [-80, 9, -15] },
    { size: 7, color: colors[1], position: [8, -5, -10] },
    { size: 5, color: colors[2], position: [-10, -10, 5] },
    { size: 12, color: colors[0], position: [15, 25, -5] },
    { size: 8, color: colors[1], position: [-15, 7, -20] },
    { size: 6, color: colors[2], position: [5, 15, 10] },

    { size: 10, color: colors[1], position: [-68, 35, -15] },
    { size: 7, color: colors[2], position: [85, -23, -10] },
    { size: 5, color: colors[1], position: [-32, 8, 5] },
    { size: 12, color: colors[2], position: [70, 29, -5] },
    { size: 8, color: colors[0], position: [-62, -29, -8] },
    { size: 6, color: colors[0], position: [32, -25, 10] }
];

sphereConfigs.forEach(config => {
    const sphereGeometry = new THREE.SphereGeometry(config.size, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: config.color, 
        roughness: 1.0,  // Plus rugueux pour supprimer les reflets
        metalness: 0.0   // Pas de propriété métallique pour un rendu mat
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    
    // Positionner la sphère
    sphere.position.set(...config.position);

    // Désactiver les ombres pour éviter des ombres inutiles
    sphere.castShadow = false;
    sphere.receiveShadow = false;

    scene.add(sphere);
    objects.push(sphere);
});

// 💡 Lumière directionnelle avec ombres
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 50);
directionalLight.castShadow = true;

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 12;
directionalLight.shadow.camera.far = 0;
scene.add(directionalLight);

// 💡 Ajouter une lumière ambiante douce
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
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

// 🔄 Fonction d'affichage avec caméra fixe
function animate() {
    requestAnimationFrame(animate);
    
    // Déplacer la caméra sans rotation
    target.x = mouse.x * 13; // Déplacement horizontal (gauche/droite)
    target.y = mouse.y * 7; // Déplacement vertical (haut/bas)
    
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

// 🛠️ Afficher les objets dans la console pour vérification
console.log("Objets disponibles :", objects);

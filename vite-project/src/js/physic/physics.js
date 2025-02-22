// 📦 Module du système de physique pour Three.js
export const positionBounds = {
    x: [-150, 150], 
    y: [-70, 70], 
    z: [-20, -5]  
};

// 💥 Détection des collisions et mise à jour des vitesses
export function handleCollisions(spheres) {
    spheres.forEach((sphereData, i) => {
        const { mesh, velocity, radius } = sphereData;

        // Mettre à jour la position
        mesh.position.x += velocity.x;
        mesh.position.y += velocity.y;
        mesh.position.z += velocity.z;

        // Gérer les rebonds contre les limites de la caméra
        if (mesh.position.x > positionBounds.x[1] - radius || mesh.position.x < positionBounds.x[0] + radius) {
            velocity.x *= -1;
        }
        if (mesh.position.y > positionBounds.y[1] - radius || mesh.position.y < positionBounds.y[0] + radius) {
            velocity.y *= -1;
        }
        if (mesh.position.z > positionBounds.z[1] - radius || mesh.position.z < positionBounds.z[0] + radius) {
            velocity.z *= -1;
        }

        // Détecter les collisions entre sphères
        for (let j = i + 1; j < spheres.length; j++) {
            const otherSphere = spheres[j];
            const dx = mesh.position.x - otherSphere.mesh.position.x;
            const dy = mesh.position.y - otherSphere.mesh.position.y;
            const dz = mesh.position.z - otherSphere.mesh.position.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // Si les sphères se chevauchent, inverser les vitesses
            if (distance < radius + otherSphere.radius) {
                velocity.x *= -1;
                velocity.y *= -1;
                velocity.z *= -1;

                otherSphere.velocity.x *= -1;
                otherSphere.velocity.y *= -1;
                otherSphere.velocity.z *= -1;
            }
        }
    });
}

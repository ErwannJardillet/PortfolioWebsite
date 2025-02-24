window.rotateContent = function(sectionId) {
    console.log("Bouton cliqué : " + sectionId);
    
    const mainContainer = document.getElementById('mainContainer');
    const contents = document.querySelectorAll('.content');
    
    // Réinitialise l'animation de rotation de la div
    mainContainer.classList.remove('rotate');
    void mainContainer.offsetWidth; // Hack pour redémarrer l'animation
    mainContainer.classList.add('rotate');
    
    // Début de l'effet de fondu sortant pour le texte
    contents.forEach(content => {
        content.style.opacity = '0';
    });
    
    // Changer le texte avec un fondu après 500ms (milieu de la rotation)
    setTimeout(() => {
        contents.forEach(content => {
            content.style.display = 'none';
        });

        const targetContent = document.getElementById(sectionId);
        if (!targetContent) {
            console.error("La section avec l'id '" + sectionId + "' est introuvable !");
            return;
        }
        
        targetContent.style.display = 'flex';
        targetContent.style.opacity = '0'; // Initialement invisible

        // Déclenche le fondu entrant du texte
        setTimeout(() => {
            targetContent.style.opacity = '1';
        }, 100); // Légère attente pour une transition plus douce

        console.log("Affichage du contenu : " + sectionId);
    }, 500); // Milieu de la rotation (1s / 2)
}

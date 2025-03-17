window.rotateContent = function(sectionId) {
    const contents = document.querySelectorAll('.content');
    
    // Début du fade out sur tous les contenus
    contents.forEach(content => {
        content.style.opacity = '0';
    });
    
    // Après la durée du fade out, on cache les contenus et on affiche le nouveau
    setTimeout(() => {
        contents.forEach(content => {
            content.style.display = 'none';
        });
    
        const targetContent = document.getElementById(sectionId);
        if (!targetContent) {
            console.error("La section avec l'id '" + sectionId + "' est introuvable !");
            return;
        }
        
        // Affiche le contenu ciblé et démarre le fade in
        targetContent.style.display = 'flex';
        // On s'assure qu'il soit initialement transparent
        targetContent.style.opacity = '0';
        
        // Forcer le reflow pour que la transition soit prise en compte
        void targetContent.offsetWidth;
        
        // Lancement du fade in
        targetContent.style.opacity = '1';
    }, 500); // 500ms correspondant à la durée de la transition
}

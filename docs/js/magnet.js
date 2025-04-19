document.querySelectorAll('.conteneur div').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const deltaX = (mouseX - centerX) / 10; // Ajuste la vitesse du mouvement horizontal
      const deltaY = (mouseY - centerY) / 10; // Ajuste la vitesse du mouvement vertical

      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    // Réinitialisation de la position quand la souris quitte la div
    el.addEventListener('mouseleave', function () {
      el.style.transform = 'translate(0, 0)';
    });
  });
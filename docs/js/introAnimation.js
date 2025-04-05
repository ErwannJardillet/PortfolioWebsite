window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
  
    const sections = document.querySelectorAll(".aboutMe, .skills, .contact, .realization, .education, .settings");
  
    // 🛡 Cacher immédiatement + ajouter animation directionnelle
    sections.forEach((section) => {
      section.classList.add("section-hidden");
  
      const id = section.id;
      const isLeft = ["aboutMe", "skills", "education"].includes(id);
      const isRight = ["contact", "realization", "settings"].includes(id);
  
      if (isLeft) section.classList.add("section-appear-left");
      if (isRight) section.classList.add("section-appear-right");
    });
  
    // ⏳ Laisse le loader visible un moment
    setTimeout(() => {
      loader.classList.add("fade-out");
  
      // ⏸ Pause après disparition du loader
      setTimeout(() => {
        sections.forEach((section, index) => {
          // 🔓 Débloquer visibilité + lancer animation
          section.classList.remove("section-hidden");
  
          setTimeout(() => {
            section.classList.add("section-visible");
          }, 200 * index);
        });
      }, 600); // Pause après disparition du loader
  
    }, 1200); // Durée du loader visible après chargement
  });
  
window.wrapLettersWithSpans = function () {
    const paragraphs = document.querySelectorAll("p");
  
    paragraphs.forEach((p) => {
      if (p.dataset.wrapped === "true") return;
  
      const text = p.textContent;
      const wrapped = text
        .split("")
        .map((char) => `<span class="letter">${char}</span>`)
        .join("");
  
      p.innerHTML = wrapped;
      p.dataset.wrapped = "true";
    });
  };
  

  
  window.applyTextEffect = function (effectKey, setTextEffect) {
    setTextEffect(effectKey);
  
    // Rewrap les lettres si nécessaire
    window.wrapLettersWithSpans();
  
    // Liste de tous les effets CSS qu’on utilise
    const allEffects = [
        "text-glow",
        "text-glitch",
        "text-rainbow",
        "text-matrix",
        "text-pulse"
      ];
      
  
    // Sélectionner toutes les lettres et retirer les anciens effets
    const allLetters = document.querySelectorAll(".letter");
    allLetters.forEach((span) => {
      allEffects.forEach((cls) => span.classList.remove(cls));
    });
  
    // Supprimer tous les listeners précédents (optionnel si jamais tu veux reset)
    const oldClone = window._mouseEffectHandler;
    if (oldClone) {
      window.removeEventListener("mousemove", oldClone);
      window._mouseEffectHandler = null;
    }
  
    // Appliquer un effet de proximité seulement si un effet est demandé
    if (effectKey) {
      const handler = (e) => {
        allLetters.forEach((letter) => {
          const rect = letter.getBoundingClientRect();
          const letterX = rect.left + rect.width / 2;
          const letterY = rect.top + rect.height / 2;
  
          const dx = e.clientX - letterX;
          const dy = e.clientY - letterY;
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          if (distance < 50) {
            letter.classList.add(effectKey);
          } else {
            letter.classList.remove(effectKey);
          }
        });
      };
  
      window._mouseEffectHandler = handler;
      window.addEventListener("mousemove", handler);
    }
  };
  
  window.applyTheme = function (themeKey, themes) {
    const chosenTheme = themes[themeKey];
    if (!chosenTheme) return;
  
    document.body.style.background = chosenTheme.cssBackground;
  
    if (window.updateThreeTheme) {
      window.updateThreeTheme(chosenTheme.startColor, chosenTheme.endColor);
    }
  };
  
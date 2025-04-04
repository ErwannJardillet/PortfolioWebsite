// 📦 Fichier global JS (non-modulaire) pour Babel — exposé via `window`

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
  
  window.setupProximityEffect = function (radius = 100) {
    const letters = document.querySelectorAll(".letter");
  
    window.addEventListener("mousemove", (e) => {
      letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const letterX = rect.left + rect.width / 2;
        const letterY = rect.top + rect.height / 2;
  
        const dx = e.clientX - letterX;
        const dy = e.clientY - letterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < radius) {
          letter.classList.add("glow-proximity");
        } else {
          letter.classList.remove("glow-proximity");
        }
      });
    });
  };
  
  window.applyTextEffect = function (effectKey, setTextEffect) {
    setTextEffect(effectKey);
  
    window.wrapLettersWithSpans();
  
    const allLetters = document.querySelectorAll(".letter");
    allLetters.forEach((span) => {
      span.classList.remove(
        "text-glow",
        "text-glitch",
        "text-zoom",
        "glow-proximity"
      );
    });
  
    if (effectKey === "proximity") {
      window.setupProximityEffect();
    } else {
      allLetters.forEach((span) => {
        if (effectKey) span.classList.add(effectKey);
      });
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
      
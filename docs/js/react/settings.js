function Settings() {
  const [pageIndex, setPageIndex] = React.useState(0);

  // --- Définition de toutes les pages à afficher (Paramètres / Thème / Langue)
  const pages = [
    <div className="start" key="start">
      <h1>Paramètres</h1>
      <img src="./img/settings.png" alt="settings" />
    </div>,
    <div className="theme" key="theme">
      <h1>Thème</h1>
      <div className="theme_selector">
        {/* Thème 1 : Sunset */}
        <div className="theme1" onClick={() => applyTheme("sunset")}>
          <p>sunset</p>
        </div>

        {/* Thème 2 : Galaxy */}
        <div className="theme2" onClick={() => applyTheme("galaxy")}>
          <p>galaxy</p>
        </div>

        {/* Thème 3 : Frost */}
        <div className="theme3" onClick={() => applyTheme("frost")}>
          <p>frost</p>
        </div>

        {/* Thème 4 : mint */}
        <div className="theme4" onClick={() => applyTheme("mint")}>
          <p>mint</p>
        </div>

        {/* Thème 5 : synthwave */}
        <div className="theme5" onClick={() => applyTheme("synthwave")}>
          <p>synthwave</p>
        </div>

        <div className="theme9" onClick={() => applyTheme("mono")}>
          <p>mono</p>
        </div>
      </div>
    </div>,
    <div className="language" key="language">
      <h1>Langue</h1>
    </div>,
  ];

  // --- Configuration de tous les thèmes disponibles
  const themes = {
    // Thème 1 : Sunset
    sunset: {
      cssBackground: "linear-gradient(135deg, #ff9500, #61210f)",
      startColor: 0xf12711,
      endColor: 0xf5af19,
    },
    // Thème 2 : Galaxy
    galaxy: {
      cssBackground: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      startColor: 0x1a2a6c,
      endColor: 0xb21f1f,
    },
    // Thème 3 : Frost
    frost: {
      cssBackground: "linear-gradient(135deg, #83a4d4, #b6fbff)",
      startColor: 0x2193b0,
      endColor: 0x6dd5ed,
    },
    // Thème 4 : mint
    mint: {
      cssBackground: "linear-gradient(135deg, #355c4b, #a2c2a4)",
      startColor: 0x0b8457,
      endColor: 0xbdd2b6,
    },
    // Thème 5 : synthwave
    synthwave: {
      cssBackground: "linear-gradient(135deg, #ff512f, #dd2476)",
      startColor: 0xff6a00,
      endColor: 0xee0979,
    },
    mono: {
      cssBackground: "linear-gradient(135deg, #2c3e50, #bdc3c7)",
      startColor: 0x2c3e50,
      endColor: 0xbdc3c7,
    },
  };

  // --- Naviguer entre les pages "Paramètres", "Thème" et "Langue"
  const nextPage = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  const prevPage = () => {
    setPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
  };

  // --- Fonction pour appliquer un thème au clic
  function applyTheme(themeKey) {
    const chosenTheme = themes[themeKey];
    // 1) Changer le background du body
    document.body.style.background = chosenTheme.cssBackground;

    // 2) Mettre à jour les sphères (shader) dans Three.js
    //    (Assure-toi que window.updateThreeTheme est bien défini dans 3dBG.js)
    if (window.updateThreeTheme) {
      window.updateThreeTheme(chosenTheme.startColor, chosenTheme.endColor);
    }
  }

  // --- Rendu de l'UI
  return (
    <section className="settings_content">
      <div className="left" onClick={prevPage}>
        <p>❮</p>
      </div>
      <div className="center">{pages[pageIndex]}</div>
      <div className="right" onClick={nextPage}>
        <p>❯</p>
      </div>
    </section>
  );
}

// --- Montage du composant React dans la div #settings
const root = ReactDOM.createRoot(document.getElementById("settings"));
root.render(<Settings />);

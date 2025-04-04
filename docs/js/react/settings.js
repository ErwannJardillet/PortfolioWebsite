function Settings() {
    const [pageIndex, setPageIndex] = React.useState(0);
    const [textEffect, setTextEffect] = React.useState("");
  
    const themes = {
      sunset: {
        cssBackground: "linear-gradient(135deg, #ff9500, #61210f)",
        startColor: 0xf12711,
        endColor: 0xf5af19,
      },
      galaxy: {
        cssBackground: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        startColor: 0x1a2a6c,
        endColor: 0xb21f1f,
      },
      frost: {
        cssBackground: "linear-gradient(135deg, #83a4d4, #b6fbff)",
        startColor: 0x2193b0,
        endColor: 0x6dd5ed,
      },
      mint: {
        cssBackground: "linear-gradient(135deg, #355c4b, #a2c2a4)",
        startColor: 0x0b8457,
        endColor: 0xbdd2b6,
      },
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
  
    const pages = [
      <div className="start" key="start">
        <h1>Paramètres</h1>
        <img src="./img/settings.png" alt="settings" />
      </div>,
  
      <div className="theme" key="theme">
        <h1>Thème</h1>
        <div className="theme_selector">
          {Object.keys(themes).map((themeKey, i) => (
            <div
              key={themeKey}
              className={`theme${i + 1}`}
              onClick={() => handleTheme(themeKey)}
            >
              <p>{themeKey}</p>
            </div>
          ))}
        </div>
      </div>,
  
      <div className="textEffect" key="textEffect">
        <h1>Effet du texte</h1>
        <div className="textEffect_selector">
          <div className="textEffect0" onClick={() => handleTextEffect("")}>
            <p>aucun</p>
          </div>
          <div className="textEffect4" onClick={() => handleTextEffect("proximity")}>
            <p>effet aura</p>
          </div>
          <div className="textEffect2" onClick={() => handleTextEffect("text-glitch")}>
            <p>effet 2</p>
          </div>
          <div className="textEffect3" onClick={() => handleTextEffect("text-zoom")}>
            <p>effet 3</p>
          </div>
        </div>
      </div>,
    ];
  
    const nextPage = () => {
      setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
    };
  
    const prevPage = () => {
      setPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
    };
  
    function handleTheme(themeKey) {
      window.applyTheme(themeKey, themes);
    }
  
    function handleTextEffect(effectKey) {
      window.applyTextEffect(effectKey, setTextEffect);
    }
  
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
  
  const root = ReactDOM.createRoot(document.getElementById("settings"));
  root.render(<Settings />);
  
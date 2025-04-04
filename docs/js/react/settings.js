function Settings() {
    const [pageIndex, setPageIndex] = React.useState(0);
  
    const pages = [
      <div className="help" key="help">
        <h1>Paramètres</h1>
        <p>Cette page est en cours de développement.</p>
        <p>Merci de votre compréhension.</p>
      </div>,
      <div className="theme" key="theme">
        <h1>🎨 Thème</h1>
        <p>Ici tu pourras changer le thème du portfolio.</p>
        {/* Ajout d'un bouton plus tard */}
      </div>,
      <div className="language" key="langue">
        <h1>🌐 Langue</h1>
        <p>Choisis la langue de ton interface (à venir).</p>
      </div>
    ];
  
    const nextPage = () => {
      setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
    };
  
    const prevPage = () => {
      setPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
    };
  
    return (
      <section className="settings_content">
        <div className="left" onClick={prevPage}><p>❮</p></div>
        <div className="center">
          {pages[pageIndex]}
        </div>
        <div className="right" onClick={nextPage}><p>❯</p></div>
      </section>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById("settings"));
  root.render(<Settings />);
  
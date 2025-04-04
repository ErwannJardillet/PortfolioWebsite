function Settings() {
    const [pageIndex, setPageIndex] = React.useState(0);
  
    const pages = [
      <div className="start" key="start">
        <h1>Paramètres</h1>
        <img src="./img/settings.png"></img>
      </div>,
      <div className="theme" key="theme">
        <h1>Thème</h1>

        <div class = "theme_selector">
            <div class="theme1">
                
            </div>
        </div>

      </div>,
      <div className="language" key="langue">
        <h1>Langue</h1>
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
  
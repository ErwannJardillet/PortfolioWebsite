    // Composant React pour la section "À propos de moi"
    function AboutMe() {
        return (
            
        );
    }

    // App principale qui contiendra d'autres sections à l'avenir
    function App() {
        return (
            <div>
                <AboutMe />
            </div>
        );
    }

    // Intégration React dans la div #mainContainer
    const root = ReactDOM.createRoot(document.getElementById("mainContainer"));
    root.render(<App />);

// Composant React pour la section "À propos de moi"
function AboutMe() {
    return (
        <section id="aboutMe">
        </section>
    );
}


// Intégration React dans la div #mainContainer
const root = ReactDOM.createRoot(document.getElementById("aboutMe"));
root.render(<AboutMe />);

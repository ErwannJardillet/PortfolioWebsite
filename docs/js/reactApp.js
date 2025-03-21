// Composant React pour la section "À propos de moi"
function AboutMe() {
    return (
        <div className="content fade" id="aboutMe" style={{ display: "flex" }}>
            <div className="facePic">
                <img src="../img/Matete.png" alt="facePic" />
            </div>
            <div className="aboutMeText">
                <div className="aboutMeText1">
                    <p>
                        Jeune développeur passionné et actuellement étudiant en informatique à l'IUT de Valence,
                        je me spécialise dans le développement d'applications web et la conception d'interfaces
                        utilisateurs.
                    </p>
                </div>
                <div className="aboutMeText2">
                    <p>
                        Fort de mes expériences, allant de la refonte d’un site web dans un cadre académique
                        à des missions professionnelles, j’ai développé de solides compétences en HTML, CSS, PHP,
                        JavaScript et Python.
                        Curieux et créatif, je m’intéresse également au design graphique, à la photographie et au sport.
                    </p>
                </div>
                <div className="aboutMeText3">
                    <p>
                        Toujours en quête de nouveaux défis, je souhaite mettre mon savoir-faire au service de
                        projets stimulants et contribuer activement à leur succès.
                    </p>
                </div>
            </div>
        </div>
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

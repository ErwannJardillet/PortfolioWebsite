// Composant React pour la section "À propos de moi"
function AboutMe() {
    return (
        <section id="aboutMe">
            <div class="pic">
                <img src="./img/me.png" alt="Photo de moi" />
                <p>Jardillet<br/> Erwann</p>
            </div>
            <div class="content">
                <div class="text1"> <p>Passionné par le développement web et les nouvelles technologies, je suis constamment à la recherche de nouveaux défis pour améliorer mes compétences. Curieux, rigoureux et créatif, j’aime transformer des idées en projets concrets et fonctionnels.</p></div>
                <div class="line"></div>
                <div class="text2"> <p>Mon objectif est de contribuer à des projets innovants tout en continuant d’apprendre chaque jour. J’accorde une grande importance au travail d’équipe, à l’écoute active et à la qualité du code. Chaque ligne que j’écris vise à avoir un impact positif et durable.</p></div>
            </div>
        </section>
    );
}


// Intégration React dans la div #mainContainer
const root = ReactDOM.createRoot(document.getElementById("aboutMe"));
root.render(<AboutMe />);

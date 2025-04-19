function Education() {
  // Tableau des images
  const images = ["./img/iut_valence.jpg", "./img/iut_valence.jpg"];

  // Tableau des textes correspondant aux images
  const texts = [
    "<div class= 'toptext'>BUT Informatique – IUT de Valence (2 ans)</div> <br> <div class= 'bottometext'>Parcours A : Réalisation d’Applications : Conception, Développement, Validation </div>",
    "<div class= 'toptext'>BUT Informatique – IUT de Valence (2 ans)</div> <br> <div class= 'bottometext'>Parcours A : Réalisation d’Applications : Conception, Développement, Validation </div>",
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleLeftClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="img_conteneur">
      {/* Zones cliquables */}
      <div className="click-zone left" onClick={handleLeftClick}></div>
      <div className="click-zone middle"></div>
      <div className="click-zone right" onClick={handleRightClick}></div>

      {/* L'image */}
      <img
        className="education-img"
        src={images[currentIndex]}
        alt="Education"
      />

      {/* Texte overlay qui change en fonction de l'image */}
      <div
        className="overlay-text"
        dangerouslySetInnerHTML={{ __html: texts[currentIndex] }}
      ></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("education"));
root.render(<Education />);

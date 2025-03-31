function Education() {
    const images = [
      "./img/iut_valence.jpg",
      "./img/autre_image.jpg",
      "./img/encore_une.jpg"
    ];
  
    const [index, setIndex] = React.useState(0);
  
    const prevImage = () => {
      setIndex((index - 1 + images.length) % images.length);
    };
  
    const nextImage = () => {
      setIndex((index + 1) % images.length);
    };
  
    return (
      <section className="education-content">
        <div className="image">
          <div className="left" onClick={prevImage}>
            <span className="arrow">‹</span>
          </div>
          <img src={images[index]} alt="Éducation" />
          <div className="right" onClick={nextImage}>
            <span className="arrow">›</span>
          </div>
        </div>
      </section>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById("education"));
  root.render(<Education />);
  
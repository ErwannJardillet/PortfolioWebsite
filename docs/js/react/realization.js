// React component for the "Realization" section
function Realization() {
  return (
    <section class="realization_content">
      <div class="img_link">
        <img src="./img/wip.png"></img>
      </div>

      <div class="text_area">
        <p>
          🔧 En cours de développement Cet endroit accueillera prochainement
          l’ensemble de mes réalisations. N’hésitez pas à revenir bientôt pour
          découvrir mon travail.
        </p>
      </div>
    </section>
  );
}

// React integration into the div #realization
const root = ReactDOM.createRoot(document.getElementById("realization"));
root.render(<Realization />);

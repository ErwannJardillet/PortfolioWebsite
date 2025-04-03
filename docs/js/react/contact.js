function Contact() {
    // Fonction de copie dans le presse-papiers
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert(`Copié : ${text}`);
      }).catch(err => {
        console.error('Erreur lors de la copie :', err);
      });
    };
  
    return (
      <section className="contact_content">
        <div className="email" onClick={() => copyToClipboard("jardillete@gmail.com")} style={{ cursor: 'pointer' }}>
          <div className="logo">
            <img src="./img/mailLogo.png" alt="Mail Logo" />
          </div>
          <div className="text">
            <p>jardillete@gmail.com</p>
          </div>
        </div>
  
        <div className="github" onClick={() => copyToClipboard("https://github.com/ErwannJardillet")} style={{ cursor: 'pointer' }}>
          <div className="logo">
            <img src="./img/githubLogo.png" alt="GitHub Logo" />
          </div>
          <div className="text">
            <p>ErwannJardillet</p>
          </div>
        </div>
      </section>
    );
  }
  

// React integration into the div #contact
const root = ReactDOM.createRoot(document.getElementById("contact"));
root.render(<Contact />);

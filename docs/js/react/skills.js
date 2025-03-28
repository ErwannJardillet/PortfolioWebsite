// React component for the "Skills" section
function Skills() {
    const logos = [
        "c.png", "css.png", "html.png", "javascipt.png",
        "java.png", "python.png", "rust.png", "php.png",
        "react.png", "git.png", "figma.png"
    ];

    const repeatedLogos = [...logos, ...logos];

    return (
        <section id="skills">
            <div className="carousel-track">
                {repeatedLogos.map((logo, index) => (
                    <img key={index} src={`docs/img/${logo}`} alt={logo.replace(".png", "")} />
                ))}
            </div>
        </section>
    );
}

// React integration into the div #skills
const root = ReactDOM.createRoot(document.getElementById("skills"));
root.render(<Skills />);

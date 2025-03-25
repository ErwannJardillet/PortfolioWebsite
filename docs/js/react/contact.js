// React component for the "Contact" section
function Contact() {
    return (
        <section id="contact">
        </section>
    );
}

// React integration into the div #contact
const root = ReactDOM.createRoot(document.getElementById("contact"));
root.render(<Contact />);
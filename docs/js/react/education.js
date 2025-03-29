// React component for the "Education" section
function Education() {
    return (
        <section id="education">
            <div class="image"><img src="./img/iut_valence.jpg"></img></div>
        </section>
    );
}

// React integration into the div #education
const root = ReactDOM.createRoot(document.getElementById("education"));
root.render(<Education />);
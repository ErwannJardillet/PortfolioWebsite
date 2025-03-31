// React component for the "Education" section
function Education() {
    return (
        <section id="education">
            <div class="image">
                <div class = "left"></div>
                <img src="./img/iut_valence.jpg"></img>
                <div class = "right"></div>
                </div>
        </section>
    );
}

// React integration into the div #education
const root = ReactDOM.createRoot(document.getElementById("education"));
root.render(<Education />);
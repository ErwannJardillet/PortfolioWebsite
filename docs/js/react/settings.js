// React component for the "Settings" section
function Settings() {
    return (
        <section id="settings">
        </section>
    );
}

// React integration into the div #settings
const root = ReactDOM.createRoot(document.getElementById("settings"));
root.render(<Settings />);
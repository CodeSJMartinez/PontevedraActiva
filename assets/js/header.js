document.addEventListener("DOMContentLoaded", function() {
    const noHeader = document.body.classList.contains('no-header');

    if (!noHeader) {
        const headerTemplate = `
            <header>
                <h1>SL Pontevedra Activa</h1>
                <nav>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="site-map.html">Guía Rápida</a></li>
                    </ul>
                </nav>
            </header>
        `;

        // Inserta el header en el body
        const bodyElement = document.body;
        bodyElement.insertAdjacentHTML('afterbegin', headerTemplate);
    }
});


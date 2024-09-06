document.addEventListener("DOMContentLoaded", function() {
    const noHeader = document.body.classList.contains('no-header');

    if (!noHeader) {
        const headerTemplate = `
            <header>
                <h1>Mi Sitio Web</h1>
                <nav>
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="categoria1.html">Categoría 1</a></li>
                        <li><a href="categoria2.html">Categoría 2</a></li>
                        <li><a href="categoria3.html">Categoría 3</a></li>
                        <li><a href="categoria4.html">Categoría 4</a></li>
                        <li><a href="blog.html">Blog</a></li>
                    </ul>
                </nav>
            </header>
        `;

        // Inserta el header en el body
        const bodyElement = document.body;
        bodyElement.insertAdjacentHTML('afterbegin', headerTemplate);
    }
});


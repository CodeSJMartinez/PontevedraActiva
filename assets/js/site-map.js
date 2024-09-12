document.addEventListener("DOMContentLoaded", async function () {
    const siteMapContainer = document.getElementById('site-map');

    try {
        // Cargar el archivo JSON de temas
        const themesResponse = await fetch('assets/json/themes.json');
        const themesData = await themesResponse.json();

        // Recorrer cada tema y generar el esquema
        for (const theme of themesData.themes) {
            // Crear el título del tema
            const themeTitle = document.createElement('h2');
            themeTitle.textContent = theme.name;
            siteMapContainer.appendChild(themeTitle);

            // Crear una lista para los posts del tema
            const postList = document.createElement('ul');
            postList.id = `theme-${theme.id}-posts`;

            // Cargar el archivo de posts correspondiente al tema
            const themeFolder = theme.id < 10 ? `theme0${theme.id}` : `theme${theme.id}`;
            const postsResponse = await fetch(`${themeFolder}/json/posts.json`);

            if (postsResponse.ok) {
                const postsData = await postsResponse.json();

                // Recorrer cada post del tema y agregarlo a la lista
                for (const post of postsData.posts) {
                    const postItem = document.createElement('li');
                    const postLink = document.createElement('a');
                    postLink.href = `theme-post.html?file=${themeFolder}/${post.theme_code}`;
                    postLink.textContent = post.title;
                    postItem.appendChild(postLink);
                    postList.appendChild(postItem);
                }
            } else {
                const errorItem = document.createElement('li');
                errorItem.textContent = "No se pudieron cargar los posts de este tema.";
                postList.appendChild(errorItem);
            }

            // Agregar la lista de posts al contenedor
            siteMapContainer.appendChild(postList);
        }
    } catch (error) {
        console.error('Error al cargar el mapa del sitio:', error);
        siteMapContainer.innerHTML = '<p>Error al generar el mapa del sitio.</p>';
    }
});

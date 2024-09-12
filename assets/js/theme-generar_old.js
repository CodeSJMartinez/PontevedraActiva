document.addEventListener("DOMContentLoaded", async function () {
    const themeContainer = document.getElementById('theme-posts');
    const themeTitle = document.getElementById('theme-title');
    const urlParams = new URLSearchParams(window.location.search);
    const themeId = urlParams.get('theme'); // Obtener el ID del tema desde la URL

    if (!themeId) {
        themeTitle.textContent = 'Tema no especificado';
        themeContainer.innerHTML = '<p>Error: No se especificó ningún tema.</p>';
        return;
    }

    try {
        // Cargar el archivo JSON de temas
        const themesResponse = await fetch('assets/json/themes.json');
        const themesData = await themesResponse.json();
        const theme = themesData.themes.find(t => t.id == themeId);

        if (!theme) {
            throw new Error('Tema no encontrado');
        }

        // Mostrar el nombre del tema
        themeTitle.textContent = theme.name;

        // Cargar los posts asociados al tema
        const postsResponse = await fetch(`theme0${themeId}/json/posts.json`);
        if (!postsResponse.ok) throw new Error('No se pudo cargar el archivo JSON de posts');
        const postsData = await postsResponse.json();

        // Crear una tarjeta para cada post
        postsData.posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'post-card';

            const postTitle = document.createElement('h3');
            postTitle.textContent = post.title || 'Título no disponible';

            const postLink = document.createElement('a');
            postLink.textContent = "Ver Más >";
            postLink.href = `theme-post.html?file=theme0${themeId}/${post.theme_code}`;

            postElement.appendChild(postTitle);
            postElement.appendChild(postLink);
            themeContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('Error al cargar los posts:', error);
        themeContainer.innerHTML = '<p>Error al cargar el contenido.</p>';
    }
});
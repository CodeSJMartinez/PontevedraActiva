document.addEventListener("DOMContentLoaded", async function () {
    const themeContainer = document.getElementById('theme-posts');
    const theme = window.location.pathname.split('/').pop().split('.')[0]; // Por ejemplo, Theme01

    try {
        const response = await fetch(`${theme}/json/posts.json`);
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        const jsonData = await response.json();

        jsonData.posts.forEach(post => {
            createPostCard(post, theme);
        });
    } catch (error) {
        console.error('Error al cargar los posts:', error);
        themeContainer.innerHTML = '<p>Error al cargar el contenido.</p>';
    }

    function createPostCard(postJson, theme) {
        const postElement = document.createElement('article');
        postElement.className = 'post-card'; // Asegúrate de usar esta clase
    
        const imgElement = document.createElement('img');
        const imageSrc = postJson.img ? `${theme}/img/${postJson.img}` : 'assets/images/default.jpg';
        imgElement.src = imageSrc;
        imgElement.alt = postJson.title || 'Imagen genérica';
    
        const postTitle = document.createElement('h3');
        postTitle.textContent = postJson.title || 'Título no disponible';
    
        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `theme-post.html?file=${theme}/${postJson.theme_code}`;
    
        //postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postLink);
    
        // Añade la tarjeta al contenedor
        themeContainer.appendChild(postElement);
    }
});

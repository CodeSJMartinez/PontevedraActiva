document.addEventListener("DOMContentLoaded", async function () {
    const blogContainer = document.getElementById('blog-posts');

    // Cargar el JSON
    let jsonData;
    try {
        const response = await fetch('blog/json/posts.json');
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        jsonData = await response.json();
        console.log('Datos JSON cargados:', jsonData);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }

    function createPostCard(postJson) {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';
        postElement.dataset.blogCode = postJson.blog_code; // Guardar el código del blog para usarlo más tarde

        // Crear el elemento de imagen
        const imgElement = document.createElement('img');
        imgElement.src = `blog/img/${postJson.blog_code.split('/').pop().replace('.md', '.jpg')}`;
        imgElement.onerror = () => {
            imgElement.src = 'blog/img/default.jpg'; // Imagen genérica si falla la carga
        };

        const postTitle = document.createElement('h3');
        postTitle.textContent = postJson.title || 'Título no disponible';

        const postExcerpt = document.createElement('p');
        postExcerpt.textContent = postJson.intro || 'Descripción no proporcionada';

        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `post.html?file=blog/${postJson.blog_code}`;

        // Crear el div para mostrar el blog-code
        const blogCodeElement = document.createElement('div');
        blogCodeElement.className = 'blog-code';
        blogCodeElement.textContent = `Ref: ${postJson.blog_code}`;
        blogCodeElement.style.fontSize = '0.8rem'; // Texto pequeño
        blogCodeElement.style.color = '#666'; // Color gris claro

        postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);
        postElement.appendChild(postLink);
        postElement.appendChild(blogCodeElement);
        blogContainer.appendChild(postElement);
    }

    // Crear tarjetas para cada post en el JSON
    jsonData?.posts.forEach(post => {
        createPostCard(post);
    });

    // Agregar eventos para redirigir al hacer clic en la tarjeta
    blogContainer.addEventListener('click', function (event) {
        const card = event.target.closest('.post-card');
        if (card) {
            const blogCode = card.dataset.blogCode;
            window.location.href = `post.html?file=blog/${blogCode}`;
        }
    });
});

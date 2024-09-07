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
        blogContainer.innerHTML = '<p>Error al cargar el contenido del blog.</p>';
        return;
    }

    function createPostCard(postJson) {
        const postElement = document.createElement('article');
        postElement.className = 'post-card';
        postElement.setAttribute('aria-labelledby', postJson.blog_code); // Mejora accesibilidad
        postElement.dataset.blogCode = postJson.blog_code;

        // Imagen con manejo de errores
        const imgElement = document.createElement('img');
        const imageSrc = postJson.img ? `blog/img/${postJson.img}` : 'blog/img/default.jpg';
        imgElement.src = imageSrc;
        imgElement.alt = postJson.title ? postJson.title : 'Imagen genérica';
        imgElement.onerror = () => { imgElement.src = 'blog/img/default.jpg'; };

        const postTitle = document.createElement('h3');
        postTitle.id = postJson.blog_code;  // Asociado para accesibilidad
        postTitle.textContent = postJson.title || 'Título no disponible';

        const postExcerpt = document.createElement('p');
        postExcerpt.textContent = postJson.intro || 'Descripción no proporcionada';

        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `post.html?file=blog/${postJson.blog_code}`;
        postLink.setAttribute('aria-label', `Leer más sobre ${postJson.title || 'este artículo'}`);

        const blogCodeElement = document.createElement('div');
        blogCodeElement.className = 'blog-code';
        blogCodeElement.textContent = `Ref: ${postJson.blog_code}`;
        blogCodeElement.style.fontSize = '0.8rem';
        blogCodeElement.style.color = '#666';

        postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);
        postElement.appendChild(postLink);
        postElement.appendChild(blogCodeElement);
        blogContainer.appendChild(postElement);
    }

    // Crear tarjetas para cada post en el JSON
    jsonData?.posts.forEach(post => {
        if (post.blog_code && post.title) {
            createPostCard(post);
        } else {
            console.warn('Post con datos faltantes:', post);
        }
    });

    // Redirección al hacer clic en una tarjeta completa
    blogContainer.addEventListener('click', function (event) {
        const card = event.target.closest('.post-card');
        if (card) {
            const blogCode = card.dataset.blogCode;
            window.location.href = `post.html?file=blog/${blogCode}`;
        }
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let postFile = urlParams.get('file');  // Ejemplo: post1.md

    // Verifica si se pasó un archivo como parámetro
    if (postFile) {
        try {
            // Remueve cualquier ruta adicional de 'postFile' si la incluye.
            postFile = postFile.split('/').pop(); // Esto deja solo el nombre del archivo, por ejemplo, 'post1.md'.

            // Cargar el archivo JSON con los detalles de los posts
            const responseJson = await fetch('blog/json/posts.json');
            if (!responseJson.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const postsData = await responseJson.json();
            // Busca el post correspondiente por el blog_code
            const postDetails = postsData.posts.find(post => post.blog_code === postFile);

            // Verifica si se encontró el post en el JSON
            if (postDetails) {
                console.log("Post encontrado en JSON:", postDetails);

                // Actualiza el título con el valor del JSON
                const titleElement = document.getElementById('post-title');
                titleElement.textContent = postDetails.title;

                // Cargar el contenido del archivo Markdown
                const responseMd = await fetch(`blog/${postFile}`);
                if (!responseMd.ok) {
                    throw new Error(`Error al cargar el archivo ${postFile}`);
                }

                const mdContent = await responseMd.text();
                const postContent = marked.parse(mdContent);
                const contentElement = document.getElementById('post-content');
                contentElement.innerHTML = postContent;

                // Generar el índice de contenido basado en los H2
                generateContentIndex();
            } else {
                console.error('No se encontró el post en el JSON');
                document.getElementById('post-title').textContent = 'Post no encontrado';
                document.getElementById('post-content').textContent = 'El contenido no está disponible.';
            }
        } catch (error) {
            console.error('Error al cargar el post:', error);
            document.getElementById('post-title').textContent = 'Error al cargar el post';
            document.getElementById('post-content').textContent = 'No se pudo cargar el contenido del post.';
        }
    } else {
        document.getElementById('post-title').textContent = 'Archivo no especificado';
        document.getElementById('post-content').textContent = 'No se ha proporcionado un archivo para mostrar.';
    }

    // Función para generar el índice de contenido
    function generateContentIndex() {
        const contentElement = document.getElementById('post-content');
        const headings = contentElement.querySelectorAll('h2');
        const indexList = document.getElementById('index-list');
        indexList.innerHTML = '';

        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;  // Asigna un ID único a cada H2
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            listItem.appendChild(link);
            indexList.appendChild(listItem);
        });
    }
});

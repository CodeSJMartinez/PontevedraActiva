document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let postFile = urlParams.get('file');

    if (postFile) {
        const [theme, postCode] = postFile.split('/');

        try {
            // Cargar datos del tema
            const responseJson = await fetch(`${theme}/json/posts.json`);
            if (!responseJson.ok) throw new Error('Error al cargar los datos del tema');

            const postsData = await responseJson.json();
            const postDetails = postsData.posts.find(post => post.theme_code === postCode);

            if (postDetails) {
                document.getElementById('post-title').textContent = postDetails.title;
                document.getElementById('back-to-theme').href = `${theme}.html`;

                const requestUrl = `${theme}/posts/${postCode}`; // Asegúrate de incluir la extensión .md
                console.log('Fetching URL:', requestUrl);

                try {
                    const responseMd = await fetch(requestUrl);
                    if (!responseMd.ok) throw new Error(`Error al cargar el archivo del post: ${responseMd.statusText}`);

                    const mdContent = await responseMd.text();
                    console.log('Markdown Content:', mdContent); // Para verificar el contenido cargado
                    document.getElementById('post-content').innerHTML = marked.parse(mdContent); // Usa marked.parse

                } catch (error) {
                    console.error('Error al procesar el contenido del post:', error);
                    document.getElementById('post-content').innerHTML = '<p>Error al cargar el contenido del post.</p>';
                }
            } else {
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
});

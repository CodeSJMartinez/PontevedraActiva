document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let postFile = urlParams.get('file');

    if (postFile) {
        try {
            postFile = postFile.split('/').pop();

            const responseJson = await fetch('blog/json/posts.json');
            if (!responseJson.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }

            const postsData = await responseJson.json();
            const postDetails = postsData.posts.find(post => post.blog_code === postFile);

            if (postDetails) {
                document.getElementById('post-title').textContent = postDetails.title;

                const responseMd = await fetch(`blog/posts/${postFile}`);
                if (!responseMd.ok) {
                    throw new Error(`Error al cargar el archivo ${postFile}`);
                }

                const mdContent = await responseMd.text();
                const postContent = marked.parse(mdContent);
                document.getElementById('post-content').innerHTML = postContent;

                generateContentIndex();
            } else {
                document.getElementById('post-title').textContent = 'Post no encontrado';
                document.getElementById('post-content').textContent = 'El contenido no está disponible.';
            }
        } catch (error) {
            document.getElementById('post-title').textContent = 'Error al cargar el post';
            document.getElementById('post-content').textContent = 'No se pudo cargar el contenido del post.';
        }
    } else {
        document.getElementById('post-title').textContent = 'Archivo no especificado';
        document.getElementById('post-content').textContent = 'No se ha proporcionado un archivo para mostrar.';
    }

    function generateContentIndex() {
        const contentElement = document.getElementById('post-content');
        const headings = contentElement.querySelectorAll('h2');
        const indexList = document.getElementById('index-list');
        indexList.innerHTML = '';

        headings.forEach((heading, index) => {
            const id = `section-${index}`;
            heading.id = id;
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${id}`;
            link.textContent = heading.textContent;
            listItem.appendChild(link);
            indexList.appendChild(listItem);
        });
    }
});

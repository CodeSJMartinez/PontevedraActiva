 Nuevo requerimiento: Estructurar un sistema donde en lugar de un único blog, tengas múltiples secciones o "temas" (equivalentes a blogs individuales), cada uno con su propia lista de artículos (markdown). Voy a hacer una propuesta inicial para que tengamos un esquema claro antes de entrar en el código.

### **Análisis de la Propuesta**

La idea es replicar el funcionamiento actual del blog para más de 10 temas, manteniendo una estructura de archivos y carpetas consistente y clara. Vamos a analizar algunos puntos clave y cómo abordarlos:

#### **1. Estructura del Proyecto**
En lugar de tener solo un `blog.html`, ahora tendrás:
- `Theme01.html`, `Theme02.html`, `Theme03.html`, etc.
- Cada uno de estos archivos HTML funcionará como la página de listado de posts para ese tema.
  
Para los posts individuales:
- En lugar de `post.html`, tendrás un único archivo `theme-post.html` que funcionará de manera dinámica para cualquier post dentro de cualquiera de los temas.
  
Para la estructura de carpetas:
- Tendrás carpetas separadas para cada tema, como `Theme01/`, `Theme02/`, etc., donde se almacenarán tanto las imágenes como los archivos `.md` (posts) de cada tema.

#### **2. Scripts Reutilizables**
- **`themes.js`**: Este script se encargará de manejar las páginas de los listados de posts (`Theme01.html`, `Theme02.html`, etc.). Será reutilizable para todas las páginas de listados, cargando dinámicamente los posts de cada tema.
  
- **`theme-post.js`**: Será utilizado para cargar y mostrar un post específico, de cualquier tema. Este script será lo suficientemente dinámico para trabajar con cualquier archivo `.md` desde cualquiera de los temas.

#### **3. Separación del Blog**
- El blog que ya tienes se mantendrá independiente. Su funcionalidad seguirá igual, pero ahora habrá una clara diferenciación entre el blog (`blog.html`, `post.html`, `script.js`) y los nuevos temas (`Theme01.html`, `theme-post.html`, `themes.js`, etc.).

#### **4. Carga Dinámica y Navegación**
- La navegación entre temas será similar a como se navega entre posts en el blog. Se manejará la carga dinámica de los posts, y se generará un índice o lista de artículos de manera similar.
  
#### **5. Posible Estructura de Archivos**
La estructura del proyecto podría quedar algo así:

```plaintext
/assets
  /css
    styles.css (el mismo archivo de estilos, extendido para múltiples temas)
  /js
    header.js
    script.js (exclusivo para el blog)
    themes.js (para las páginas de temas)
    theme-post.js (para los posts individuales de los temas)
    post.js (exclusivo para el blog)
  /images
    (imágenes generales para el sitio)
  
/blog
  /json/posts.json (para el blog principal)
  /img
  /posts (archivos markdown del blog)

/Theme01
  /json/posts.json (para el tema 01)
  /img
  /posts (archivos markdown del tema 01)

/Theme02
  /json/posts.json (para el tema 02)
  /img
  /posts (archivos markdown del tema 02)

...

/Theme10
  /json/posts.json (para el tema 10)
  /img
  /posts (archivos markdown del tema 10)

index.html (página principal que enlaza a cada tema y al blog)
Theme01.html
Theme02.html
...
Theme10.html
theme-post.html (único archivo para mostrar los posts individuales de cualquier tema)
blog.html (página principal del blog)
post.html (página para mostrar posts individuales del blog)
```

### **6. Ajustes del Script: Carga Dinámica por Tema**
- El archivo `themes.js` manejará la carga de los artículos en cada tema. Al igual que se hace en el blog, se cargarán los archivos `.json` de cada tema (por ejemplo, `Theme01/json/posts.json`) para listar los posts específicos de ese tema.
  
- **`theme-post.js`** trabajará de manera similar a `post.js`, pero necesitará adaptarse para que, según el tema (por ejemplo, `Theme01`), cargue el archivo `.md` adecuado dentro de la carpeta correspondiente.

### **7. Navegación Global**
En la página principal (`index.html`), puede haber enlaces a cada uno de los temas y al blog, para facilitar la navegación.

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Página principal con acceso a múltiples temas y blog">
    <title>Temas y Blog - Pontevedra Activa</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <!-- Menú principal -->
    <header>
        <h1>Bienvenido a Pontevedra Activa</h1>
        <nav>
            <ul>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="Theme01.html">Tema 01</a></li>
                <li><a href="Theme02.html">Tema 02</a></li>
                <li><a href="Theme03.html">Tema 03</a></li>
                <!-- Enlaces para todos los temas -->
            </ul>
        </nav>
    </header>

    <main>
        <h2>Explora nuestros temas y blog</h2>
        <p>Selecciona un tema o accede a nuestro blog para leer los artículos más recientes sobre desarrollo web y tecnología.</p>
    </main>
</body>
</html>
```

### **Ajustes en los Scripts**

#### **`themes.js`**
Este archivo gestionará la carga de artículos de cualquier tema. Aquí se utiliza un parámetro en la URL para saber qué tema se está cargando y así acceder a los datos correspondientes.

```javascript
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
        postElement.className = 'post-card';
        postElement.dataset.blogCode = postJson.blog_code;

        const imgElement = document.createElement('img');
        const imageSrc = postJson.img ? `${theme}/img/${postJson.img}` : `${theme}/img/default.jpg`;
        imgElement.src = imageSrc;
        imgElement.alt = postJson.title || 'Imagen genérica';

        const postTitle = document.createElement('h3');
        postTitle.textContent = postJson.title || 'Título no disponible';

        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `theme-post.html?file=${theme}/${postJson.blog_code}`;

        postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postLink);
        themeContainer.appendChild(postElement);
    }
});
```

#### **`theme-post.js`**
Este script será muy similar a `post.js`, pero será dinámico para manejar los posts de cualquier tema.

```javascript
document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    let postFile = urlParams.get('file');

    if (postFile) {
        const theme = postFile.split('/')[0]; // Tema correspondiente
        const postCode = postFile.split('/')[1];

        try {
            const responseJson = await fetch(`${theme}/json/posts.json`);
            if (!responseJson.ok) throw new Error('Error al cargar los datos del tema');

            const postsData = await responseJson.json();
            const postDetails = postsData.posts.find(post => post.blog_code === postCode);

            if (postDetails) {
                document.getElementById('post-title').textContent = postDetails.title;

                const responseMd = await fetch(`${theme}/posts/${postCode}.md`);
                if (!responseMd.ok) throw new Error('Error al cargar el archivo del post');

                const mdContent = await responseMd.text();
                document.getElementById('post-content').innerHTML = marked(mdContent);
            } else {
                document.getElementById('post-title').textContent = 'Post no encontrado';
            }
        } catch (error) {
            document.getElementById('post-title').textContent = 'Error al cargar el post';
        }
    }
});
```

### **Conclusión**
Con esta estructura, tendrás la flexibilidad de manejar múltiples temas de manera similar al blog. Cada tema tendrá su propio listado de artículos y posts individuales. La idea de usar scripts dinámicos te permitirá mantener el código limpio y fácil de mantener. 


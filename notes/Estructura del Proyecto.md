La estructura del proyecto Pontevedra Activa:

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
  /json
    themes.json (Listado de todos los temas principales)
  
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
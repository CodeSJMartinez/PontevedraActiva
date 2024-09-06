#  Estilos Flexbox para agrupar tarjetas

Para agrupar las tarjetas de tres en tres en pantallas de escritorio, dos en pantallas más pequeñas y una sola tarjeta en dispositivos móviles, podemos utilizar **CSS Flexbox** y **media queries** para adaptar el diseño a diferentes tamaños de pantalla. Vamos a hacer los ajustes necesarios en el archivo `styles.css`.

## Paso 1: Estilos Flexbox para agrupar tarjetas

Modificaremos los estilos del contenedor que contiene las tarjetas para que se ajuste a un layout de columnas que varíe según el tamaño de la pantalla.

### Actualización en `styles.css`:

```css
/* Estilos para el contenedor de las tarjetas */
#blog-posts {
    display: flex;
    flex-wrap: wrap; /* Para que las tarjetas se acomoden en líneas si no caben */
    justify-content: space-between;
}

/* Estilos para las tarjetas de post */
.post-card {
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
    width: 100%;
    max-width: 300px; /* Tamaño máximo de la tarjeta */
    flex: 1 1 calc(33.333% - 40px); /* 3 tarjetas por fila para pantallas grandes */
    box-sizing: border-box; /* Incluir padding y borde en el ancho total */
}

/* Media queries para pantallas más pequeñas */
@media (max-width: 1024px) {
    .post-card {
        flex: 1 1 calc(50% - 40px); /* 2 tarjetas por fila para pantallas medianas */
    }
}

@media (max-width: 768px) {
    .post-card {
        flex: 1 1 100%; /* 1 tarjeta por fila para pantallas pequeñas o móviles */
    }
}
```

## Explicación de los estilos:

1. **Flexbox en el contenedor de las tarjetas (`#blog-posts`)**: Usamos `flex-wrap: wrap` para que las tarjetas se ajusten en filas. La propiedad `justify-content: space-between` asegura que haya espacio uniforme entre las tarjetas.

2. **Tarjetas (`.post-card`)**:
    - **Pantallas grandes**: Para pantallas de más de 1024px (escritorio estándar), usamos `flex: 1 1 calc(33.333% - 40px)` para que tres tarjetas quepan por fila. El cálculo asegura que cada tarjeta ocupe un tercio del espacio, restando el margen entre ellas.
    - **Pantallas medianas**: Entre 768px y 1024px (tabletas o pantallas más pequeñas), ajustamos a `flex: 1 1 calc(50% - 40px)` para mostrar dos tarjetas por fila.
    - **Pantallas pequeñas (móviles)**: Para pantallas menores de 768px, las tarjetas ocuparán el 100% del ancho, con `flex: 1 1 100%`, mostrando una sola tarjeta por fila.

## Paso 2: Revisar el HTML y JavaScript

El código HTML y JavaScript no necesita cambios, ya que el ajuste es únicamente de diseño. El contenedor `#blog-posts` y las tarjetas `.post-card` funcionarán automáticamente con los nuevos estilos CSS.

## Resultado esperado:

- **En pantallas grandes (más de 1024px)**: Se mostrarán 3 tarjetas por fila.
- **En pantallas medianas (entre 768px y 1024px)**: Se mostrarán 2 tarjetas por fila.
- **En pantallas pequeñas (menos de 768px)**: Se mostrará una tarjeta por fila.

Esto permitirá una experiencia de usuario responsiva y optimizada para cualquier tipo de dispositivo.

## Conclusión

Con estos cambios, el diseño se adaptará automáticamente a diferentes tamaños de pantalla, proporcionando una mejor visualización en dispositivos de escritorio, tabletas y móviles.
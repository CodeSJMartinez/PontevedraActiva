document.addEventListener('DOMContentLoaded', function() {
    // Ruta del archivo JSON
    const themesJsonPath = 'assets/json/themes.json';

    // Seleccionar el elemento main donde se insertarán las tarjetas
    const mainSection = document.querySelector('main');

    // Crear contenedor para las tarjetas
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    // Cargar el archivo JSON
    fetch(themesJsonPath)
        .then(response => response.json())
        .then(data => {
            data.themes.forEach(theme => {
                // Crear una tarjeta por cada tema
                const card = document.createElement('div');
                card.classList.add('card');

                // Título de la tarjeta
                const cardTitle = document.createElement('h3');
                cardTitle.textContent = theme.name;

                // Añadir el enlace
                const cardLink = document.createElement('a');
                cardLink.href = `theme0${theme.id}.html`;
                cardLink.textContent = 'Acceder';

                // Insertar el título y el enlace en la tarjeta
                card.appendChild(cardTitle);
                card.appendChild(cardLink);

                // Añadir la tarjeta al contenedor
                cardsContainer.appendChild(card);
            });

            // Insertar el contenedor de tarjetas en el main
            mainSection.appendChild(cardsContainer);
        })
        .catch(error => {
            console.error('Error al cargar los temas:', error);
        });
});

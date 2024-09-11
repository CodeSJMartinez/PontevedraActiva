// Actualizar el script de generación de tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const themesJsonPath = 'assets/json/themes.json';
    const mainSection = document.querySelector('main');
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');

    // Cargar el archivo JSON
    fetch(themesJsonPath)
        .then(response => response.json())
        .then(data => {
            data.themes.forEach(theme => {
                const card = document.createElement('div');
                card.classList.add('card');

                const cardTitle = document.createElement('h3');
                cardTitle.textContent = theme.name;

                const cardLink = document.createElement('a');
                // Actualizar los enlaces para que apunten a theme.html
                cardLink.href = `theme.html?theme=${theme.id}`;
                cardLink.textContent = 'Acceder';

                card.appendChild(cardTitle);
                card.appendChild(cardLink);
                cardsContainer.appendChild(card);
            });

            mainSection.appendChild(cardsContainer);
        })
        .catch(error => {
            console.error('Error al cargar los temas:', error);
        });
});

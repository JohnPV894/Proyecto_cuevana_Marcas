$(document).ready(function () {
    let paginaActual = 0;
    const elementosPorPagina = 10;

    if ($('body').is('.vehicles-page')) {
        cargarPeliculas();
    }

    function cargarPeliculas() {
        $.ajax({
            url: 'https://api.tvmaze.com/shows',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                mostrarPeliculas(data, paginaActual, elementosPorPagina);
                paginaActual++;
            },
            error: function (error) {
                console.error('Error al cargar películas:', error);
            }
        });
    }

    function mostrarPeliculas(peliculas, pagina, limite) {
        const listaPeliculas = $('.vehicle_lista');
        const inicio = pagina * limite;
        const fin = inicio + limite;
        const peliculasAMostrar = peliculas.slice(inicio, fin);

        peliculasAMostrar.forEach(pelicula => {
            const tarjetaPelicula = `
                <div class="profile-card">
                    <img src="${pelicula.image ? pelicula.image.medium : 'https://via.placeholder.com/150'}" alt="${pelicula.name}" class="profile-pic">
                    <div class="name">${pelicula.name}</div>
                    <div class="year">${new Date(pelicula.premiered).getFullYear()}</div>
                    <div class="button">
                        <button class="borrar" data-id="${pelicula.id}">Eliminar</button>
                    </div>
                </div>
            `;
            listaPeliculas.append(tarjetaPelicula);
        });

        // Añadir evento de eliminación a los botones
        $('.borrar').click(function () {
            $(this).closest('.profile-card').remove();
        });
    }

    // Evento para cargar más películas
    $('#cargar-mas').click(function () {
        cargarPeliculas();
    });
});

$(() => {
    getMovies("");

    $("#searchForm").on("submit", (e) => {
        e.preventDefault();
        let searchText = $("#searchText").val();
        getMovies(searchText);
    });
});

const getMovies = searchText => {
    $.ajax({
            method: "GET",
            url: `https://moviesapi.ir/api/v1/movies?q=${searchText}`,
            statusCode: {
                404: function () {
                    alert("page not found");
                }
            }
        })
        .done(function (data, status) {
            if (status === "success") {
                let output = $(data.data).map((index, movie) => {
                    return `
                        <div class="top-movie item">
                            <a href="movie.html" onclick="movieSelected('${movie.id}')">
                                <img
                                    src="${movie.poster}"
                                    alt="${movie.title}"
                                    class="item__poster"
                                />
                                <div class="overlay">
                                    <h5>${movie.title}</h5>
                                </div>
                            </a>
                        </div>
                    `;
                }).get().join("");

                $("#topTenMovies").html(output);
            }
        })
        .fail(function () {
            alert("error");
        })
        .always(function () {
            // alert("complete");
        });
}


const movieSelected = (id) => {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}


const getMovie = () => {
    let movieId = sessionStorage.getItem('movieId');

    $.ajax({
            method: "GET",
            url: `https://moviesapi.ir/api/v1/movies/${movieId}`,
            statusCode: {
                404: function () {
                    alert("page not found");
                }
            }
        })
        .done(function (data, status) {
            if (status === "success") {
                let output = $(data).map((index, movie) => {
                    return `
                                <div class="movie-header">
                                    <img
                                        src="${movie.poster}"
                                        class="movie-header__poster"
                                        alt="${movie.title}"
                                    />
                                </div>
                                <div class="movie-info">
                                    <h1>
                                        <span>
                                            ${movie.id}:
                                        </span>
                                        ${movie.title}
                                    </h1>
                                    <p>${movie.plot}</p>
                                </div>
                            `;
                }).get().join("");

                $("#selectedMovie").html(output);
                $(".movie-header").slideDown("slow");
            }
        })
        .fail(function () {
            alert("error");
        })
        .always(function () {
            // alert("complete");
        });

}
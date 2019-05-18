
//movie array
var movies = ["Lion King", "Tangled", "Snow White"];

//adding movie array buttons
function renderButtons() {
    $("#buttonsHere").empty();
    for (i=0; i < movies.length; i++) {
        $("#buttonsHere").append("<button class='btn btn-outline-info' data-movie='" + movies[i] + "'>" + movies[i] + "</button>" + " ");
    }
}

renderButtons();

// Adding buttons for user inputs
$("#enterMovie").on("click", function() {
    event.preventDefault();
    //taking the value from the input form
    var movie = $("#newMovie").val();
    //pushing the new value into the movie array
    movies.push(movie);
    renderButtons();
    return;
});

$("button").on("click", function () {
    //storing the data-movie property from the button
    var movie = $(this).attr("data-movie");

    // Constructing a queryURL using the movie name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      movie + "&api_key=3PGmQNb5XE77hqOkwG8cJYoXHY1bITbv&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

      // After data comes back from the request
      .then(function (response) {

        var results = response.data;
        $("#movies").empty();
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          var disneyDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var disneyPics = $("<img>");

          // Setting the src attribute of the image to a property pulled off the result item
          disneyPics.attr("src", results[i].images.fixed_height.url);
          disneyPics.attr("class", "gif");

          // Appending the paragraph and image tag to the disneyDiv
          disneyDiv.append(p);
          disneyDiv.append(disneyPics);

          // Prependng the disneyDiv to the HTML page in the "#gifsHere" div
          $("#gifsHere").prepend(disneyDiv);
        }
  })    
  });

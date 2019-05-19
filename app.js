
//movie array
var movies = ["Lion King", "Tangled", "Cinderella"];

var results;

//adding movie array buttons
function renderButtons() {
    $("#buttonsHere").empty();
    for (i=0; i < movies.length; i++) {
        $("#buttonsHere").append("<button class='btn btn-outline-light' data-movie='" + movies[i] + "'>" + movies[i] + "</button>" + " ");
    }
    activateButton();


  }

renderButtons();

// Adding buttons for user inputs
$("#enterMovie").on("click", function() {
    event.preventDefault();
    //taking the value from the input form
    var movieInput = $("#newMovie").val();
    //pushing the new value into the movie array
    movies.push(movieInput);
    renderButtons();
    return;
});

function activateButton() {
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

        results = response.data;
        $("#movies").empty();
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          var disneyDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var disneyPics = $("<img>");

          // Setting the attributes of the images to be still until clicked
          disneyPics.attr("src", results[i].images.fixed_height_still.url);
          disneyPics.attr("class", "gif");
          disneyPics.attr("random", i);
          
          


          // Appending the rating and image to the disneyDiv
          disneyDiv.append(p);
          disneyDiv.append(disneyPics);

          // Prependng the disneyDiv to the HTML page in the "#gifsHere" div
          $("#gifsHere").prepend(disneyDiv);
        }

        $(document).on("click", ".gif", function(event) {
          event.preventDefault();
          var i = $(this).attr("random");
          //disneyPics.removeAttr("src", results[i].images.fixed_height_still.url);
          $(this).attr("src", results[i].images.fixed_height.url);
          


        });
  }) 

  });
}

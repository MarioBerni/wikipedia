let input = document.getElementById("search");

input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("search-button").click();
  }
});

document.getElementById('search-button').addEventListener('click', function() {
  let search = document.getElementById('search').value;
  getSearchResults(search);
});

document.getElementById('random-button').addEventListener('click', function() {
  window.open('https://en.wikipedia.org/wiki/Special:Random');
});

function getSearchResults(search) {
  let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + encodeURI(search) + "&origin=*";

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error("Error al obtener los datos de la API de Wikipedia");
      }
      return response.json();
    })
    .then(data => {
      let output = '';
      for (let i = 0; i < data[1].length; i++) {
        output += '<div class="entry">';
        output += '<h2><a href="' + data[3][i] + '" target="_blank">' + data[1][i] + '</a></h2>';
        output += '<p>' + data[2][i] + '</p>';
        output += '</div>';
      }
      document.getElementById('results').innerHTML = output;
    })
    .catch(error => {
      console.log(error);
      document.getElementById('results').innerHTML = '<p>Error al obtener los datos de la API de Wikipedia</p>';
    });
}

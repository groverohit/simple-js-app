var pokemonRepository = (function(){

  //an array containing pokemon obects with name, height and types
  var pokemonList = [];

  //function to log selected pokemon details from the url
  function showDetails(pokemon){
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  //function addListItem to add pokemons as list
  function addListItem(pokemon){
    var list = document.querySelector('.pokemon-list');
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    list.appendChild(listItem);

    //event listener for button clicks
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  //function to add pokemons to array
  function add(pokemon){
    pokemonList.push(pokemon);
  }

  //function to return pokemons list
  function getAll(){
    return pokemonList;
  }

  //function to load list of pokemons from the url with name and url
  function loadList() {
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    });
  }

  //function to get pokemon details
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl).then(function(response) {
      return response.json();
    }).then(function(details) {
      pokemon.imageUrl = details.sprites.front_default;
      pokemon.height = details.height;
    }).catch(function(e) {
      console.error(e);
    });
  }


  //make functions accessible from outside the object
  return{
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  }

})();

//call loadList function
pokemonRepository.loadList().then(function(){
  //add each pokemon as list item
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

var pokemonRepository = (function(){

  //an array containing pokemon obects with name, height and types
  var pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  { name: 'Venusaur', height: 2, types: ['grass', 'poison']},
  { name: 'Charmander', height: 0.6, types: ['fire']}
  ]

  //function to log selected pokemon name
  function showDetails(pokemon){
    console.log(pokemon.name);
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

  //make functions accessible from outside the object
  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  }

})();

//add each pokemon as list item
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

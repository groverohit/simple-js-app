var pokemonRepository = (function(){

  //an array containing pokemon obects with name, height and types
  var pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  { name: 'Venusaur', height: 2, types: ['grass', 'poison']},
  { name: 'Charmander', height: 0.6, types: ['fire']}
  ]

  //function to add pokemons to array
  function add(pokemon){
    pokemonList.push(pokemon);
  }

  //fgunction to return pokemons list
  function getAll(){
    return pokemonList;
  }

  return{
    add: add,
    getAll: getAll
  }

})();

//iterate over pokemons in the list using forEach
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('"' + (pokemon.name) + ' (height:' + pokemon.height + 'm)"');
  pokemon.height > 1? document.write(' - Wow, that’s big<br>'): document.write('<br>');
});

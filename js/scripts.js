var pokemonList = [];

pokemonList = [
  { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  { name: 'Ivysaur', height: 1, types: ['grass', 'poison']},
  { name: 'Venusaur', height: 2, types: ['grass', 'poison']},
  { name: 'Charmander', height: 0.6, types: ['fire']}
  ]

for (var i = 0; i < 4; i++) {
  document.write('"' + (pokemonList[i].name) + ' (height:' + pokemonList[i].height + 'm)"');
  pokemonList[i].height > 1? document.write(' - Wow, that’s big<br>'): document.write('<br>');
}

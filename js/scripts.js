var pokemonRepository = (function(){

  //an array containing pokemon obects with name, height and types
  var pokemonList = [];

  //the modal container
  var modalContainer = document.querySelector('#modal-container');

  //function to show the modal
  function showModal(title, text, url){
    var modal = document.querySelector('.modal');
    var closeButton = document.querySelector('.modal-close');

    //show pokemon name, height and image in modal
    document.querySelector('.modal-title').innerHTML = title;
    document.querySelector('.modal-text').innerHTML = "Height = " + text;
    document.querySelector('.modal-image').innerHTML = '<img src="' + url + '"/>';

    modalContainer.classList.add('is-visible');

    //event listener to hide modal on button click
    closeButton.addEventListener('click', hideModal);
  }

  //function to hide the modal
  function hideModal(){
    var modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  //function to log selected pokemon details from the url
  function showDetails(pokemon){
    loadDetails(pokemon).then(function() {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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

  //addEventListener for "Escape" key on the modal
  window.addEventListener('keydown', (e) => {
    var modalContainer = document.querySelector('#modal-container');
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  //function to close the modal if user clicks on overlay
  modalContainer.addEventListener('click', (e) => {
  var target = e.target;
  if (target === modalContainer) {
    hideModal();
    }
  });


  //make functions accessible from outside the object
  return{
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  }

})();

//call loadList function
pokemonRepository.loadList().then(function(){
  //add each pokemon as list item
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });
});

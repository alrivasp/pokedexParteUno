$(function(){
    //Animaciones
    setTimeout(() => {
       $('.loader').fadeOut('slow');
       $('.contenido').fadeIn('slow')
       $(".navbarPokemon").animate({width: '100%'},"slow");
    }, 1000);
    setTimeout(() => {
        $(".content-principal").fadeIn('slow');
        $(".spinner").show('slow');
    }, 1000);
    setTimeout(() => {
        $(".spinner").hide('fast');
    }, 1000);
    setTimeout(() => {
        $(".pokemon-card").show('slow');
    }, 1000);
    setTimeout(() => {
        $("#more-pokemon").show('slow');
    }, 1000);

    //Eventos
    $("#more-pokemon").click(()=>{
        var url = $('#more-pokemon').attr('data-nexturl');
        getPokemones(url)
    });

    $('.pokemon-card').click((event)=>{
        if (event.target.dataset.pokemon) {
            var pokemon_name = event.target.dataset.pokemon
            $('#pokemonModalLabel').html(pokemon_name.toUpperCase())
            getDataPokemon(pokemon_name, urlBase);
        }
    });

    //btn-modal-pokemon

    //Consumo de Api
    //Captura de url de api
    var urlBase = 'https://pokeapi.co/api/v2/pokemon/'
    //Pasar url a funcion pokemon
    getPokemones(urlBase);

    //funcion Pokemon
    function getPokemones(url){
        //Llamada ajax
        $.ajax(url)
            //respuesta
            .done((data) => {
                    addPokemon(data);
                    $('#more-pokemon').attr('data-nexturl', data.next)
            });
    };

    //funcion que crea tarjeta
    function addPokemon(data) {
        var pokemones = data.results;
        for (let i = 0; i < pokemones.length; i++) {
            $.ajax(pokemones[i].url)
                .done((data) => {
                    createCard(data);
                });
        };
    };

    function createCard(data) {
        var col = $(document.createElement('div')).attr('class','col')
        var card = '<div class="card shadow p-3 mb-5 rounded" style="width: 15rem;">'+
                        '<span class="circulo"></span>'+
                        '<img src="'+ data.sprites.other.dream_world.front_default +'" class="card-img-top text-center bg-card-img p-2" alt="'+ data.name +'">'+
                        '<div class="card-body text-center">'+
                            '<h5 class="card-title">'+ data.name.toUpperCase() +'</h5>'+
                            '<a href="#" class="btn-modal-pokemon btn btn-success rounded-pill btn-card shadow p-3" data-pokemon="'+ data.name +'" data-toggle="modal" data-target="#pokemonModal" >¡Quiero saber más de este pokémon!</a>'+
                        '</div>'+
                    '</div>'

        col.append(card);
        $('.rowPokemon').append(col);
    }

    function getDataPokemon(name, url) {
        //limpiar modal
        $('.img-modal').attr('src', "");
        $(".pokemon-types").html("");
        $(".pokemon-abilities").html("");
        $(".pokemon-move").html("");
        //consumo de api 
        $.ajax(url+name)
            .done((data) => {
                    //agregar foto
                    $('.img-modal').attr('src', data.sprites.other.dream_world.front_default);
                    //agregar habilidades
                    data.abilities.forEach(element => {
                        var habilidad = $(document.createElement('li')).html(element.ability.name)
                        $('.pokemon-abilities').append(habilidad)
                    });
                    //agregar tipos
                    data.types.forEach(element => {
                        var tipos = $(document.createElement('li')).html(element.type.name)
                        $('.pokemon-types').append(tipos)
                    });
                    //agregar movimiento
                    var aux= 0;
                    data.moves.forEach(element => {
                        aux += 1
                        if (aux < 6) {
                            var movimiento = $(document.createElement('li')).html(element.move.name)
                            $('.pokemon-move').append(movimiento)
                        }
                    });
            });
    }

});

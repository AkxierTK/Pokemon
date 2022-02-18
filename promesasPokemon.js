let tipos = new Array();

tipos["normal"] = "grey";
tipos["fighting"] = "orange";
tipos["flying"] = "aquamarine";
tipos["poison"] = "darkmagenta";
tipos["ghost"] = "mediumslateblue";
tipos["rock"] = "darkgoldenrod";
tipos["ground"] = "chocolate";
tipos["bug"] = "greenyellow";
tipos["steel"] = "slategrey";
tipos["fire"] = "red";
tipos["water"] = "cornflowerblue";
tipos["grass"] = "green";
tipos["electric"] = "gold";
tipos["psychic"] = "pink";
tipos["ice"] = "turquoise";
tipos["dragon"] = "deepskyblue";
tipos["dark"] = "dimgray";
tipos["fairy"] = "orchid";
tipos["unknown"] = "black";
tipos["shadow"] = "black";

fetch("https://pokeapi.co/api/v2/type/")
    .then(respuesta => respuesta.json())
    .then(lista => lista.results.forEach(element => {
        let div = document.createElement("div");
        div.className = "tipo_Div col-4";
        div.style.backgroundColor = tipos[element.name];
        if (element.name == "unknown" || element.name == "shadow") {
            div.style.display = "none";
        }
        div.id = element.name;
        let p = document.createElement("p");
        p.className = "tipo"
        p.innerText = element.name;
        div.appendChild(p);
        lista = document.getElementById("lista");
        div.addEventListener("click", function (e) {
            let color = this.style.backgroundColor;
            if (document.getElementById("pokemons")) {
                document.body.removeChild(document.getElementById("pokemons"));
            }
            let divPokemon = document.createElement("div");
            divPokemon.id = "pokemons";
            divPokemon.className = "lista row";
            h2 = document.createElement("h2");
            h2.innerText = element.name + " type Pokemons";
            h2.id = "titulo";
            h2.style.marginTop = "1em";
            divPokemon.appendChild(h2);
            fetch(element.url)
                .then(respuesta => respuesta.json())
                .then(lista => lista.pokemon.forEach(pokemon => {
                    if (pokemon.pokemon.name.indexOf("-") == -1) {
                        let div = document.createElement("div");
                        let p = document.createElement("p");
                        let img = document.createElement("img");
                        let numero = pokemon.pokemon.url.substring(34, 38);
                        if (numero.slice(-1) == "/") {
                            numero = numero.substring(0, numero.length - 1);
                        }
                        if (numero.length == 1) {
                            numero = "00" + numero;
                        }
                        if (numero.length == 2) {
                            numero = "0" + numero;
                        }
                        img.src = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + numero + ".png";
                        div.className = "pokemon_Div col-4";
                        p.innerText = pokemon.pokemon.name;
                        p.style.fontSize = "20px";
                        p.className = "nombre";
                        div.appendChild(p);
                        div.appendChild(img);
                        div.style.backgroundColor = color;
                        div.addEventListener("click", function (e) {


                            fetch(pokemon.pokemon.url)
                                .then(respuesta => respuesta.json())
                                .then(datos => {
                                    let model = document.createElement("div");
                                    model.className = "modal";
                                    model.id = "modal";
                                    let infoPokemon = document.createElement("div");
                                    infoPokemon.className = "infoPokemon";
                                    infoPokemon.style.backgroundColor = color;
                                    let p1 = document.createElement("p");
                                    p1.innerText = pokemon.pokemon.name;
                                    p1.className = "nombreInfo";

                                    let p2 = document.createElement("p");
                                    p2.innerText = "Type: " + datos.types[0].type.name;
                                    if(datos.types[1]){
                                        p2.innerText="Types "+ datos.types[0].type.name+" "+datos.types[1].type.name;
                                    }
                                    let img = document.createElement("img");
                                    let span = document.createElement("span");
                                    span.innerText = "X";
                                    span.className = "close";
                                    img.src="https://play.pokemonshowdown.com/sprites/ani/"+pokemon.pokemon.name+".gif"
                                    img.className="imgInfo";
                                    infoPokemon.appendChild(p1);
                                    infoPokemon.appendChild(span);
                                    span.onclick = function () {
                                        document.body.removeChild(document.getElementById("modal"));
                                    }
                                    let divInfo=document.createElement("div");
                                    divInfo.appendChild(p2)
                                    divInfo.className="divInfo"
                                    infoPokemon.appendChild(img);
                                    infoPokemon.appendChild(divInfo);
                                    window.onclick = function (event) {
                                        if (event.target == model) {
                                            document.body.removeChild(document.getElementById("modal"));
                                        }
                                    }
                                    model.appendChild(infoPokemon);
                                    document.body.appendChild(model);
                                    model.style.display = "block";
                                });
                        });
                        divPokemon.appendChild(div);
                    }
                })).catch(error => console.log(error))
            document.body.appendChild(divPokemon);
        })
        lista.appendChild(div);
    })).catch(error => console.log(error));


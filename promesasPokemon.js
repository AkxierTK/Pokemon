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

let imgType= new Array();

imgType["normal"] = "https://img.game8.co/3470555/27ddf735e2a6125669444acd30dbe64f.png/show";
imgType["fighting"] = "https://img.game8.co/3470548/679b57558c19b04918183d6daabca6f6.png/show";
imgType["flying"] = "https://img.game8.co/3470562/3c2f7201b82c60d49244f621f76826e9.png/show";
imgType["poison"] = "https://img.game8.co/3470558/e03a43fa9776f949169452c65d5640c8.png/show";
imgType["ghost"] = "https://img.game8.co/3470559/9ebf1fcc692acb79911374dc24402f53.png/show";
imgType["rock"] = "https://img.game8.co/3470554/68ab2abb1383e88344172234a5f50119.png/show";
imgType["ground"] = "https://img.game8.co/3470556/0a06c0c6add7e94ec3144730fffd80b7.png/show";
imgType["bug"] = "https://img.game8.co/3470546/ea8af98a562afd8bbc74a05a0bd37520.png/show";
imgType["steel"] = "https://img.game8.co/3470561/0554dcd57eaab3defba062253036b206.png/show";
imgType["fire"] = "https://img.game8.co/3470557/1de39db27729d301e91da0cb66af57e6.png/show";
imgType["water"] = "https://img.game8.co/3470560/123915a87d4bdaced6b243c7449b4ebb.png/show";
imgType["grass"] = "https://img.game8.co/3470553/664646ba05d54413da290e43bfab7bdd.png/show";
imgType["electric"] = "https://img.game8.co/3470547/ef64a80d14434c23f1786ba506252ecb.png/show";
imgType["psychic"] = "https://img.game8.co/3470563/b837d9aa7775eb749a7ee84638fe8e86.png/show";
imgType["ice"] = "https://img.game8.co/3470552/c643cab2cd9f388f03b929ba04283a30.png/show";
imgType["dragon"] = "https://img.game8.co/3470550/d4433cc46b60672113a88ae1b30e1000.png/show";
imgType["dark"] = "https://img.game8.co/3470549/eb691bafeba863e995ab2315355e7f36.png/show";
imgType["fairy"] = "https://img.game8.co/3470551/fd084f592835e0c379214e58351f8e99.png/show";

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
                                    let divInfo=document.createElement("div");
                                    let pokeball=document.createElement("img");
                                    pokeball.src="https://www.kindpng.com/picc/m/290-2906150_pokeball-pixel-art-png-transparent-png.png";
                                    pokeball.className="pokeball";
                                    let number=document.createElement("p");
                                    number.className="id";
                                    number.innerText="Pokedex: "+datos.id;
                                    divInfo.appendChild(pokeball);
                                    divInfo.appendChild(number);
                                    if(datos.types[1]){
                                        let p2 = document.createElement("p");
                                        p2.innerText="Types";
                                        p2.className="tipT";
                                        let imgType1=document.createElement("img");
                                        imgType1.src=imgType[datos.types[0].type.name];
                                        let imgType2=document.createElement("img");
                                        imgType1.className="tipos";
                                        imgType2.className="tipos";
                                        imgType2.src=imgType[datos.types[1].type.name];
                                        divInfo.appendChild(p2);
                                        divInfo.appendChild(imgType1);
                                        divInfo.appendChild(imgType2);
                                    }else{
                                        let p2 = document.createElement("p");
                                        p2.innerText="Type";
                                        p2.className="tipT";
                                        let imgType1=document.createElement("img");
                                        imgType1.src=imgType[datos.types[0].type.name];
                                        imgType1.className="tipos";
                                        divInfo.appendChild(p2);
                                        divInfo.appendChild(imgType1);
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


class FormularioView {
    constructor(ancestro) {
        this.marco = document.createElement("div");
        this.nombreInput = document.createElement("input");
        this.apellidoInput = document.createElement("input");
        this.edadInput = document.createElement("input");
        this.enviarButton = document.createElement("button");
        this.enviarButton.innerHTML = "ENVIAR";
        this.marco.append(this.nombreInput);
        this.marco.append(this.apellidoInput);
        this.marco.append(this.edadInput);
        this.marco.append(this.enviarButton);
        ancestro.append(this.marco);
    }
    crearImagen(src) {
        this.imagen = document.createElement("img");
        this.imagen.src = src;
        this.marco.append(this.imagen);
    }
    llenarFormulario(nombre, apellido, edad) {
        this.nombreInput.value = nombre;
        this.edadInput.value = edad;
        this.apellidoInput.value = apellido;
    }
    desaparecerFormulario() {
        this.nombreInput.style.border = "red solid 2px";
        this.nombreInput.style.display = "none";
        this.apellidoInput.style.display = "none";
        this.edadInput.style.display = "none";
    }
}

class FormularioModel {
    constructor() {
        this.href = '';
        this.image = '';
        this.title = '';
        this.ingrediente = '';
    }
    prepareAJAX() {
        this.URL = "http://www.recipepuppy.com/api/?i=potato";
        this.xhr = new XMLHttpRequest();
        this.xhr.open("GET", this.URL, true);
        this.xhr.send();
    }
    mostrarData() {
        return JSON.parse(this.xhr.responseText);
    }
    isSuccessfullAJAX() {
        return  (this.xhr.readyState === 4 && this.xhr.status === 200);
    }

    fillOBJ(href, image, title, ingrediente) {

    }

}


class FormularioController {
    constructor() {
        this.formularioModel = new FormularioModel();
        this.formularioView = new FormularioView(document.body);
        this.formularioModel.prepareAJAX();
        this.saludar = this.saludar.bind(this);
        this.mostrarImagenes = this.mostrarImagenes.bind(this);
        this.formularioView.enviarButton.addEventListener("click", this.saludar);
        this.formularioModel.xhr.addEventListener("readystatechange", this.mostrarImagenes);
    }
    saludar() {
        this.formularioView.desaparecerFormulario();
    }
    mostrarImagenes() {
        if (this.formularioModel.isSuccessfullAJAX()) {
            const x = this.formularioModel.mostrarData();
            x.results.map((e) => {
                this.formularioView.crearImagen(e.thumbnail);
                this.formularioView.llenarFormulario(e.ingredients, e.title, e.href);
            });
        }

    }
}

let x = new FormularioController();
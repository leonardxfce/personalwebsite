class Indice {
    constructor() {
        this.container = null;
        this.$contenedor = null;
        this.pegarEnBody = this.pegarEnBody.bind(this);
        this.cargarArticulo = this.cargarArticulo.bind(this);
        this.bindEventos = this.bindEventos.bind(this);
        this.volverAlIndice = this.volverAlIndice.bind(this);
    }
    pegarEnBody(data) {
        const md = window.markdownit();
        const result = md.render(data);
        this.$contenedor.html(result);
    }
    cargarArticulo(e) {
        const url = $(e.currentTarget).data("url");
        const config = {
            url: `articles/${url}`,
        };
        $.ajax(config).done(this.pegarEnBody);
    }
    bindEventos() {
        $('li').on('click', this.cargarArticulo);
        $("button").on("click", this.volverAlIndice);
        this.$contenedor = $(".container");
        this.container = this.$contenedor.html();
    }
    volverAlIndice() {
        this.$contenedor.html(this.container);
    }
}

const indice = new Indice();
window.onload = indice.bindEventos;
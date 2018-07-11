class Indice {
    constructor() {
        this.container = null;
        this.$contenedor = null;
        this.pegarEnBody = this.pegarEnBody.bind(this);
        this.cargarArticulo = this.cargarArticulo.bind(this);
        this.bindEventos = this.bindEventos.bind(this);
        this.volverAlIndice = this.volverAlIndice.bind(this);
        this.route = this.route.bind(this);
    }
    pegarEnBody(data) {
        const md = window.markdownit();
        const result = md.render(data);
        this.$contenedor.html(result);
        $("#contenido img").addClass("img-fluid");
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
    }
    cargarArticulo(e) {
        const url = $(e.currentTarget).data("url");
        if (url === undefined) {
            return;
        }
        const config = {
            url: `articles/${url}`,
        };
        $.ajax(config).done(this.pegarEnBody);
        const nombre = url.slice(0,url.length - 3);
        //this.route(nombre);
    }
    route(ruta){
        history.pushState({}, ruta , ruta + ".html");
    }
    bindEventos() {
        $('#contenido').on('click','li',this.cargarArticulo);
        $("button").on("click", this.volverAlIndice);
        this.$contenedor = $("#contenido");
        this.container = this.$contenedor.html();
        $("li:nth-child(2)").trigger("click");
    }
    volverAlIndice() {
        this.$contenedor.html(this.container);
        this.route("index");
    }
}

const indice = new Indice();
window.onload = indice.bindEventos;
const pegarEnBody = data => {
    var md = window.markdownit();
    var result = md.render(data);
    $('.container').html(result);
};

window.onload = function () {
    const config = {
        url: "articles/clase2.md"
    };
    $.ajax(config).done(pegarEnBody);
}
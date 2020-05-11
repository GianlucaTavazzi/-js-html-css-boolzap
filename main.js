$('.type-messages input').click(function () {
    $('.fa-paper-plane').show();
    $('.fa-microphone').hide();
})

//quando clicco sull'icona il messaggio che io ho scritto nell'imput viene visualizzato nella pagina come un nuovo elemento
$('.type-messages .fas:nth-child(4)').click(function () {
    messaggi()
})

$(document).keypress(function(e) {
    if(e.which == 13) {
        messaggi()
    }
});

function messaggi() {
    if ($('.type-messages input').val()) {
        var testo_messaggio = $('.type-messages input').val();

        //inserisco il testo in nun nuovo div
        $('.chat').append('<div class="mymessage"><p>' + testo_messaggio + '</p></div>');

        var clock = setInterval(rispostamessaggio, 1000);

        function rispostamessaggio() {
            $('.chat').append('<div class="reply"><p>ok</p></div>');
            clearInterval(clock);
        }

        var nuovo_messaggio = ('.type-messages input').val('')
    }
}

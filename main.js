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

        $('.type-messages input').val('');
    }
}

// $('.search i').click(function () {
//     var search_value = $('.search input').val();
//
//     $('.list-contacts p').each(function(){
//         var search_contact = $(this).text();
//     });
//
//     var ciao = $('.list-contacts p').find(search_value);
//
//
// })

//quando clicco devo vedere se nell'imput sono presenti dei nomi presenti anche nella lista delle chat
// $('.search i').click(function () {
//     var search_value = $('.search input').val();
//     console.log(search_value);
//     // var michele = $('.list-contacts .contacts p:first-of-type').text();
//     // console.log(michele);
//     // if (search_value == michele) {
//     //     $('.list-contacts .selected').removeClass('selected')
//     //     console.log('ciao');
//     // }
//     $('.list-contacts .contacts p:first-of-type').each(function(){
//         var nome = $(this).text()
//         if (search_value == nome) {
//             $('.contacts').hide();
//             $('').show();
//         }
//     });
// })

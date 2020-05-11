//selezione il nome presente nella prima chat
var account_chatlist = $('.list-contacts .selected p:first-of-type').text();

console.log(account_chatlist);

var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes()
console.log(hours);

//inserisco il nome all'inteno della parte destra dell'header
$('.chat-c-left span').append('<p>' + account_chatlist + '</p><p>Ultimo accesso oggi alle ' + hours +':' + minutes +'</p>');

//faccio in modo che il nome cambi a seconda della chat su cui clicco
$('.list-contacts .contacts').click(function () {
    $('.selected').removeClass('selected');

    $(this).addClass('selected');var account_chatlist = $('.list-contacts .selected p:first-of-type').text();
    console.log(account_chatlist);

    $('.chat-c-left span').empty();

    $('.chat-c-left span').append('<p>' + account_chatlist + '</p><p>Ultimo accesso oggi alle ' + hours +':' + minutes +'</p>');

    //rimuovo la classe current per poi darlo a quello che voglio io
    $('.current').removeClass('current')

    var position = $(this).index();
    var current_chat = $('.chat').eq(position);
    $(current_chat).addClass('current')
})

//cambio l'icona quando clicco sull'input per scrivere messaggi
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
        $('.current').append('<div class="mymessage"><p>' + testo_messaggio + '</p></div>');

        var clock = setInterval(rispostamessaggio, 1000);

        function rispostamessaggio() {
            $('.current').append('<div class="reply"><p>ok</p></div>');
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

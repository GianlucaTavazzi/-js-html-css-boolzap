//ricerca all'interno della lista dei contatti
$('.left input').keyup(function(){
    var search_value = $('.search input').val().trim().toLowerCase();
    console.log(search_value);

    $('.list-contacts .contacts p:first-of-type').each(function(){
        var search_contact = $(this).text().toLowerCase();
        console.log(search_contact);
        if (search_contact.includes(search_value)) {
            $(this).closest('.contacts').show()
        } else {
            $(this).closest('.contacts').hide()
        }
    });
})


//selezione il nome presente nella prima chat
var account_chatlist = $('.list-contacts .selected p:first-of-type').text();

console.log(account_chatlist);

var data = new Date();
var hours = data.getHours();
var minutes = data.getMinutes()
console.log(hours);

//inserisco il nome all'interno della parte destra dell'header
$('.chat-c-left span').append('<p>' + account_chatlist + '</p><p>Ultimo accesso oggi alle ' + hours +':' + minutes +'</p>');

//faccio in modo che il nome cambi a seconda della chat su cui clicco
$('.list-contacts .contacts').click(function () {
    $('.selected').removeClass('selected');

    $(this).addClass('selected');
    var account_chatlist = $('.list-contacts .selected p:first-of-type').text();
    console.log(account_chatlist);

    $('.chat-c-left span').empty();

    $('.chat-c-left span').append('<p>' + account_chatlist + '</p><p>Ultimo accesso oggi alle ' + hours +':' + minutes +'</p>');

    //rimuovo la classe current per poi darlo a quello che voglio io
    $('.current').removeClass('current')

    var position = $(this).index();
    var current_chat = $('.chat').eq(position);
    $(current_chat).addClass('current')
})


//click sul triangolino per far apparire il dropdown
$('.chat').on("click", '.mymessage .fas', function () {
    $(this).next('.mydropdown').toggle()
})

$('.chat').on("click", '.reply .fas', function(){
    $(this).next('.dropdown').toggle()
})



//cambio l'icona quando clicco sull'input per scrivere messaggi
// $('.type-messages input').click(function () {
//     $('.fa-paper-plane').show();
//     $('.fa-microphone').hide();
// })
$('.type-messages input').keyup(function() {
    if ($('.type-messages input').val()) {
        $('.fa-paper-plane').show();
        $('.fa-microphone').hide();
    } else if ($('.type-messages input').val('')) {
        $('.fa-paper-plane').hide();
        $('.fa-microphone').show();
    }
})

//quando clicco sull'icona il messaggio che io ho scritto nell'imput viene visualizzato nella pagina come un nuovo elemento
$('.type-messages .fas:nth-child(4)').click(function () {
    messaggi()
})

$('.right input').keypress(function(e) {
    if(e.which == 13) {
        messaggi()
    }
});


//quando clicco sull'opzione 'cancella' scrivo un messaggio che dice che il messaggio è stato cancellato
$('.chat').on("click", '.mymessage .mydropdown li:nth-child(2)', function(){
    $('.messaggio').text('Questo messaggio è stato cancellato');
    $('.mydropdown').hide();
})

$('.chat').on("click", '.reply .dropdown li:nth-child(2)', function(){
    $('.risposta').text('Questo messaggio è stato cancellato');
    $('.dropdown').hide();
})


//creo la funzione per l'invio dei messaggi
function messaggi() {
    if ($('.type-messages input').val()) {
        var testo_messaggio = $('.type-messages input').val().trim();

        //inserisco il testo in nun nuovo div
        $('.current').append('<div class="mymessage"><span class="messaggio">' + testo_messaggio + '</span><span>' + hours +':' + minutes + '</span><i class="fas fa-angle-down"></i><ul class="mydropdown"><li>Message info</li><li>Delete Message</li></ul></div>');

        var clock = setInterval(rispostamessaggio, 1000);

        function rispostamessaggio() {
            $('.current').append('<div class="reply"><span class="risposta">ok</span><span>' + hours +':' + minutes + '</span><i class="fas fa-angle-down"></i><ul class="dropdown"><li>Message info</li><li>Delete Message</li></ul></div>');
            clearInterval(clock);
        }

        $('.type-messages input').val('');

        if ($('.type-messages input').val('')) {
            $('.fa-paper-plane').hide();
            $('.fa-microphone').show();
        }
    }
}

//setto il messaggio della chat
aggiornamento_messaggi();

//ricerca all'interno della lista dei contatti
$('.left input').keyup(function(){
    var search_value = $('.search input').val().trim().toLowerCase();
    console.log(search_value);
    if ($('.search input').val()) {
        $('.list-contacts .contacts p:first-of-type').each(function(){
            var search_contact = $(this).html().toLowerCase();
            console.log(search_contact);
            if (search_contact.includes(search_value)) {
                $(this).closest('.contacts').show()
            } else {
                $(this).closest('.contacts').hide()
            }
        });
    } else {
        $('.list-contacts .contacts p:first-of-type').closest('.contacts').show();
    }
})

//selezione il nome presente nella prima chat
var account_chatlist = $('.list-contacts .selected p:first-of-type').text();

function date() {
    var data = new Date();
    var hours = data.getHours();
    var minutes = data.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var orario = hours + ':' + minutes;
    return orario
}

//inserisco il nome all'interno della parte destra dell'header
$('.chat-c-left span').append('<p>' + account_chatlist + '</p><p>Ultimo accesso oggi alle ' + date() +'</p>');

//faccio in modo che il nome cambi a seconda della chat su cui clicco
$('.left').on("click", '.list-contacts .contacts', function () {
    $('.selected').removeClass('selected');

    $(this).addClass('selected');
    var account_chatlist = $('.list-contacts .selected p:first-of-type').text();
    console.log(account_chatlist);

    $('.chat-c-left span').empty();

    $('.chat-c-left span').append('<p>' + account_chatlist + '</p><p>Ultimo accesso oggi alle ' + date() +'</p>');

    //rimuovo la classe current per poi darlo a quello che voglio io
    $('.current').removeClass('current')

    // var position = $(this).index();
    // var current_chat = $('.chat').eq(position);
    // $(current_chat).addClass('current');
    var account_data = $('.selected').data('nome');
    var current_chat = $('.chat[data-nome="' + account_data +'"]');
    $(current_chat).addClass('current');
})


//click sul triangolino per far apparire il dropdown
$('.chat').on("click", '.mymessage .fas', function () {
    $(this).next('.mydropdown').toggle()
})

$('.chat').on("mouseleave", '.mymessage', function () {
    $('.mymessage .fas').next('.mydropdown').hide()
})

$('.chat').on("click", '.reply .fas', function(){
    $(this).next('.dropdown').toggle()
})

$('.chat').on("mouseleave", '.reply', function () {
    $('.reply .fas').next('.dropdown').hide()
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

//quando clicco sull'icona il messaggio che io ho scritto nell'input viene visualizzato nella pagina come un nuovo elemento
$('.type-messages .fas:nth-child(4)').click(function () {
    messaggi();
    // aggiornamento_messaggi();
    move_chat();
})

$('.right input').keypress(function(e) {
    if(e.which == 13) {
        messaggi();
        move_chat();
        // aggiornamento_messaggi();
    }
});

//quando clicco sull'opzione 'cancella' scrivo un messaggio che dice che il messaggio è stato cancellato
$('.chat').on("click", '.mymessage .mydropdown li:nth-child(2)', function(){
    $(this).parent().siblings('.messaggio').text('Questo messaggio è stato cancellato');
    $('.mydropdown').hide();
    $('.mymessage .fas').remove();
})

$('.chat').on("click", '.reply .dropdown li:nth-child(2)', function(){
    $(this).parent().siblings('.risposta').text('Questo messaggio è stato cancellato');
    $('.dropdown').hide();
})


//creo la funzione per l'invio dei messaggi
function messaggi() {
    if ($('.type-messages input').val()) {
        var testo_messaggio = $('.type-messages input').val().trim();

        //inserisco il testo in nun nuovo div
        // $('.current').append('<div class="mymessage"><span class="messaggio">' + testo_messaggio + '</span><span>' + date() + '</span><i class="fas fa-angle-down"></i><ul class="mydropdown"><li>Message info</li><li>Delete Message</li></ul></div>');
        // var clono_m = $('.template').children().clone();
        // clono_m.addClass('mymessage');
        // clono_m.find('span:first-of-type').addClass('messaggio').text(testo_messaggio);
        // clono_m.find('span:nth-child(2)').text(date());
        // clono_m.find('ul').addClass('mydropdown');
        // $('.current').append(clono_m);
        var template_html = $('#template').html();
        var template_function = Handlebars.compile(template_html);

        var miomessaggio = {
            'primaclasse' : 'mymessage',
            'secondaclasse' : 'messaggio',
            'testomessaggio' : testo_messaggio,
            'orario' : date(),
            'terzaclasse' : 'mydropdown',
        }

        var messaggio_finale = template_function(miomessaggio);
        $('.current').append(messaggio_finale);

        var clock = setInterval(rispostamessaggio, 1000);

        function rispostamessaggio() {
            // var clono_risposta = $('.template').children().clone();
            // clono_risposta.addClass('reply');
            // clono_risposta.find('span:first-of-type').addClass('risposta').text('ok');
            // clono_risposta.find('span:nth-child(2)').text(date());
            // clono_risposta.find('ul').addClass('dropdown')
            // $('.current').append(clono_risposta);

            // $('.current').append('<div class="reply"><span class="risposta">ok</span><span>' + date() + '</span><i class="fas fa-angle-down"></i><ul class="dropdown"><li>Message info</li><li>Delete Message</li></ul></div>');

            var rispostahandle = {
                'primaclasse' : 'reply',
                'secondaclasse' : 'risposta',
                'testomessaggio' : 'ok',
                'orario' : date(),
                'terzaclasse' : 'dropdown',
            }

            var risposta_finale = template_function(rispostahandle);
            $('.current').append(risposta_finale);


            clearInterval(clock);
            aggiornamento_messaggi()
            autoScroll();
        }

        $('.type-messages input').val('');

        if ($('.type-messages input').val('')) {
            $('.fa-paper-plane').hide();
            $('.fa-microphone').show();
        }

        aggiornamento_messaggi()

        autoScroll()
    }
}

//creo una funzione per spostare la chat
function move_chat() {
    //prendo il contatto con la classe selcted, lo clono e poi lo rimuovo, poi faccio prepend
    // var clono = $('.list-contacts .selected').clone();
    // var rimuovo = $('.list-contacts .selected').remove();
    $('.list-contacts .selected').prependTo('.list-contacts');
    //porto la scrollbar in cima
    if ($(".list-contacts").scrollTop() != 0) {
        $(".list-contacts").scrollTop(0);
    }
}

//scrivo l'ultimo messaggio scritto all'interno delle chat
function aggiornamento_messaggi(){
    var ultimo_messaggio = $('.current').children('div:last-child').children('span:first-of-type').text();
    $('.selected p:last-of-type').text(ultimo_messaggio);
}

//faccio scroll in modo che si vedano gli ultimi messaggi
function autoScroll() {
    $('.chat-conteiner').scrollTop($('.current')[0].scrollHeight);
}

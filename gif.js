$(document).ready(function() {

    console.log('WhatsUp')

    var topicsArray = ['baseball', 'soccer', 'football', 'golf', 'hockey', 'football', 'basketball', 'volleyball', 'lacrosse', 'cycling']

    function displayButton(){
        for(var i = 0; i < topicsArray.length; i++) {
            var btn = $('<button>')
            btn.text(topicsArray[i]) 
            btn.addClass("tomclass");   
            $('#buttonContainer').append(btn)
        }
    }

    displayButton()

    $(document).on('click', '.tomclass', function(){
        console.log('we got clicked', $(this).text())
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        $(this).text() + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
        console.log('WhatsUp!!!', queryURL);
        $.ajax({
            url: queryURL
        }).then(function(data){
            console.log('u got this!!!', data)
            console.log(data.data)


            $('#gifsGoHere').empty()

            for(var i = 0; i < data.data.length; i++){
                console.log(data.data[i].images)
                var img = $('<img>');
                img.attr('src', data.data[i].images.fixed_width.url);
                img.attr('data-animated', data.data[i].images.fixed_width.url);
                img.attr('data-still', data.data[i].images.fixed_height_still.url);
                img.attr('data-state', 'animated');
                img.addClass('gif')
                $('#gifsGoHere').prepend(img)
            }

            //put gifs on the page!!!
        })
    })

$(document).on('click', '.gif',function(){
        console.log('we just clikced a gif!!!', $(this).attr('data-state'))

        if ($(this).attr('data-state') === 'animated') {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still')
        } else if ($(this).attr('data-state') === 'still'){
            console.log('MAKE IT ANIMATED!!!')
            $(this).attr('src', $(this).attr('data-animated'));
            $(this).attr('data-state', 'animated')
        }
})
    
})
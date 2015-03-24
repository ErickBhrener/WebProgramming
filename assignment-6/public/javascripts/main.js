$('#enter').click(function(){  
    var mov = $('#txt').val();
    $.ajax({ 
        url: '/play/' + mov,
        type: 'POST',
        dataType:'json',
        data: { move: mov}, 
        success: function(data){
            console.log(JSON.stringify(data,null,4));
            document.getElementById("result").innerHTML = JSON.stringify(data, undefined, 2);
        }
        , error: function(jqXHR, textStatus, err){
            alert('text status '+textStatus+', err '+err)
        }
    });
}); 

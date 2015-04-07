$(function() {
    $('#search').on('keyup', function(e) {
        if (e.keyCode === 13) {
            var mov = $('#search').val();
            $.ajax({
                url: '/save',
                type: 'POST',
                dataType: 'html',
                data: {
                    key: mov
                },
                success: function(data) {
                    $('#results').html(data);
                },
                error: function(jqXHR, textStatus, err) {
                    alert('text status ' + textStatus + ', err ' + err);
                }
            });
        }
    });
    setInterval(function() {
        $('#topList').empty();
        /// show login users 
        $.ajax({
            url: "/urls",
            error: function() {

            },
            dataType: "json",
            success: function(reply) {
                var data = JSON.parse(reply);
                var i;
                for (i = 0; i < 10; i++) {
                    if (data[i] !== undefined) {
                        $('#topList').append("<a href='http://localhost:3000/" + data[i] + "'>" + data[i] + "</a><br/>");
                    }
                }
                console.log(data[0][1]);
            },
            type: "post"
        })
    }, 5000);
});
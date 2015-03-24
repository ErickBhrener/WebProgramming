$(document).ready(function () {
    "use strict";

    function showPosts(jsonData) {
        var oldposts = $('#oldposts');
        oldposts.empty();
        if (jsonData.ok) {
            $.each(jsonData.posts, function (index, post) {
                var newElt = $('<div>');
                // SECURITY HOLE: Don't post raw HTML from user!
                newElt.html('<b>User:</b> ' + post.name + '<br />\n'
                    + '<div>' + post.message + '</div>');
                oldposts.append(newElt);
            });
        } else {
            oldposts.text(jsonData.message);
        }
    }

    $.ajax({ url: 'fetch', type: 'get', cache: false,
        error: function (jqxhr, textStatus, errorThrown) {
            $('#oldposts').text('HTTP error: ' + textStatus);
        },
        success: showPosts
    });

    $('#addnew').submit(function (evnt) {
        evnt.preventDefault();
        $.ajax({ url: 'addnew', type: 'post', dataType: 'json',
            data: { name: $('#name').val(), message: $('#message').val() },
            error: function (jqxhr, textStatus, errorThrown) {
                $('#oldposts').text('HTTP error: ' + textStatus);
            },
            success: showPosts
        });
    });
});
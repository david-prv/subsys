$(document).ready(function(){  
    $('#submit').click(submitFlag);
});

/**
 * Validate Form, catch CSRF,
 * submit FLAG safely.
 * 
 * @param {*} e 
 * @returns 
 */
function submitFlag(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let form = $('#submit-form');
    if(!form[0].checkValidity()) {
        form.addClass('was-validated');
        return;
    }

    let csrf = $('input[name="_csrf"]')[0].value;
    $.ajax({
        url: '/flag',
        type: 'POST',
        headers: {
            'CSRF-Token': csrf
        },
        data: {
            'id': $('#submission-id').val(),
            'flag': $('#flag').val()
        },
        success: function(res) {
            console.log(res);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.error(textStatus);
        }
    });
}

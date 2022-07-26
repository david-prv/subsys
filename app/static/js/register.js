$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
    $('#submit').click(submitRegister);
});

/**
 * Validate Form, catch CSRF,
 * submit identification request safely.
 * 
 * @param {*} e 
 * @returns 
 */
function submitRegister(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let form = $('#register-form');
    if(!form[0].checkValidity()) {
        form.addClass('was-validated');
        return;
    }

    let csrf = $('input[name="_csrf"]')[0].value;
    $.ajax({
        url: '/register',
        type: 'POST',
        headers: {
            'CSRF-Token': csrf
        },
        data: {
            'email': $('#email').val(),
            'alias': $('#alias-name').val(),
            'secret': $('#secret').val()
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

$(document).ready(function(){  
    $('#submit').click(submitFlag);
    $('#history').click(() => {
        window.location.href = "/history";
    });
});

/**
 * Function that shows the error message
 */
function showErrorAlert() {
    $('#submit-form').html("Submission has failed.");
}

/**
 * Function that shows the error message
 */
function showSuccessAlert() {
    $('#submit-form').html("You have successfully submitted a flag!");
}


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
            if(res !== "ok") {
                window.sessionStorage.setItem("gift_code", res);
                window.location.href = "/receive-gift";
                return;
            }
            showSuccessAlert();
        },
        error: function ()
        {
            showErrorAlert();
        }
    });
}
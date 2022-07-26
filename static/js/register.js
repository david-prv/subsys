function submitRegister(e) {
    e.preventDefault();
    e.stopPropagation();
    
    let form = $('#register-form');
    if(!form[0].checkValidity()) {
        form.addClass('was-validated');
        return;
    }

    $.post('/register', {email: $('#email').val(), alias: $('#alias-name').val(), secret: $('#secret').val()}, function(res) {
        console.log(res);
    });
}

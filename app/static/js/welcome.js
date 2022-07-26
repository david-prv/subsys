$(document).ready(function(){  
    let stored_id = window.sessionStorage.getItem('sub_id');
    if(!stored_id || stored_id == null || stored_id == "") window.location.href="/";
    $('#id').html(window.sessionStorage.getItem('sub_id'));
    window.sessionStorage.clear();
});
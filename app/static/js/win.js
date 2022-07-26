$(document).ready(function(){  
    let stored_code = window.sessionStorage.getItem('gift_code');
    if(!stored_code || stored_code == null || stored_code == "") window.location.href="/";
    $('#gift').html(window.sessionStorage.getItem('gift_code'));
    window.sessionStorage.clear();
});
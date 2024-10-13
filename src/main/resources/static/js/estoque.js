$.getScript("/js/categoria.js");
$.getScript("/js/postrequest.js");
$.getScript("/js/getrequest.js");


function categoria(){
    console.log("categoria");
    $("#container").load("/templates/categoria.html");
    return false;
}

function toast(titulo, mensagem, tipo) {
    $.toast({
        text: mensagem, // Text that is to be shown in the toast
        heading: titulo, // Optional heading to be shown on the toast
        icon: tipo, // Type of toast icon
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 5000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600'
    });
}
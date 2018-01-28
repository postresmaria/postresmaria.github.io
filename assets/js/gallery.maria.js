/** Function to start the gallery */
startGallery = function(){
    var topScroll = $(window).scrollTop();
    setTimeout(() => {
        
        $('.thumb').each(function(i){
            setTimeout(() => {
                $('.thumb').eq(i).addClass('is-visible');
            }, 200 * (i + 1));
        });
        
    }, 1000);
}

$(document).ready(function(){
    startGallery()
    recipeTada = function() {
      var randNum = Math.floor(Math.random() * $(".thumb").length);
      $(".thumb")
        .eq(randNum)
        .addClass("is-tada")
        .siblings()
        .removeClass("is-tada");
    };

    setInterval(recipeTada, 3600);
})
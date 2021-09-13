console.log('hey');

$('.navbar-burger').on('click', () => {
    $('#navbarBasicExample').toggle();
    $('.navbar-burger').toggleClass('is-active');
})

$('#restaurant-page-bottom-about-link').on('click', (event) => {
    console.log('A')
    console.log(event.target);
})

let restaurantPageBottomLinks = document.querySelectorAll('.restaurant-page-bottom-link');
let restaurantPageBottomSections = document.querySelectorAll('.restaurant-page-bottom-section');


restaurantPageBottomLinks.forEach((link, index) => {
    $(link).on('click', () => {
        restaurantPageBottomLinks.forEach((link) => {
            $(link).removeClass('is-active');
        })

        restaurantPageBottomSections.forEach((section) => {
            $(section).addClass('is-hidden');
        });
        $(link).toggleClass('is-active');
        $(restaurantPageBottomSections[index]).toggleClass('is-hidden');
    })
})
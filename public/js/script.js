// const { search } = require("../../controllers");

console.log('hey');

const popouts = document.querySelectorAll('.card-popout');
console.log(popouts);

$('.navbar-burger').on('click', () => {
    console.log('boigeh')
    $('#navbarBasicExample').toggle();
    $('.navbar-burger').toggleClass('is-active');
})

// function openAppOptions(id) {


//     console.log(id)
//     $(event.target).prev().toggle();
//     $(event.target).toggleClass('color-gray');

// }

// $('.ellipse-container').on('click', (event) => {
//     console.log(event.target);
//     $(event.target).prev().toggle();
//     $(event.target).toggleClass('color-gray');
// })

$('.navbar-home').on('click', () => {
    console.log('home')
    $('#navbarBasicExample').css('display', 'none');
    $('.navbar-home').toggleClass('is-active');
})
$('.navbar-plus').on('click', () => {
    console.log('plus')
    $('#navbarBasicExample').css('display', 'none');
    $('.navbar-plus').toggleClass('is-active');
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

// open/close job app options on student index page
$(document).on('click', (event) => {
    if ($(event.target).hasClass('ellipse-container')) {
        $(event.target).prev().toggle();
        $(event.target).toggleClass('card-popout-link');
    }
    if ($(event.target).hasClass('fa-ellipsis-v')) {
        $(event.target).parent().prev().toggle();
        $(event.target).parent().toggleClass('card-popout-link');
    }
    if ($(event.target).attr('d') == "M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z") {
        $(event.target).parent().parent().prev().toggle();
        $(event.target).parent().parent().toggleClass('card-popout-link');
    }
})


//check passwords match new account creation
$('#create-account-form').on('submit', (event)=> {
    if ($('#set-password').val() !== $('#confirm-password').val()) {
        event.preventDefault();
        $('#set-password').val('')
        $('#confirm-password').val('')
        alert('Passwords must match!')
    }
})


$('#filter-index-form').on('submit', (event)=> {
    
    // event.preventDefault();
    
    const includeRejected = $('#include-rejected-apps').prop('checked');
    // const sortBy = ;
    let searchTerm = $('#filter-index-term').val();

    if (searchTerm === "") searchTerm="null";

    console.log('hey nico man')
    console.log(includeRejected);
    // console.log(sortBy);
    console.log(searchTerm);
    $('#filter-index-form').attr('action', `/student/my_applications/${includeRejected}/sortBy/${searchTerm}`)
})
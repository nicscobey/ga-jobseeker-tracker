// const { search } = require("../../controllers");

// const mongoose = require('mongoose');
// const express = require('express');

// const MongoStore = require('connect-mongo');

console.log('hey');

const popouts = document.querySelectorAll('.card-popout');

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

// $('#restaurant-page-bottom-about-link').on('click', (event) => {
//     console.log('A')
//     console.log(event.target);
// })

// let restaurantPageBottomLinks = document.querySelectorAll('.restaurant-page-bottom-link');
// let restaurantPageBottomSections = document.querySelectorAll('.restaurant-page-bottom-section');


// restaurantPageBottomLinks.forEach((link, index) => {
//     $(link).on('click', () => {
//         restaurantPageBottomLinks.forEach((link) => {
//             $(link).removeClass('is-active');
//         })

//         restaurantPageBottomSections.forEach((section) => {
//             $(section).addClass('is-hidden');
//         });
//         $(link).toggleClass('is-active');
//         $(restaurantPageBottomSections[index]).toggleClass('is-hidden');
//     })
// })

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
    // if (!($(event.target).hasClass('card-popout'))) {
    //     console.log('hi not a popout')
    //     const cardPopouts = document.querySelectorAll('.card-popout');
    //     for (let i = 0; i < cardPopouts.length; i++) {
    //         console.log('yello')
    //         $(cardPopouts[i]).css('display', 'none');
    //     }
    // }
})





$('#filter-index-form').on('submit', (event)=> {
    
    // event.preventDefault();
    
    const includeRejected = $('#include-rejected-apps').prop('checked');
    const sortBy = $('#sort-my-apps').val();
    let searchTerm = $('#filter-index-term').val();

    if (searchTerm === "") searchTerm="null";

    console.log('hey nico man')
    console.log(includeRejected);
    console.log(sortBy);
    console.log(searchTerm);
    $('#filter-index-form').attr('action', `/student/my_applications/${includeRejected}/${sortBy}/${searchTerm}`)
})

// $('#sort-my-apps').on('change', (event)=> {
//     let jobCards = document.querySelectorAll('.job-card');
//     console.log(jobCards);
//     console.log(event.target);
//     console.log($(event.target).val());
//     console.log(event.target.tagName);



//     event.target.tagName = "input";
//     $(event.target).attr('action', '')

// })

$('#sort-my-apps').on('change', () => {
    if ($('#sort-my-apps').val() === "") {
        $('#sort-my-apps').css('color', '#cbcbcb')
    }
    else {
        $('#sort-my-apps').css('color', '#363636')
    }
})

let passwordMeetsRequirements = false;

//password requirements validation
$('#set-password').on('focus', ()=> {
    $('#password-validation').toggle();


    $('#set-password').on('input', ()=> {
        let hasUpperCase= false;
        let hasLowerCase= false;
        let hasEightChars= false;


        //check password length
        if ($('#set-password').val().length > 7) {
            $('#password-validation-length').css('color', 'hsl(141, 53%, 53%)')
            hasEightChars = true;
            $('#password-validation-length-icon').addClass('fa-check');
            $('#password-validation-length-icon').removeClass('fa-times');
        }
        else {
            $('#password-validation-length').css('color', '#363636')
            hasEightChars = false;
            $('#password-validation-length-icon').addClass('fa-times');
            $('#password-validation-length-icon').removeClass('fa-check');
        }
        
        //if character is not number, check if lower/uppercase
        for (let i = 0; i < $('#set-password').val().length; i++) {
            if (!(/\d/.test($('#set-password').val()[i]))) {
                if ($('#set-password').val()[i] === $('#set-password').val()[i].toUpperCase()) {
                    hasUpperCase = true;
                }
                if ($('#set-password').val()[i] === $('#set-password').val()[i].toLowerCase()) {
                    hasLowerCase = true;
                }
            }
        }
        
        //update requirements color
        if (hasUpperCase) {
            $('#password-validation-uppercase').css('color', 'hsl(141, 53%, 53%)');
            $('#password-validation-uppercase-icon').addClass('fa-check');
            $('#password-validation-uppercase-icon').removeClass('fa-times');
        }
        else {
            $('#password-validation-uppercase').css('color', '#363636');
            $('#password-validation-uppercase-icon').addClass('fa-times');
            $('#password-validation-uppercase-icon').removeClass('fa-check');
        }
        if (hasLowerCase) {
            $('#password-validation-lowercase').css('color', 'hsl(141, 53%, 53%)');
            $('#password-validation-lowercase-icon').addClass('fa-check');
            $('#password-validation-lowercase-icon').removeClass('fa-times');
        }
        else {
            $('#password-validation-lowercase').css('color', '#363636');
            $('#password-validation-lowercase-icon').addClass('fa-times');
            $('#password-validation-lowercase-icon').removeClass('fa-check');
        }

        //check if password has number
        let hasNumber = /\d/.test($('#set-password').val());

        if (hasNumber) {
            $('#password-validation-number').css('color', 'hsl(141, 53%, 53%)');
            $('#password-validation-number-icon').addClass('fa-check');
            $('#password-validation-number-icon').removeClass('fa-times');
        }
        else {
            $('#password-validation-number').css('color', '#363636');
            $('#password-validation-number-icon').addClass('fa-times');
            $('#password-validation-number-icon').removeClass('fa-check');
        }

        if (hasNumber && hasLowerCase && hasUpperCase && hasEightChars) {
            passwordMeetsRequirements = true;
        }
    })
})

$('#set-password').on('focusout', ()=> {
    $('#password-validation').toggle();
})


//password match validation
$('#confirm-password').on('focus', ()=> {
    $('#password-match-check').toggle();

    $('#confirm-password').on('input', ()=> {
        if ($('#confirm-password').val() !== $('#set-password').val()) {
            $('#password-match-check').addClass('is-danger')
            $('#password-match-check').removeClass('is-success')
            console.log('no match');
            $('#password-match-text').html('Passwords must match');

        }
        else {
            $('#password-match-check').addClass('is-success')
            $('#password-match-check').removeClass('is-danger')
            console.log('match');
            $('#password-match-text').html('Passwords match!');
        }
    })
});

$('#confirm-password').on('focusout', ()=> {
    $('#password-match-check').toggle();
})

//check passwords match new account creation
$('#create-account-form').on('submit', (event)=> {
    if ($('#set-password').val() !== $('#confirm-password').val()) {
        event.preventDefault();
        $('#set-password').val('')
        $('#confirm-password').val('')
        alert('Passwords must match!')
    }
    if (!passwordMeetsRequirements) {
        console.log('passwordMeetsRequirements', passwordMeetsRequirements)
        event.preventDefault();
        $('#set-password').val('')
        $('#confirm-password').val('')
        alert('Password does not meet security requirements')
    }
})

//modal event listeners
$('.')
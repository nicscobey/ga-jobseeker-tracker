const popouts = document.querySelectorAll('.card-popout');

$('.navbar-burger').on('click', () => {
    $('#navbarBasicExample').toggle();
    $('.navbar-burger').toggleClass('is-active');
})

$('.navbar-home').on('click', () => {
    $('#navbarBasicExample').css('display', 'none');
    $('.navbar-home').toggleClass('is-active');
})
$('.navbar-plus').on('click', () => {
    $('#navbarBasicExample').css('display', 'none');
    $('.navbar-plus').toggleClass('is-active');
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





$('#filter-index-form').on('submit', (event)=> {
    const includeRejected = $('#include-rejected-apps').prop('checked');
    const sortBy = $('#sort-my-apps').val();
    let searchTerm = $('#filter-index-term').val();

    if (searchTerm === "") searchTerm="null";

    $('#filter-index-form').attr('action', `/student/apps/my_applications/${includeRejected}/${sortBy}/${searchTerm}`)
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
            $('#password-match-text').html('Passwords must match');

        }
        else {
            $('#password-match-check').addClass('is-success')
            $('#password-match-check').removeClass('is-danger')
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
        event.preventDefault();
        $('#set-password').val('')
        $('#confirm-password').val('')
        alert('Password does not meet security requirements')
    }
})

$('.show-app-close-modal').on('click', (event)=> {
    $(event.target).parent().parent().parent().toggleClass('is-active')
    
})

$('.delete-app-button').on('click', (event)=> {
    $('#show-app-modal').toggleClass('is-active')
})

$('.cancel-delete-button').on('click', (event)=> {
    $('#show-app-modal').toggleClass('is-active')
})
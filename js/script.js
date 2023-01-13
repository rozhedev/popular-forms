import RandExp from "https://cdn.skypack.dev/randexp";

// * SIGNUP

const signupForm = document.getElementById('signup-form');
const signupFullname = document.getElementById('signup-fullname');
const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupPassword2 = document.getElementById('signup-password2');
const signupCheckbox = document.getElementById('signup-checkbox');
const signupInputs = document.querySelectorAll('.signup__form-inp');
const triggerBtns = document.querySelectorAll('.signup__trigger');

// * SIGNUP CAPTCHA

const signupCaptchaText = document.getElementById('signup-captcha-text');
const signupReloadBtn = document.getElementById('signup-reload-btn');
const signupCaptchaInp = document.getElementById('signup-captcha-inp');
const signupStatusText = document.getElementById('signup-captcha-status');

// * LOGIN

const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginInputs = document.querySelectorAll('.login__form-inp');

// * LOGIN CAPTCHA

const loginCaptchaText = document.getElementById('login-captcha-text');
const loginReloadBtn = document.getElementById('login-reload-btn');
const loginCaptchaInp = document.getElementById('login-captcha-inp');
const loginStatusText = document.getElementById('login-captcha-status');

// * RESET FORM

const resetForm = document.getElementById('reset-form');
const resetEmail = document.getElementById('reset-email');
// const reInputs = document.querySelectorAll('.login__form-inp');

// * RegEx

function isFullname(fullname) {
    return /\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/.test(fullname);
}

function isUsername(username) {
    return /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(username);
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
}

// * VALIDATION

function checkFullname(fullname) {
    const fullnameValue = fullname.value.trim();

    if (fullnameValue === '') {
        setErrorFor(fullname, 'Fullname cannot be blank');
    } else if (!isFullname(fullnameValue)) {
        setErrorFor(fullname, 'Incorrect fullname');
    } else {
        setSuccessFor(fullname);
    }
}

function checkUsername(username) {
    const usernameValue = username.value.trim();

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank');
    } else if (!isUsername(usernameValue)) {
        setErrorFor(username, 'Username must be consist of (0-9), ( _ ) and (a-z)');
    } else if (usernameValue.length < 5 || usernameValue.length > 20) {
        setErrorFor(username, 'Username must be longer than 5 and less than 20');
    } else {
        setSuccessFor(username);
    }
}

function checkEmail(email) {
    const emailValue = email.value.trim();

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email');
    } else {
        setSuccessFor(email);
    }
}

function checkPassword(password) {
    const passwordValue = password.value.trim();

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank');
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, 'Password does not meet security requirements');
    } else {
        setSuccessFor(password);
    }
}

function comparePassword(password, password2) {
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (passwordValue == '') {
        setErrorFor(password2, 'Confirm password cannot be blank');
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Passwords does not match');
    } else {
        setSuccessFor(password2);
    }
}

// * CAPTCHA FUNCTIONS

// * RegEx for generate random chars

function generateCode(str) {
    str = new RandExp(/[a-zA-Z0-9]{6}/).gen();
    return str;
}

function getCaptcha(outputCode) {
    let randomStr;
    randomStr = generateCode(randomStr);
    outputCode.textContent = randomStr;
}

// * Correctness check

function checkCaptcha(captchaInp, captchaText, statusText) {
    const captchaValue = captchaInp.value;

    if (captchaValue == '') {
        statusText.classList.add('_error');
        statusText.classList.remove('_success');

        captchaInp.classList.add('_error');
        captchaInp.classList.remove('_success');
        statusText.textContent = 'Captcha cannot be blank';
    } else {

        if (captchaValue == captchaText.textContent) {
            statusText.classList.add('_success');
            statusText.classList.remove('_error');

            captchaInp.classList.add('_success');
            captchaInp.classList.remove('_error');
            statusText.textContent = 'Nice! You don\'t appear to the robot.';
        } else {
            statusText.classList.add('_error');
            statusText.classList.remove('_success');

            captchaInp.classList.add('_error');
            captchaInp.classList.remove('_success');
            statusText.textContent = 'Captcha not matched. Please try again!';
        }
    }
}

// * SHOW/HIDE TRIGGER

function showValue(btn) {
    let inp = btn.previousElementSibling;

    if (inp.getAttribute('type') == 'password') {
        inp.setAttribute('type', 'text');
        btn.classList.remove('_hide');
        btn.classList.add('_show');
    } else {
        inp.setAttribute('type', 'password');
        btn.classList.remove('_show');
        btn.classList.add('_hide');
    }
}

// * CHECKBOX

function isChecked(checkbox) {
    if (checkbox.checked == false) {
        setErrorFor(checkbox, 'You must agree to the terms');
    } else {
        setSuccessFor(checkbox);
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.classList.add('_error')
    formControl.classList.remove('_success');
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.classList.remove('_error')
    formControl.classList.add('_success');
}

// * CALL FUNCTIONS IN SIGNUP

signupInputs.forEach(currentInputs => {
    currentInputs.addEventListener('input', function (e) {
        e.preventDefault();
        e = event.currentTarget;

        if (signupFullname && e == signupFullname) {
            setTimeout(function () {
                checkFullname(signupFullname);
            }, 4000);
        }
        if (signupUsername && e == signupUsername) {
            setTimeout(function () {
                checkUsername(signupUsername);
            }, 4000);
        }
        if (signupEmail && e == signupEmail) {
            setTimeout(function () {
                checkEmail(signupEmail);
            }, 6000);
        }
        if (signupPassword && e == signupPassword) {
            setTimeout(function () {
                checkPassword(signupPassword);
            }, 4000);
        }
        if (signupPassword2 && e == signupPassword2) {
            setTimeout(function () {
                comparePassword(signupPassword, signupPassword2);
            }, 4000);
        }
    })
});

// CALL FUNCTION FOR SHOW/HIDE TRIGGER

triggerBtns.forEach(currentBtn => {
    currentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showValue(currentBtn);
    })
});

// * CALL FUNCTIONS FOR SIGNUP CAPTCHA

getCaptcha(signupCaptchaText);

signupReloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getCaptcha(signupCaptchaText);
});

signupCaptchaInp.addEventListener('input', function () {
    setTimeout(function () {
        checkCaptcha(signupCaptchaInp, signupCaptchaText, signupStatusText);
    }, 6000);
});

// * CALL FUNCTIONS ON SIGNUP SUBMIT

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    checkFullname(signupFullname);
    checkUsername(signupUsername);
    checkEmail(signupEmail);
    checkPassword(signupPassword);
    comparePassword(signupPassword, signupPassword2);
    checkCaptcha(signupCaptchaInp, signupCaptchaText, signupStatusText);
    isChecked(signupCheckbox);
})

// * CALL FUNCTIONS IN LOGIN

loginInputs.forEach(currentInputs => {
    currentInputs.addEventListener('input', function (e) {
        e.preventDefault();
        e = event.currentTarget;

        if (loginUsername && e == loginUsername) {
            setTimeout(function () {
                checkUsername(loginUsername);
            }, 4000);
        }
        if (loginPassword && e == loginPassword) {
            setTimeout(function () {
                checkPassword(loginPassword);
            }, 4000);
        }
    })
});

// * CALL FUNCTIONS FOR LOGIN CAPTCHA

getCaptcha(loginCaptchaText);

loginReloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getCaptcha(loginCaptchaText);
});

loginCaptchaInp.addEventListener('input', function () {
    setTimeout(function () {
        checkCaptcha(loginCaptchaInp, loginCaptchaText, loginStatusText);
    }, 6000);
});

// * CALL FUNCTIONS ON LOGIN SUBMIT

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    checkUsername(loginUsername);
    checkPassword(loginPassword);
    checkCaptcha(loginCaptchaInp, loginCaptchaText, loginStatusText);
});

// * CALL FUNCTIONS FOR RESET

resetEmail.addEventListener('input', function (e) {
    e.preventDefault();
    e = event.currentTarget;

    setTimeout(function () {
        checkEmail(resetEmail);
    }, 6000);
});

resetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    checkEmail(resetEmail);
});
// * NODES

const SIGNUP_NODES = {
    form: document.getElementById('signup-form'),
    inputs: document.querySelectorAll('.signup-form__inp'),
    fullname: document.getElementById('signup-fullname'),
    username: document.getElementById('signup-username'),
    email: document.getElementById('signup-email'),
    password: document.getElementById('signup-password'),
    repeatPassword: document.getElementById('signup-password2'),
    triggers: document.querySelectorAll('.trigger'),        // * Buttons for view/hide password

    radioList: document.querySelectorAll('.radio__input'),
    captchaText: document.getElementById('signup-captcha-text'),
    reloadBtn: document.getElementById('signup-reload-btn'),
    captchaInp: document.getElementById('signup-captcha-inp'),
    captchaErr: document.getElementById('signup-captcha-error'),
    checkbox: document.getElementById('signup-checkbox'),
}

const LOGIN_NODES = {
    form: document.getElementById('login-form'),
    inputs: document.querySelectorAll('.login-form__inp'),
    username: document.getElementById('login-username'),
    password: document.getElementById('login-password'),
    captchaText: document.getElementById('login-captcha-text'),
    reloadBtn: document.getElementById('login-reload-btn'),
    captchaInp: document.getElementById('login-captcha-inp'),
    captchaErr: document.getElementById('login-captcha-error'),
}

// * RESET FORM
const RESET_NODES = {
    form: document.getElementById('reset-form'),
    email: document.getElementById('reset-email'),
}

const TEXT_ERRORS = {
    blankFullname: "Fullname cannot be blank",
    invalidFullname: "Invalid fullname",
    blankUsername: "Username cannot be blank",
    invalidCharsUsername: "Username must be consist of (0-9), ( _ ) and (a-z)",
    lenghtUsername: "Username must be longer than 5 and less than 20",
    emailBlank: "Email cannot be blank",
    invalidEmail: "Invalid email",

    blankPass: "Password cannot be blank",
    unsafePass: "Password doesn't meet security requirements",
    blankRepeatPass: "Confirm password cannot be blank",
    passNotMatch: "Passwords doesn't match",
    blankCaptcha: "Captcha cannot be blank",
    completeCaptcha: "Nice! You don't appear to the robot.",
    captchaNotMatch: "Captcha not matched. Please try again!",
    notChecked: "You must agree to the terms",
    notCheckedRadio: "Choose one variant",
}

const STATE_LIST = {
    error: "_error",
    success: "_success",
    hide: "_hide",
    show: "_show",
}

// * Validation intervals
const VALID_INT = {
    username: {
        min: 5,
        max: 20,
    },
}

let validDelay = 5000;

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

    if (fullnameValue === '') setErrorFor(fullname, TEXT_ERRORS.blankFullname);
    else if (!isFullname(fullnameValue)) setErrorFor(fullname, TEXT_ERRORS.invalidFullname);
    else setSuccessFor(fullname);
}

function checkUsername(username) {
    const usernameValue = username.value.trim();

    if (usernameValue === '') setErrorFor(username, TEXT_ERRORS.blankUsername);
    else if (!isUsername(usernameValue)) setErrorFor(username, TEXT_ERRORS.invalidCharsUsername);
    else if (
        usernameValue.length < VALID_INT.username.min ||
        usernameValue.length > VALID_INT.username.max
    ) setErrorFor(username, TEXT_ERRORS.lenghtUsername);
    else setSuccessFor(username);
}

function checkEmail(email) {
    const emailValue = email.value.trim();

    if (emailValue === '') setErrorFor(email, TEXT_ERRORS.emailBlank);
    else if (!isEmail(emailValue)) setErrorFor(email, TEXT_ERRORS.invalidEmail);
    else setSuccessFor(email);
}

function checkPassword(password) {
    const passwordValue = password.value.trim();

    if (passwordValue === '') setErrorFor(password, TEXT_ERRORS.blankPass);
    else if (!isPassword(passwordValue)) setErrorFor(password, TEXT_ERRORS.unsafePass);
    else setSuccessFor(password);
}

function comparePassword(password, repeatPassword) {
    const passwordValue = password.value.trim();
    const repeatPasswordValue = repeatPassword.value.trim();

    if (passwordValue == '') setErrorFor(repeatPassword, TEXT_ERRORS.blankRepeatPass);
    else if (passwordValue !== repeatPasswordValue) setErrorFor(repeatPassword, TEXT_ERRORS.passNotMatch);
    else setSuccessFor(repeatPassword);
}

// * CAPTCHA FUNCTIONS

function getCaptcha(outputCode) {
    let randomStr = new RandExp(/[a-zA-Z0-9]{6}/).gen();
    outputCode.textContent = randomStr;
}

function checkCaptcha(captchaInp, captchaText, captchaErr) {
    const captchaValue = captchaInp.value;

    if (captchaValue == captchaText.textContent) {
        captchaErr.classList.add(STATE_LIST.success);
        captchaErr.classList.remove(STATE_LIST.error);

        captchaInp.classList.add(STATE_LIST.success);
        captchaInp.classList.remove(STATE_LIST.error);
        captchaErr.textContent = TEXT_ERRORS.completeCaptcha;
    } else {
        captchaErr.classList.add(STATE_LIST.error);
        captchaErr.classList.remove(STATE_LIST.success);
        captchaInp.classList.add(STATE_LIST.error);
        captchaInp.classList.remove(STATE_LIST.success);

        if (captchaValue == "") {
            captchaErr.textContent = TEXT_ERRORS.blankCaptcha;
        } else {
            captchaErr.textContent = TEXT_ERRORS.captchaNotMatch;
        }
    }
}

// * Show/hide trigger

function showValue(btn) {
    let inp = btn.previousElementSibling;

    if (inp.getAttribute('type') == 'password') {
        inp.setAttribute('type', 'text');
        btn.classList.add(STATE_LIST.show);
        btn.classList.remove(STATE_LIST.hide);
    } else {
        inp.setAttribute('type', 'password');
        btn.classList.add(STATE_LIST.hide);
        btn.classList.remove(STATE_LIST.show);
    }
}

// * Checkbox & radio

function isChecked(checkbox) {
    if (checkbox.checked == false) setErrorFor(checkbox, TEXT_ERRORS.notChecked);
    else setSuccessFor(checkbox);
}

function isCheckedRadio(nodeList) {
    if (nodeList.length < 0) return;
    else {
        for (const item of nodeList) {
            console.log(item.checked);
            
            if (item.checked == true) {
                setSuccessFor(item);
                return;
            } else {
                setErrorFor(item, TEXT_ERRORS.notCheckedRadio);
            }
        }
    }
}

// * COMMON FUNC

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    formControl.classList.add(STATE_LIST.error)
    formControl.classList.remove(STATE_LIST.success);
    small.textContent = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.classList.add(STATE_LIST.success);
    formControl.classList.remove(STATE_LIST.error)
}

function getCallCond(elem, event) {
    return elem && event == elem;
}

// * CALL FUNCTIONS IN SIGNUP

SIGNUP_NODES.inputs.forEach(currentInputs => {
    currentInputs.addEventListener('input', function (e) {
        e.preventDefault();
        e = e.currentTarget;

        if (getCallCond(SIGNUP_NODES.fullname, e)) {
            setTimeout(() => {
                checkFullname(SIGNUP_NODES.fullname);
            }, validDelay);
        }
        if (getCallCond(SIGNUP_NODES.username, e)) {
            setTimeout(() => {
                checkUsername(SIGNUP_NODES.username);
            }, validDelay);
        }
        if (getCallCond(SIGNUP_NODES.email, e)) {
            setTimeout(() => {
                checkEmail(SIGNUP_NODES.email);
            }, validDelay);
        }
        if (getCallCond(SIGNUP_NODES.password, e)) {
            setTimeout(() => {
                checkPassword(SIGNUP_NODES.password);
            }, validDelay);
        }
        if (getCallCond(SIGNUP_NODES.repeatPassword, e)) {
            setTimeout(() => {
                comparePassword(SIGNUP_NODES.password, SIGNUP_NODES.repeatPassword);
            }, validDelay);
        }
    })
});

// * CALL FUNCTION FOR SHOW/HIDE TRIGGER

SIGNUP_NODES.triggers.forEach(currentBtn => {
    currentBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showValue(this);
    })
});

// * CALL FUNCTIONS FOR SIGNUP CAPTCHA

getCaptcha(SIGNUP_NODES.captchaText);

SIGNUP_NODES.reloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getCaptcha(SIGNUP_NODES.captchaText);
});

SIGNUP_NODES.captchaInp.addEventListener('input', function () {
    setTimeout(() => {
        checkCaptcha(SIGNUP_NODES.captchaInp, SIGNUP_NODES.captchaText, SIGNUP_NODES.captchaErr);
    }, validDelay);
});

// * CALL FUNCTIONS ON SIGNUP SUBMIT

SIGNUP_NODES.form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkFullname(SIGNUP_NODES.fullname);
    checkUsername(SIGNUP_NODES.username);
    checkEmail(SIGNUP_NODES.email);
    checkPassword(SIGNUP_NODES.password);
    comparePassword(SIGNUP_NODES.password, SIGNUP_NODES.repeatPassword);
    checkCaptcha(SIGNUP_NODES.captchaInp, SIGNUP_NODES.captchaText, SIGNUP_NODES.captchaErr);
    isCheckedRadio(SIGNUP_NODES.radioList);
    isChecked(SIGNUP_NODES.checkbox);
})

// * CALL FUNCTIONS IN LOGIN

LOGIN_NODES.inputs.forEach(currentInputs => {
    currentInputs.addEventListener('input', function (e) {
        e.preventDefault();
        e = e.currentTarget;

        if (getCallCond(LOGIN_NODES.username, e)) {
            setTimeout(() => {
                checkUsername(LOGIN_NODES.username);
            }, validDelay);
        }
        if (getCallCond(LOGIN_NODES.password, e)) {
            setTimeout(() => {
                checkPassword(LOGIN_NODES.password);
            }, validDelay);
        }
    })
});

// * CALL FUNCTIONS FOR LOGIN CAPTCHA

getCaptcha(LOGIN_NODES.captchaText);

LOGIN_NODES.reloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getCaptcha(LOGIN_NODES.captchaText);
});

LOGIN_NODES.captchaInp.addEventListener('input', function () {
    setTimeout(() => {
        checkCaptcha(LOGIN_NODES.captchaInp, LOGIN_NODES.captchaText, LOGIN_NODES.captchaErr);
    }, validDelay);
});

// * CALL FUNCTIONS ON LOGIN SUBMIT

LOGIN_NODES.form.addEventListener('submit', function (e) {
    e.preventDefault();

    checkUsername(LOGIN_NODES.username);
    checkPassword(LOGIN_NODES.password);
    checkCaptcha(LOGIN_NODES.captchaInp, LOGIN_NODES.captchaText, LOGIN_NODES.captchaErr);
});

// * CALL FUNCTIONS FOR RESET

RESET_NODES.email.addEventListener('input', function (e) {
    e.preventDefault();
    e = e.currentTarget;

    setTimeout(() => {
        checkEmail(RESET_NODES.email);
    }, validDelay);
});

RESET_NODES.form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkEmail(RESET_NODES.email);
});
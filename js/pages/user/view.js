/**
 * user page view module.
 * @module js/pages/user/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        PROFILE: {
            NICKNAME: 'nickname-input',
            EMAIL: 'email-input',
            PASSWORD_SPAN: 'password-span',
            PASSWORD: 'password-input',
            REPEAT_PASSWORD_SPAN: 'repeat-password-span',
            REPEAT_PASSWORD: 'password-repeat-input',
            IMAGE_URL: 'avatar-url-input',
            GET_RANDOM_URL_BUTTON: 'get-random-url-button',
            NAME: 'name-input',
            SURNAME: 'surname-input',
            BIRTH_DATE: 'datepicker',
            ABOUT_ME: 'about-input',
            AVATAR: 'profile-main-avatar',
            EDIT_BUTTON: 'profile-edit-button',
            PASSWORD_EDIT_BUTTON: 'password-edit-button',
            PASSWORD_EDIT_CHECKBOX_PART: 'password-edit-checkbox-part',
            PASSWORD_EDIT_CHECKBOX_BOX: 'password-check-box',
        },
    }

    static JS_CLASSES = {
        PROFILE: {
            ALL_INPUTS: 'profile-input',
            ALL_PASSWORD_INPUTS: 'profile-password-input',
            WRONG_INPUT: 'wrong-input',
            RIGHT_INPUT: 'right-input',
            WRONG_SPAN: 'wrong-span',
        },
        COMMON: {
            HIDDEN: 'hidden',
        },
    }

    /**
    Retrieves the profile nickname element from the DOM.
    @returns {Element} The profile nickname element. */
    getRrofileNicknameElement() {
        return document.querySelector(`#${View.ID.PROFILE.NICKNAME}`);
    }

    /**
    Retrieves the profile email element from the DOM.
    @returns {Element} The profile email element. */
    getRrofileEmailElement() {
        return document.querySelector(`#${View.ID.PROFILE.EMAIL}`);
    }

    /**
    Retrieves the profile password span element from the DOM.
    @returns {Element} The profile password span element. */
    getRrofilePasswordSpanElement() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_SPAN}`);
    }

    /**
    Retrieves the profile password element from the DOM.
    @returns {Element} The profile password element. */
    getRrofilePasswordElement() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD}`);
    }

    /**
    Retrieves the profile repeat password span element from the DOM.
    @returns {Element} The profile repeat password span element. */
    getRrofileRepeatPasswordSpanElement() {
        return document.querySelector(`#${View.ID.PROFILE.REPEAT_PASSWORD_SPAN}`);
    }

    /**
    Retrieves the profile repeat password element from the DOM.
    @returns {Element} The profile repeat password element. */
    getRrofileRepeatPasswordElement() {
        return document.querySelector(`#${View.ID.PROFILE.REPEAT_PASSWORD}`);
    }

    /**
    Returns the profile image URL element.
    @returns {Element} The profile image URL element. */
    getRrofileImageUrlElement() {
        return document.querySelector(`#${View.ID.PROFILE.IMAGE_URL}`);
    }

    /**
    Returns the button element to get a random URL.
    @returns {Element} The button element to get a random URL. */
    getRrofileGetRandomUrlButtonElement() {
        return document.querySelector(`#${View.ID.PROFILE.GET_RANDOM_URL_BUTTON}`);
    }

    /**
    Returns the name element of the profile.
    @returns {Element} The name element of the profile. */
    getRrofileNameElement() {
        return document.querySelector(`#${View.ID.PROFILE.NAME}`);
    }

    /**
    Returns the surname element of the profile.
    @returns {Element} The surname element of the profile. */
    getRrofileSurnameElement() {
        return document.querySelector(`#${View.ID.PROFILE.SURNAME}`);
    }

    /**
    Returns the birth date element of the profile.
    @returns {Element} The birth date element of the profile. */
    getRrofileBirthDateElement() {
        return document.querySelector(`#${View.ID.PROFILE.BIRTH_DATE}`);
    }

    /**
    Returns the 'About Me' element of the profile.
    @returns {Element} The 'About Me' element of the profile. */
    getRrofileAboutMeElement() {
        return document.querySelector(`#${View.ID.PROFILE.ABOUT_ME}`);
    }

    /**
    Returns the profile avatar element
    @returns {Element} The profile avatar element */
    getRrofileAvatarElement() {
        return document.querySelector(`#${View.ID.PROFILE.AVATAR}`);
    }

    /**
    Returns the password edit button element
    @returns {Element} The password edit button element */
    getPasswordEditButton() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_EDIT_BUTTON}`);
    }

    /**
    Returns the password edit checkbox part element
    @returns {Element} The password edit checkbox part element */
    getPasswordEditCheckboxPart() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_EDIT_CHECKBOX_PART}`);
    }

    /**
    Returns the password edit checkbox input element
    @returns {Element} The password edit checkbox input element */
    getPassworEditCheckBoxInputElement() {
        return document.querySelector(`#${View.ID.PROFILE.PASSWORD_EDIT_CHECKBOX_BOX}`);
    }

    /**
    Returns the profile edit button element
    @returns {Element} The profile edit button element */
    getRrofileEditButton() {
        return document.querySelector(`#${View.ID.PROFILE.EDIT_BUTTON}`);
    }

    /**
    Returns all profile input elements
    @returns {NodeList} All profile input elements */
    getRrofileInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.ALL_INPUTS}`);
    }

    /**
    Gets all password input elements within the profile section
    @returns {NodeList} - List of password input elements */
    getRrofilePasswordInputs() {
        return document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.ALL_PASSWORD_INPUTS}`);
    }

    /**
    Toggles the 'hidden' class of an element
    @param {Element} element - The element to toggle the class on */
    toggleClassHidden(element) {
        element.classList.toggle(View.JS_CLASSES.COMMON.HIDDEN);
    }

    /**
    Updates the source attribute of an image element
    @param {HTMLImageElement} image - The image element to update
    @param {string} src - The new source value */
    updateImageSrc(image, src) {
        image.setAttribute('src', src);
    }

    /**
    Adds the 'wrong-input' class to an element
    @param {Element} element - The element to add the class to */
    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    }

    /**
    Removes the 'wrong-input' class from an element
    @param {Element} element - The element to remove the class from */
    removeClassWrongInput(element) {
        element.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    }

    /**
    Adds the 'right-input' class to an element
    @param {Element} element - The element to add the class to */
    addClassRightInput(element) {
        element.classList.add(View.JS_CLASSES.PROFILE.RIGHT_INPUT);
    }

    /**
    Removes the 'right-input' class from an element
    @param {Element} element - The element to remove the class from */
    removeClassRightInput(element) {
        element.classList.remove(View.JS_CLASSES.PROFILE.RIGHT_INPUT);
    }

    /**
    Creates a new span element with a warning message and a specific class, and inserts it after a given element in the DOM.
    @param {Element} element - The element after which the warning span will be inserted.
    @param {string} message - The warning message to be displayed in the span element. */
    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.PROFILE.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    /**
    Removes the 'wrong input' class from all elements with that class in the DOM. */
    clearClassWrongInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
        });
    }

    /**
    Removes all span elements with the 'wrong span' class from the DOM. */
    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }

    /**
    Toggles the locked-input class of the specified inputs, excluding the second input.
    @param {Array<Element>} inputs - An array of input elements to toggle the class on. */
    toggleInputs(inputs) {
        inputs.forEach((input, index) => {
            if (index === 1) {
                return
            };
            input.classList.toggle('locked-input');
        });
    }

    /**
    Toggles the waiting-background class of the main element. */
    toggleClassWaitingBackgroundOfMain() {
        document.querySelector('.main').classList.toggle('waiting-background');
    }

    /**
    Translates the page content between English and Russian using data from a dictionary JSON file.
    */
    translatePage() {
        fetch('../dictionary.json')
            .then(response => response.json())
            .then(data => {
                i18next.init({
                    lng: 'ru',
                    debug: false,
                    resources: {
                        ru: {
                            translation: data
                        }
                    }
                });

                document.querySelector(`#header-link-home`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-moon`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-music`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#header-link-home-burger`).textContent = i18next.t('registered_header.home');
                document.querySelector(`#header-link-time-burger`).textContent = i18next.t('registered_header.time');
                document.querySelector(`#header-link-moon-burger`).textContent = i18next.t('registered_header.moon');
                document.querySelector(`#header-link-music-burger`).textContent = i18next.t('registered_header.music');
                document.querySelector(`#header-link-profile-burger`).textContent = i18next.t('registered_header.profile');
                document.querySelector(`#header-link-sign-out-burger`).textContent = i18next.t('registered_header.sign_out');

                document.querySelector(`#profile-nickname-span`).textContent = i18next.t('user.profile_nickname_span');
                document.querySelector(`#nickname-input`).placeholder = i18next.t('user.profile_nickname_placeholder');
                document.querySelector(`#password-span`).textContent = i18next.t('user.profile_password_span');
                document.querySelector(`#repeat-password-span`).textContent = i18next.t('user.repeat_password_span');
                document.querySelector(`#avatar-url-input`).placeholder = i18next.t('user.avatar_url_input');
                document.querySelector(`#password-edit-button`).textContent = i18next.t('user.password_edit_button');
                document.querySelector(`#show-password-span`).textContent = i18next.t('user.show_password_span');
                document.querySelector(`#get-random-url-button`).textContent = i18next.t('user.get_random_url_button');
                document.querySelector(`#profile-name-span`).textContent = i18next.t('user.profile_name_span');
                document.querySelector(`#name-input`).placeholder = i18next.t('user.profile_name_placeholder');
                document.querySelector(`#profile-surname-span`).textContent = i18next.t('user.profile_surname_span');
                document.querySelector(`#surname-input`).placeholder = i18next.t('user.profile_surname_placeholder');
                document.querySelector(`#profile-birth-date-span`).textContent = i18next.t('user.profile_birth_date_span');
                document.querySelector(`#datepicker`).placeholder = i18next.t('user.profile_birth_date_placeholder');
                document.querySelector(`#profile-about-me-span`).textContent = i18next.t('user.profile_about_me_span');
                document.querySelector(`#about-input`).placeholder = i18next.t('user.profile_about_me_placeholder');
                document.querySelector(`#profile-edit-button`).textContent = i18next.t('user.profile_edit_button');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }
}
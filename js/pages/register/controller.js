export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initFormListener();
    }

    _initFormListener() {
        const form = this.view.getRegistrerFormElement(),
            SubmitButton = this.view.getSubmitInputElement();

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            this.view.clearClassWrongInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const formData = new FormData(form);
            const formInfo = Object.fromEntries(formData);
            formInfo.role = 'user';

            if (!this._isFormValidationOkay()) {
                return;
            }

            const isNicknameInDb = this._getPromiseIsNicknameExist();

            const isEmailInDb = this._getPromiseIsEmailExist();

            Promise.all([isNicknameInDb, isEmailInDb])
                .then(data => {
                    if (!(data[0] || data[1])) {
                        this._initCodeFormListener(formInfo, SubmitButton);
                    }
                })
                .catch(error => {
                    this.view.createWrongSpanElement(SubmitButton, `Something go wrong... ${error}`);
                });
        });
    }

    _isFormValidationOkay() {
        const form = this.view.getRegistrerFormElement(),
            nicknameInput = this.view.getNicknameInputElement(),
            emailInput = this.view.getEmailInputElement(),
            passwordInput = this.view.getPasswordInputElement();

        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        let isValidationOkay = true;

        if (!this.model.isNicknameOkay(formInfo.nickname)) {
            this.view.addClassWrongInput(nicknameInput);
            this.view.createWrongSpanElement(nicknameInput, "Nickname must consist of 5-15 numbers/letters and can't start with a number");
            isValidationOkay = false;
        }
        if (!this.model.isEmailOkay(formInfo.email)) {
            this.view.addClassWrongInput(emailInput);
            this.view.createWrongSpanElement(emailInput, "Incorrect email");
            isValidationOkay = false;
        }
        if (!this.model.isPasswordOkay(formInfo.password)) {
            this.view.addClassWrongInput(passwordInput);
            this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
            isValidationOkay = false;
        }

        return isValidationOkay;
    }

    _getPromiseIsNicknameExist() {
        const form = this.view.getRegistrerFormElement(),
            nicknameInput = this.view.getNicknameInputElement();
        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        return this.model.isNicknameInDb(formInfo.nickname)
            .then(response => {
                if (!response.ok) {
                    this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.length) {
                    this.view.addClassWrongInput(nicknameInput);
                    this.view.createWrongSpanElement(nicknameInput, "That nickname is already used");
                    return true;
                }
                return false;
            })
    }

    _getPromiseIsEmailExist() {
        const form = this.view.getRegistrerFormElement(),
            emailInput = this.view.getEmailInputElement();

        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        return this.model.isEmailInDb(formInfo.email)
            .then(response => {
                if (!response.ok) {
                    this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data.length) {
                    this.view.addClassWrongInput(emailInput);
                    this.view.createWrongSpanElement(emailInput, "That email is already used");
                    return true;
                }
                return false;
            })
    }

    _initCodeFormListener(formInfo, SubmitButton) {
        const form = this.view.getCodeFormElement();
        const numberInputs = this.view.getCodeFormNumberInputs();
        const devMessage = this.view.getDevMessageElement();
        const devMessageCode = this.view.getDevMessageCodeElement();
        const verificationCode = this.model.generateRandomCode(6);

        form.classList.remove('hidden');

        form.addEventListener('mouseover', () => {
            devMessage.classList.remove('hidden');
        })

        devMessageCode.innerText = verificationCode;
        console.log(verificationCode);

        numberInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (input.value.length > 1) {
                    input.value = input.value.slice(1);
                }
                if (input.value.length >= 1 && index < numberInputs.length - 1) {
                    numberInputs[index + 1].focus();
                } else {
                    if (this._isVerificationCodeCorrect(numberInputs, verificationCode, form)) {

                        this.model.createJwt(formInfo);

                        const data = JSON.stringify(formInfo);

                        this.model.registerNewUser(data)
                            .then((response) => {
                                if (!response.ok) {
                                    this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
                                }
                                return true;
                            })
                            .then((response) => {
                                window.location.href = "./registered_home.html";
                            })
                            .catch((error) => {
                                this.view.createWrongSpanElement(SubmitButton, `Something go wrong... ${error}`);
                            });
                    };
                }
            });
        });
    }

    _isVerificationCodeCorrect(numberInputs, verificationCode, form) {
        this.view.clearClassWrongInputFromElements();
        this.view.clearClassWrongSpanFromElements();
        numberInputs.forEach((input, index) => {
            if (input.value !== verificationCode[index]) {
                this.view.addClassWrongInput(form);
                return;
            }
        });
        if (form.classList.contains('wrong-input')) {
            return false;
        } else {
            this.view.addClassRightInput(form);
            return true;
        }
    }
}
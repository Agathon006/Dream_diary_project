export default class Controller {
    constructor(view) {
        this.view = view;
    }

    init() {
        this._initReasonsSectionsButtonListener();
        this._initDoNotHaveDreamSectionsButtonListener();
    }

    _initReasonsSectionsButtonListener() {
        const button = this.view.getReasonsSectionsButtonElement(),
            doNotHaveDreamsBlockElement = this.view.getDoNotHaveDreamsBlockElement();

        button.addEventListener('click', () => {

            window.scrollTo({
                top: doNotHaveDreamsBlockElement.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth'
            });
        });
    }

    _initDoNotHaveDreamSectionsButtonListener() {
        const button = this.view.getDoNotHaveDreamSectionsButtonElement();

        button.addEventListener('click', () => {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}
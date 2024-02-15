export default class View {

    static ID = {
        SECTION: {
            SECTION: 'section',
        },
        BUTTONS: {
            USERS_BUTTON: 'users-button',
            RECORDS_BUTTON: 'records-button',
        },
        MODAL_WINDOW: {
            MODAL_WRAPPER: 'modal-wrapper',
        },
        PAGINATION: {
            BUTTON_PREV: 'pagination-switcher-button-prev',
            CURRENT_PAGE_NUMBER: 'current-page-number',
            BUTTON_NEXT: 'pagination-switcher-button-next',
        }
    }

    static JS_CLASSES = {
        PROFILE: {
            WRONG_INPUT: 'wrong-input',
            WRONG_SPAN: 'wrong-span',
        },
        RECORD: {
            TAGS: {
                CLOSE_BUTTON: 'close',
            },
        },
        COMMON: {
            HIDDEN: 'hidden',
            NOT_EXIST: 'not-exist',
            SELECTED: 'selected',
            LOCKED_INPUT: 'locked-input',
        },
    }

    getSectionElement() {
        return document.querySelector(`#${View.ID.SECTION.SECTION}`);
    }

    getUsersButtonElement() {
        return document.querySelector(`#${View.ID.BUTTONS.USERS_BUTTON}`);
    }

    getRecordsButtonElement() {
        return document.querySelector(`#${View.ID.BUTTONS.RECORDS_BUTTON}`);
    }

    getModalWrapperElement() {
        return document.querySelector(`#${View.ID.MODAL_WINDOW.MODAL_WRAPPER}`);
    }

    getAllTagsCloseButtons() {
        return document.querySelectorAll(`.${View.JS_CLASSES.RECORD.TAGS.CLOSE_BUTTON}`);
    }

    getButtonPrevElement() {
        return document.querySelector(`#${View.ID.PAGINATION.BUTTON_PREV}`);
    }

    getCurrentPageNumberElement() {
        return document.querySelector(`#${View.ID.PAGINATION.CURRENT_PAGE_NUMBER}`);
    }

    getButtonNextElement() {
        return document.querySelector(`#${View.ID.PAGINATION.BUTTON_NEXT}`);
    }

    toggleClassHidden(element) {
        element.classList.toggle(`${View.JS_CLASSES.COMMON.HIDDEN}`);
    }

    toggleClassNotExist(element) {
        element.classList.toggle(`${View.JS_CLASSES.COMMON.NOT_EXIST}`);
    }

    toggleClassSelected(element) {
        if (element.classList.contains(`${View.JS_CLASSES.COMMON.SELECTED}`)) {
            element.disabled = false;
            element.classList.remove(`${View.JS_CLASSES.COMMON.SELECTED}`);
        } else {
            element.disabled = true;
            element.classList.add(`${View.JS_CLASSES.COMMON.SELECTED}`);
        }
    }

    toggleInputs(inputs) {
        inputs.forEach((input, index) => {
            if (index === 1 || index === 3 || index === 10 || index === 11) {
                return;
            }
            input.classList.toggle(`${View.JS_CLASSES.COMMON.LOCKED_INPUT}`);
        });
    }

    addClassWrongInput(element) {
        element.classList.add(View.JS_CLASSES.PROFILE.WRONG_INPUT);
    }

    createWrongSpanElement(element, message) {
        let warningSpan = document.createElement('span');
        warningSpan.innerText = message;
        warningSpan.classList.add(View.JS_CLASSES.PROFILE.WRONG_SPAN);
        element.parentNode.insertBefore(warningSpan, element.nextSibling);
    }

    clearClassWrongInputFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_INPUT}`).forEach(item => {
            item.classList.remove(View.JS_CLASSES.PROFILE.WRONG_INPUT);
        });
    }

    clearClassWrongSpanFromElements() {
        document.querySelectorAll(`.${View.JS_CLASSES.PROFILE.WRONG_SPAN}`).forEach(item => {
            item.remove();
        });
    }

    displayPaginationPart(itemsNumber, pagesNumber, currentPageNumber = 1) {
        const section = this.getSectionElement();

        let dynamicContent = '';
        itemsNumber === 1 ? dynamicContent = 'item' : dynamicContent = 'items';

        section.innerHTML =
            `<div class="pagination-switcher">
            <button class="pagination-switcher__button" id="pagination-switcher-button-prev"><</button>
            <div class="pagination-switcher__plot">
                <div class="pagination-switcher__plot-top">
                    <span class="pagination-switcher__plot-text">Found: </span>
                    <span class="pagination-switcher__plot-key">${itemsNumber}</span>
                    <span class="pagination-switcher__plot-text"> ${dynamicContent}</span>
                </div>
                <div class="pagination-switcher__plot-bottom">
                    <span class="pagination-switcher__plot-text">Page </span>
                    <span class="pagination-switcher__plot-key" id="current-page-number">${currentPageNumber}</span>
                    <span class="pagination-switcher__plot-text"> of </span>
                    <span class="pagination-switcher__plot-key">${pagesNumber}</span>
                </div>
            </div>
            <button class="pagination-switcher__button" id="pagination-switcher-button-next">></button>
        </div>`
    }

    displayUsersTable(data) {
        const section = this.getSectionElement();

        let dynamicData = '';

        data.data.forEach(user => {

            dynamicData += `
                    <tr>
                        <td class="table-td">${user.id}</td>
                        <td class="table-td">${user.nickname}</td>
                        <td class="table-td">${user.email}</td>
                        <td class="table-td">${user.role}</td>
                        <td class="table-td">
                        <button class="admin-button edit-user-button">details</button>
                        </td>
                    </tr>
                `;
        });

        section.innerHTML += `
        <table class="table">
            <thead class="table-head">
            <tr class="table-tr">
                <th class="table-th">ID</th>
                <th class="table-th">Nickname</th>
                <th class="table-th">Email</th>
                <th class="table-th">Role</th>
                <th class="table-th">Action</th>
            </tr>
            </thead>
            <tbody id="users-table-body">${dynamicData}</tbody>
        </table>`;

    }

    displayRecordsTable(data) {
        const section = this.getSectionElement();

        let dynamicData = '';

        data.data.forEach(record => {

            dynamicData += `
                <tr>
                    <td class="table-td">${record.id}</td>
                    <td class="table-td">${record.dreamTitle}</td>
                    <td class="table-td">${record.email}</td>
                    <td class="table-td">
                    <button class="admin-button edit-record-button">details</button>
                    </td>
                </tr>
            `;
        });

        section.innerHTML += `
        <table class="table">
            <thead class="table-head">
            <tr class="table-tr">
                <th class="table-th">ID</th>
                <th class="table-th">Dream title</th>
                <th class="table-th">Email</th>
                <th class="table-th">Action</th>
            </tr>
            </thead>
            <tbody id="users-table-body">${dynamicData}</tbody>
        </table>`;

    }

    displayUser(section, user) {
        let dunamicContentRoles = '';
        if (user.role === 'user') {
            dunamicContentRoles = `
            <option value="admin">Admin</option>
            <option value="user" selected>User</option>
            `;
        } else if (user.role === 'admin') {
            dunamicContentRoles = `
            <option value="admin" selected>Admin</option>
            <option value="user">User</option>
            `;
        }

        section.innerHTML = `                
        <button class="admin-button" id="return-button">Return</button>
        <div class="profile-avatar">
            <img src="${user.avatar}" class="user-avatar"
                id="profile-avatar"></img> 
        </div>
        <input type="text" placeholder="no image url" class="profile-input locked-input"
        id="avatar-url-input" value="${user.avatar}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${user.id}">
        <span class="profile-span">Nickname</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="nickname-input" value="${user.nickname}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${user.email}">
        <span class="profile-span">Role</span>
        <select class="profile-input locked-input" id="role-input">${dunamicContentRoles}</select>
        <span class="profile-span">Name</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input" id="name-input" value="${user.name}">
        <span class="profile-span">Surname</span>
        <input type="text" placeholder="empty" maxlength="20" class="profile-input locked-input"
            id="surname-input" value="${user.surname}">
        <span class="profile-span">Birth date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${user.birthDate}">
        <span class="profile-span">About me</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="about-input">${user.profileInfo}</textarea>
        <div class="button-block">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>`;
    }

    displayRecord(section, record) {

        let dynamicRecordDate = '';
        let month = record.date.monthNumber,
            day = record.date.dayNumber;
        if (++record.date.monthNumber < 10) {
            month = `0${record.date.monthNumber}`
        }
        if (record.date.dayNumber < 10) {
            day = `0${record.date.dayNumber}`
        }
        dynamicRecordDate = `${month}/${day}/${record.date.year}`;

        let dynamicUsersEmailsLength = '';
        if (record.likesUsersEmails.length === 0) {
            dynamicUsersEmailsLength = `no emails`;
        } else if (record.likesUsersEmails.length === 1) {
            dynamicUsersEmailsLength = `${record.likesUsersEmails.length} email`;
        } else {
            dynamicUsersEmailsLength = `${record.likesUsersEmails.length} emails`;
        }

        let dunamicContentCategories = '';
        switch (record.dreamCategory) {
            case 'Usual':
                dunamicContentCategories = `
                <option value="Usual" selected>Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
                break;
            case 'Just talking':
                dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking" selected>Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
                break;
            case 'Nightmare':
                dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare" selected>Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
                break;
            case 'Action':
                dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action" selected>Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
                break;
            case 'Trash':
                dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash" selected>Trash</option>
                <option value="Conscious dream">Conscious dream</option>
                `;
                break;
            case 'Conscious dream':
                dunamicContentCategories = `
                <option value="Usual">Usual</option>
                <option value="Just talking">Just talking</option>
                <option value="Nightmare">Nightmare</option>
                <option value="Action">Action</option>
                <option value="Trash">Trash</option>
                <option value="Conscious dream" selected>Conscious dream</option>
                `;
                break;
        }

        let dunamicContentMoods = '';
        switch (record.dreamMood) {
            case 'Typical dream':
                dunamicContentMoods = `
                <option value="Typical dream" selected>Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
                break;
            case 'Fun dream':
                dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream" selected>Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
                break;
            case 'Sad dream':
                dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream" selected>Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
                break;
            case 'Terrible':
                dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible" selected>Terrible</option>
                <option value="Made me think">Made me think</option>
                `;
                break;
            case 'Made me think':
                dunamicContentMoods = `
                <option value="Typical dream">Typical dream</option>
                <option value="Fun dream">Fun dream</option>
                <option value="Sad dream">Sad dream</option>
                <option value="Terrible">Terrible</option>
                <option value="Made me think" selected>Made me think</option>
                `;
                break;
        }

        section.innerHTML = `                
        <button class="admin-button" id="return-button">Return</button>
        <div class="record-image">
            <img src="${record.dreamImageUrl}" class="record-image"
                id="record-image"></img> 
        </div>
        <input type="text" placeholder="no image url" maxlength="500" class="profile-input locked-input"
        id="record-url-input" value="${record.dreamImageUrl}">
        <span class="profile-span">ID</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="id-input" value="${record.id}">
        <span class="profile-span">Title</span>
        <input type="text" placeholder="empty" maxlength="15" class="profile-input locked-input"
            id="title-input" value="${record.dreamTitle}">
        <span class="profile-span">Email</span>
        <input type="text" placeholder="empty" class="profile-input locked-input" id="email-input" value="${record.email}">
        <span class="profile-span">Category</span>
        <select class="profile-input locked-input" id="category-input">${dunamicContentCategories}</select>
        <span class="profile-span">Mood</span>
        <select class="profile-input locked-input" id="moods-input">${dunamicContentMoods}</select>
        <span class="profile-span">Tags (1-5)</span>
        <textarea name="dreamTags" rows="2" placeholder="love milk, bread, my cheese" maxlength="250"
            class="profile-input locked-input" id="record-form-tags-input"></textarea>
        <div class="record-form__input-plot tags-container" id="record-form-tags-container"></div>
        <span class="profile-span">Plot</span>
        <textarea rows="4" placeholder="empty" maxlength="300"
            class="profile-input locked-input" id="plot-input" value="${record.dreamPlot}"></textarea>
        <span class="profile-span">Date</span>
        <input type="text" placeholder="empty" id="datepicker"
            class="datepicker profile-input locked-input" value="${dynamicRecordDate}">
        <span class="profile-span">Views</span>
        <input type="text" placeholder="empty" maxlength="50" id="views-input"
            class="datepicker profile-input locked-input" value="${record.views}">
        <span class="profile-span">Likes</span>
        <input type="text" placeholder="empty" id="likes-input"
            class="datepicker profile-input locked-input" value="${record.likes}">
        <span class="profile-span">Like user emails</span>
        <input type="text" placeholder="empty" id="likes-user-emails-input"
            class="datepicker profile-input locked-input" value="${dynamicUsersEmailsLength}">
        <div class="button-block">
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        </div>`;

        for (let tag of record.dreamTags) {
            $('#record-form-tags-container').append('<span class="badge badge-primary mr-1">' + tag + ' <button class="close" type="button" aria-label="Close"><span aria-hidden="true">&times;</span></button></span>');
        }
    }
}
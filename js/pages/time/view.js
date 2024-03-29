/**
 * time page view module.
 * @module js/pages/time/view
 */

import i18next from 'i18next';

export default class View {

    static ID = {
        HOUR_CONTAINERS: {
            CURRENT: 'hour-container-current',
            NEW_YORK: 'hour-container-new-york',
            LONDON: 'hour-container-london',
            TOKYO: 'hour-container-tokyo',
            BERLIN: 'hour-container-berlin',
            CHINA: 'hour-container-china',
            SYDNEY: 'hour-container-sydney',
            CALIFORNIA: 'hour-container-california',
            INDIA: 'hour-container-india',
        },
        MINUTE_CONTAINERS: {
            CURRENT: 'minute-container-current',
            NEW_YORK: 'minute-container-new-york',
            LONDON: 'minute-container-london',
            TOKYO: 'minute-container-tokyo',
            BERLIN: 'minute-container-berlin',
            CHINA: 'minute-container-china',
            SYDNEY: 'minute-container-sydney',
            CALIFORNIA: 'minute-container-california',
            INDIA: 'minute-container-india',
        },
        SECOND_CONTAINERS: {
            CURRENT: 'second-container-current',
            CURRENT_SMALL: 'second-container-current-small',
            NEW_YORK: 'second-container-new-york',
            LONDON: 'second-container-london',
            TOKYO: 'second-container-tokyo',
            BERLIN: 'second-container-berlin',
            CHINA: 'second-container-china',
            SYDNEY: 'second-container-sydney',
            CALIFORNIA: 'second-container-california',
            INDIA: 'second-container-india',
        },
        SUBTITLES: {
            CURRENT: 'subtitle-current',
            NEW_YORK: 'subtitle-new-york',
            LONDON: 'subtitle-london',
            TOKYO: 'subtitle-tokyo',
            BERLIN: 'subtitle-berlin',
            CHINA: 'subtitle-china',
            SYDNEY: 'subtitle-sydney',
            CALIFORNIA: 'subtitle-california',
            INDIA: 'subtitle-india',
        },
    }

    /**
    Get the hour container element by name
    @param {string} name - The name of the container
    @returns {Element} - The hour container element */
    getHourContainer(name) {
        return document.querySelector(`#${View.ID.HOUR_CONTAINERS[name]}`);
    }

    /**
    Get the minute container element by name
    @param {string} name - The name of the container
    @returns {Element} - The minute container element */
    getMinuteContainer(name) {
        return document.querySelector(`#${View.ID.MINUTE_CONTAINERS[name]}`);
    }

    /**
    Get the second container element by name
    @param {string} name - The name of the container
    @returns {Element} - The second container element */
    getSecondContainer(name) {
        return document.querySelector(`#${View.ID.SECOND_CONTAINERS[name]}`);
    }

    /**
    Get the subtitle element by name
    @param {string} name - The name of the subtitle
    @returns {Element} - The subtitle element */
    getSubtitle(name) {
        return document.querySelector(`#${View.ID.SUBTITLES[name]}`);
    }

    /**
    Transform the current clock hands based on the current time
    @param {number} hours - The current hours
    @param {number} minutes - The current minutes
    @param {number} seconds - The current seconds */
    transformCurrentClock(hours, minutes, seconds) {
        this.getSecondContainer('CURRENT').style.transform = `rotate(${6 * seconds}deg)`;
        this.getSecondContainer('CURRENT_SMALL').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CURRENT').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CURRENT').style.transform = `rotate(${30 * hours + 0.5 * minutes}deg)`;
    }

    /**
    Transforms the current subtitle based on the current date and options.
    @param {Date} currentDate - The current date.
    @param {Object} options - Optional parameters for formatting the date. */
    transformCurrentSubtitle(currentDate, options) {
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('CURRENT').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options));
        } else {
            this.getSubtitle('CURRENT').textContent = currentDate.toLocaleString('en-US', options);
        }
    }

    /**
    Transforms the New York clock based on the given hours, minutes, and seconds.
    @param {number} hours - The hours for the clock.
    @param {number} minutes - The minutes for the clock.
    @param {number} seconds - The seconds for the clock. */
    transformNewYorkClock(hours, minutes, seconds) {
        this.getSecondContainer('NEW_YORK').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('NEW_YORK').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('NEW_YORK').style.transform = `rotate(${30 * hours + 0.5 * minutes - 240}deg)`;
    }

    /**
    Transforms the subtitle for New York based on the current date and options
    @param {Date} currentDate - The current date and time
    @param {Object} options - Options for formatting the date */
    transformNewYorkSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() - 8);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('NEW_YORK').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("-5");
        } else {
            this.getSubtitle('NEW_YORK').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-5");
        }
    }

    /**
    Transforms the clock for London based on the hours, minutes, and seconds
    @param {number} hours - The current hour
    @param {number} minutes - The current minute
    @param {number} seconds - The current second */
    transformLondonClock(hours, minutes, seconds) {
        this.getSecondContainer('LONDON').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('LONDON').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('LONDON').style.transform = `rotate(${30 * hours + 0.5 * minutes - 90}deg)`;
    }

    /**
    Transforms the subtitle for London based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformLondonSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 5);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('LONDON').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat(" -");
        } else {
            this.getSubtitle('LONDON').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat(" -");
        }
    }

    /**
    Transforms the clock for Tokyo based on the hours, minutes, and seconds
    @param {number} hours - The hours for the Tokyo clock
    @param {number} minutes - The minutes for the Tokyo clock
    @param {number} seconds - The seconds for the Tokyo clock */
    transformTokyoClock(hours, minutes, seconds) {
        this.getSecondContainer('TOKYO').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('TOKYO').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('TOKYO').style.transform = `rotate(${30 * hours + 0.5 * minutes - 180}deg)`;
    }

    /**
    Transforms the subtitle for Tokyo based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformTokyoSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 9);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('TOKYO').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+9");
        } else {
            this.getSubtitle('TOKYO').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+9");
        }
    }

    /**
    Transforms the clock for Berlin based on the hours, minutes, and seconds
    @param {number} hours - The hours for the Tokyo clock
    @param {number} minutes - The minutes for the Tokyo clock
    @param {number} seconds - The seconds for the Tokyo clock */
    transformBerlinClock(hours, minutes, seconds) {
        this.getSecondContainer('BERLIN').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('BERLIN').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('BERLIN').style.transform = `rotate(${30 * hours + 0.5 * minutes - 60}deg)`;
    }

    /**
    Transforms the subtitle for Berlin based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformBerlinSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() - 8);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('BERLIN').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+1");
        } else {
            this.getSubtitle('BERLIN').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+1");
        }
    }

    /**
    Transforms the clock for China based on the hours, minutes, and seconds
    @param {number} hours - The hours for the Tokyo clock
    @param {number} minutes - The minutes for the Tokyo clock
    @param {number} seconds - The seconds for the Tokyo clock */
    transformChinaClock(hours, minutes, seconds) {
        this.getSecondContainer('CHINA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CHINA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CHINA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 210}deg)`;
    }

    /**
    Transforms the subtitle for China based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformChinaSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 7);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('CHINA').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+8");
        } else {
            this.getSubtitle('CHINA').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+8");
        }
    }

    /**
    Transforms the clock for Sydney based on the hours, minutes, and seconds
    @param {number} hours - The hours for the Tokyo clock
    @param {number} minutes - The minutes for the Tokyo clock
    @param {number} seconds - The seconds for the Tokyo clock */
    transformSydneyClock(hours, minutes, seconds) {
        this.getSecondContainer('SYDNEY').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('SYDNEY').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('SYDNEY').style.transform = `rotate(${30 * hours + 0.5 * minutes - 120}deg)`;
    }

    /**
    Transforms the subtitle for Sydney based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformSydneySubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 3);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('SYDNEY').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+11");
        } else {
            this.getSubtitle('SYDNEY').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+11");
        }
    }

    /**
    Transforms the clock for California based on the hours, minutes, and seconds
    @param {number} hours - The hours for the Tokyo clock
    @param {number} minutes - The minutes for the Tokyo clock
    @param {number} seconds - The seconds for the Tokyo clock */
    transformCaliforniaClock(hours, minutes, seconds) {
        this.getSecondContainer('CALIFORNIA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('CALIFORNIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds}deg)`;
        this.getHourContainer('CALIFORNIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 330}deg)`;
    }

    /**
    Transforms the subtitle for California based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformCaliforniaSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() + 5);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('CALIFORNIA').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("-8");
        } else {
            this.getSubtitle('CALIFORNIA').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("-8");
        }
    }

    /**
    Transforms the clock for India based on the hours, minutes, and seconds
    @param {number} hours - The hours for the Tokyo clock
    @param {number} minutes - The minutes for the Tokyo clock
    @param {number} seconds - The seconds for the Tokyo clock */
    transformIndiaClock(hours, minutes, seconds) {
        this.getSecondContainer('INDIA').style.transform = `rotate(${6 * seconds}deg)`;
        this.getMinuteContainer('INDIA').style.transform = `rotate(${6 * minutes + 0.1 * seconds + 180}deg)`;
        this.getHourContainer('INDIA').style.transform = `rotate(${30 * hours + 0.5 * minutes - 285}deg)`;
    }

    /**
    Transforms the subtitle for India based on the current date and specified options
    @param {Date} currentDate - The current date and time
    @param {Object} options - The options for formatting the date */
    transformIndiaSubtitle(currentDate, options) {
        currentDate.setHours(currentDate.getHours() - 11);
        currentDate.setMinutes(currentDate.getMinutes() + 30);
        if (localStorage.getItem('language') === 'ru') {
            this.getSubtitle('INDIA').textContent = this.defineRuMonth(currentDate.toLocaleString('en-US', options)).slice(0, -2).concat("+5:30");
        } else {
            this.getSubtitle('INDIA').textContent = currentDate.toLocaleString('en-US', options).slice(0, -2).concat("+5:30");
        }
    }

    /**
    Converts a 3-letter month abbreviation in English to a Russian equivalent.
    @param {string} date - A date string in the format 'Mon DD YYYY'.
    @returns {string} - The Russian equivalent of the month abbreviation. */
    defineRuMonth(date) {
        const month = date.substring(0, 3);
        switch (month) {
            case 'Jan':
                return 'Янв' + date.substring(3);
            case 'Feb':
                return 'Фев' + date.substring(3);
            case 'Mar':
                return 'Мар' + date.substring(3);
            case 'Apr':
                return 'Апр' + date.substring(3);
            case 'May':
                return 'Май' + date.substring(3);
            case 'Jun':
                return 'Июн' + date.substring(3);
            case 'Jul':
                return 'Июл' + date.substring(3);
            case 'Aug':
                return 'Авг' + date.substring(3);
            case 'Sep':
                return 'Сен' + date.substring(3);
            case 'Oct':
                return 'Окт' + date.substring(3);
            case 'Nov':
                return 'Ноя' + date.substring(3);
            case 'Dec':
                return 'Дек' + date.substring(3);
            default:
                return '???';
        }
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

                document.querySelector(`#title`).textContent = i18next.t('time.title');
                document.querySelector(`#new-york-span`).textContent = i18next.t('time.new_york_span');
                document.querySelector(`#london-span`).textContent = i18next.t('time.london_span');
                document.querySelector(`#tokyo-span`).textContent = i18next.t('time.tokyo_span');
                document.querySelector(`#berlin-span`).textContent = i18next.t('time.berlin_span');
                document.querySelector(`#china-span`).textContent = i18next.t('time.china_span');
                document.querySelector(`#sydney-span`).textContent = i18next.t('time.sydney_span');
                document.querySelector(`#california-span`).textContent = i18next.t('time.california_span');
                document.querySelector(`#india-span`).textContent = i18next.t('time.india_span');

                document.querySelector(`#footer-plot`).textContent = i18next.t('footer.footer_plot');
            })
            .catch(error => {
                console.error('Error loading JSON file:', error);
            });
    }

}
/**
 * moon page controller module.
 * @module js/pages/moon/controller
 */

import { Date } from "core-js";

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
        this._initMyPlaceButton()
        this._initCurrentForecast()
        this._initMoonphases()
        this._initCurrentMoonPhaseBorder()
    }

    /**
    Initializes the translation based on the user's selected language.
    Calls the view's translatePage method if language is set to 'ru'.
    @function _initTranslation */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
    Initializes the listener for the burger button.
    Toggles the visibility of the burger content based on user interactions.
    @function _initBurgerButtonListener */
    _initBurgerButtonListener() {
        document.querySelector('.body').addEventListener('click', (event) => {
            if (event.target.id === 'burger-button' || event.target.parentNode.id === 'burger-button') {
                document.querySelector('#burger-content').classList.remove('not-exist');
            }
            else if (!event.target.closest('.burger-content-wrapper')) {
                document.querySelector('#burger-content').classList.add('not-exist');
            }
        });
    }

    /**
    Initializes the "My Place" button functionality.
    Gets the element for the "My Place" button and adds a click event listener.
    Upon clicking the button, it toggles classes for waiting background of forecast day elements,
    retrieves the user's current geolocation using the navigator.geolocation.getCurrentPosition method,
    and fetches the weather forecast data for the current location.
    Upon successful retrieval, it displays the forecast data for the current location in the UI.
    */
    _initMyPlaceButton() {

        const myPlaceButton = this.view.getMyPlaceButtonElement();

        myPlaceButton.addEventListener('click', () => {
            this.view.toggleClassesWaitingBackgroundOfForecastDayElements();

            navigator.geolocation.getCurrentPosition((position) => {
                this.model.getWeatherForecastForCurrentLocation(position.coords.latitude, position.coords.longitude)
                    .then(response => response.json())
                    .then(data => {
                        this.view.toggleClassHidden(myPlaceButton);

                        const forecastContainer = this.view.getForecastContainerElement(),
                            forecastPlace = this.view.getForecastPlaceElement();

                        if (localStorage.getItem('language') === 'ru') {
                            forecastPlace.innerText = `Место: ${data.city.name}`;
                        } else {
                            forecastPlace.innerText = `Place: ${data.city.name}`;
                        }

                        let firstNewDayWeatherIndex = 0;

                        for (let threeHoursForecast of data.list) {
                            if (threeHoursForecast.dt_txt.includes('00:00:00')) {
                                break;
                            }
                            firstNewDayWeatherIndex++;
                        }

                        for (let i = 0; i < 5; i++) {
                            let j = i * 8 + firstNewDayWeatherIndex;
                            forecastContainer.children[i].children[0].innerText = data.list[j].dt_txt;
                            forecastContainer.children[i].children[1].src = `./../icons/moon/${data.list[j].weather[0].icon}.png`;
                            if (localStorage.getItem('language') === 'ru') {
                                forecastContainer.children[i].children[2].innerText = this._defineRuWeather(data.list[j].weather[0].main);
                            } else {
                                forecastContainer.children[i].children[2].innerText = data.list[j].weather[0].main;
                            }
                            forecastContainer.children[i].children[3].children[1].innerText = `${data.list[j].clouds.all}%`;
                            this.view.whichColorForCloudCover(forecastContainer.children[i].children[3].children[1], data.list[j].clouds.all, forecastContainer.children[i].children[4]);
                        };
                        this.view.toggleClassesWaitingBackgroundOfForecastDayElements();
                    })
                    .catch(error => {
                        console.log('Error getting data from weather API: ', error)
                    });
            });
        });
    }

    /**
    Initializes the current weather forecast for Minsk by fetching data from the weather API
    and updating the forecast container with the forecast place information. */
    _initCurrentForecast() {

        this.model.getWeatherForecastMinsk()
            .then(response => response.json())
            .then(data => {
                const forecastContainer = this.view.getForecastContainerElement(),
                    forecastPlace = this.view.getForecastPlaceElement();

                if (localStorage.getItem('language') === 'ru') {
                    forecastPlace.innerText = `Место: ${data.city.name}`;
                } else {
                    forecastPlace.innerText = `Place: ${data.city.name}`;
                }

                let firstNewDayWeatherIndex = 0;

                for (let threeHoursForecast of data.list) {
                    if (threeHoursForecast.dt_txt.includes('00:00:00')) {
                        break;
                    }
                    firstNewDayWeatherIndex++;
                }

                for (let i = 0; i < 5; i++) {
                    let j = i * 8 + firstNewDayWeatherIndex;
                    forecastContainer.children[i].children[0].innerText = data.list[j].dt_txt;
                    forecastContainer.children[i].children[1].src = `./../icons/moon/${data.list[j].weather[0].icon}.png`;
                    if (localStorage.getItem('language') === 'ru') {
                        forecastContainer.children[i].children[2].innerText = this._defineRuWeather(data.list[j].weather[0].main);
                    } else {
                        forecastContainer.children[i].children[2].innerText = data.list[j].weather[0].main;
                    }
                    forecastContainer.children[i].children[3].children[1].innerText = `${data.list[j].clouds.all}%`;
                    this.view.whichColorForCloudCover(forecastContainer.children[i].children[3].children[1], data.list[j].clouds.all, forecastContainer.children[i].children[4]);
                };
                this.view.toggleClassesWaitingBackgroundOfForecastDayElements();
            })
            .catch(error => {
                console.log('Error getting data from weather API: ', error)
            });
    }

    /**
    Translate weather conditions from English to Russian.
    @param {string} weatherCondition - The weather condition in English.
    @returns {string} The corresponding weather condition in Russian. */
    _defineRuWeather(weatherCondition) {
        switch (weatherCondition) {
            case 'Clear':
                return 'Ясно';
            case 'Clouds':
                return 'Облачно';
            case 'Rain':
                return 'Дождь';
            case 'Snow':
                return 'Снег';
            case 'Thunderstorm':
                return 'Гроза';
            case 'Drizzle':
                return 'Морось';
            case 'Fog':
                return 'Туман';
            case 'Mist':
                return 'Мгла';
            case 'Haze':
                return 'Мгла';
            default:
                return 'Неизвестно';
        }
    }

    /**
    Initializes the moon phases by getting the necessary date elements and displaying the current and next moon phases.
    */
    _initMoonphases() {
        const newMoonDate = this.view.getNewMoonDateSpanElement(),
            growingMoonDate = this.view.getGrowingMoonDateSpanElement(),
            fullMoonDate = this.view.getFullMoonDateSpanElement(),
            waningMoonDate = this.view.getWaningDateSpanElement(),
            nextNewMoonDate = this.view.getNextNewMoonDateSpanElement(),
            nextGrowingMoonDate = this.view.getNextGrowingMoonDateSpanElement(),
            nextFullMoonDate = this.view.getNextFullMoonDateSpanElement(),
            nextWaningMoonDate = this.view.getNextWaningDateSpanElement();

        newMoonDate.innerText = this._calculateMoonPhase(0);
        fullMoonDate.innerText = this._calculateMoonPhase(0.5);
        growingMoonDate.innerText = `${this._changeOneDay(newMoonDate.innerText, 'increase')} - ${this._changeOneDay(fullMoonDate.innerText, 'reduce')}`
        waningMoonDate.innerText = `${this._changeOneDay(fullMoonDate.innerText, 'increase')} - ${this._calculateMoonPhase(1)}`

        nextNewMoonDate.innerText = this._calculateMoonPhase(0, true);
        nextFullMoonDate.innerText = this._calculateMoonPhase(0.5, true);
        nextGrowingMoonDate.innerText = `${this._changeOneDay(nextNewMoonDate.innerText, 'increase')} - ${this._changeOneDay(nextFullMoonDate.innerText, 'reduce')}`
        nextWaningMoonDate.innerText = `${this._changeOneDay(nextFullMoonDate.innerText, 'increase')} - ${this._calculateMoonPhase(1, true)}`
    }

    /**
    Calculate the date of the next or previous moon phase based on the given phase ratio.
    @param {number} phaseRatio - The ratio of the phase cycle completed (between 0 and 1).
    @param {boolean} next - True if calculating the next phase, false if calculating the previous phase.
    @returns {Date} The date of the next or previous moon phase. */
    _calculateMoonPhase(phaseRatio, next = false) {
        const synodicMonth = 29.53058867,
            newMoonDateLandmark = new Date('January 11, 2024 14:57:00'),
            currentDate = new Date();

        const daysSinceNewMoon = ((currentDate - newMoonDateLandmark) / (24 * 60 * 60 * 1000)) % synodicMonth,
            phaseDays = phaseRatio * synodicMonth;

        const daysToNextPhase = (synodicMonth - daysSinceNewMoon) + phaseDays,
            nextPhaseDate = new Date(currentDate);

        if (next) {
            nextPhaseDate.setDate(currentDate.getDate() + daysToNextPhase);
        } else {
            nextPhaseDate.setDate(currentDate.getDate() + daysToNextPhase - synodicMonth);
        }

        return this._handleDateToCommon(nextPhaseDate);
    }

    /**
    Changes the date by one day based on the given action.
    @param {string} dateString - The date string in the format "day.month.year".
    @param {string} action - The action to perform on the date. Can be 'increase' or 'reduce'.
    @returns {string} The updated date string after changing by one day.
    */
    _changeOneDay(dateString, action) {
        const parts = dateString.split('.');

        const day = parseInt(parts[0], 10),
            month = parseInt(parts[1], 10) - 1,
            year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);

        if (action === 'increase') {
            date.setDate(date.getDate() + 1);
        } else if (action === 'reduce') {
            date.setDate(date.getDate() - 1);
        }

        const nextDate = this._handleDateToCommon(date);

        return nextDate;
    }

    /**
    Initializes the current moon phase border based on the target date.
    */
    _initCurrentMoonPhaseBorder() {

        const targetDate = this._handleDateToCommon(new Date());

        const spans = this.view.getCurrentMoonPhaseDateSpansElements();

        spans.forEach(span => {
            const dates = span.innerText.split(' - ');

            if (dates.length === 2) {
                const startDate = new Date(this._handleDateToValid(dates[0])),
                    endDate = new Date(this._handleDateToValid(dates[1])),
                    targetDateObj = new Date(this._handleDateToValid(targetDate));

                if (targetDateObj >= startDate && targetDateObj <= endDate) {
                    span.style.fontWeight = '900';
                    span.parentElement.style.border = '2px solid black';
                    span.parentElement.children[1].style.fontWeight = '900';
                }
            } else {
                if (targetDate === dates[0]) {
                    span.style.fontWeight = '900';
                    span.parentElement.style.border = '2px solid black';
                    span.parentElement.children[1].style.fontWeight = '900';
                }
            }
        });
    }

    /**
    Format date in common format (dd.mm.yyyy)
    @param {Date} date - Date object to be formatted
    @returns {string} - Formatted date in common format
    */
    _handleDateToCommon(date) {
        const day = date.getDate().toString().padStart(2, '0'),
            month = (date.getMonth() + 1).toString().padStart(2, '0'),
            year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }

    /**
    Format date in valid format (yyyy-mm-dd)
    @param {string} date - Date string in common format (dd.mm.yyyy)
    @returns {string} - Formatted date in valid format */
    _handleDateToValid(date) {
        const parts = date.split('.');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        return formattedDate;
    }
}
const nav = document.querySelector('.nav');
const form = document.querySelector('.form');
const formInput = document.querySelector('.form__input');
const formBtn = document.querySelector('.form__button');

const section = document.querySelector('.section');
const sectionBtn = document.querySelector('.section__button');

const focusInput = () => formInput.focus();
const hideNav = () => {
    nav.style.transform = "translateX(-100%)";
    section.style.transform = "translateX(0%)";
    formInput.setAttribute('readonly', true);
}
const hideSection = () => {
    nav.style.transform = "translateX(0)";
    section.style.transform = "translateX(100%)";
    formInput.removeAttribute('readonly');
    focusInput();
}
const takeDataFromApi = async (country) => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`);
    if (!response.ok) {
        throw new Error('Failed to fetch data from the API.');
    }
    const data = await response.json();
    return data;
}

const dataFromApiToHtml = (apiResponse) => {
    const language = Object.values(apiResponse[0].languages)[0];
    const currency = Object.values(apiResponse[0].currencies)[0];
    document.querySelector('.section__header').innerText = `${apiResponse[0].name.common}`;
    document.querySelector('.section__text--official').innerText = `${apiResponse[0].name.official}`;
    document.querySelector('.section__img--flag').src = `${apiResponse[0].flags.svg}`;
    document.querySelector('.section__img--flag').alt = `${apiResponse[0].flags.alt}`;
    document.querySelector('.section__img--coatOfArms').src = `${apiResponse[0].coatOfArms.svg}`;
    document.querySelector('.section__text--capital').innerHTML = `<span class="section__span">Capital:</span> ${apiResponse[0].capital[0]}`;
    document.querySelector('.section__text--language').innerHTML = `<span class="section__span">Language:</span> ${language}`;
    document.querySelector('.section__text--continent').innerHTML = `<span class="section__span">Continent:</span> ${apiResponse[0].continents[0]}`;
    document.querySelector('.section__text--currency').innerHTML = `<span class="section__span">Currency:</span> ${currency.name}(${currency.symbol})`;

}
const importCountryData = async function (country) {
    try {
        const response = await takeDataFromApi(country);
        dataFromApiToHtml(response);
        hideNav();
    } catch (err) {
        console.error(err);
    }
}
window.addEventListener('load', () => {
    focusInput();
})
formInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        formBtn.click();
    }
});
formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
        return form.reportValidity();
    }
    importCountryData(formInput.value);
});
sectionBtn.addEventListener('click', () => {
    hideSection();
});
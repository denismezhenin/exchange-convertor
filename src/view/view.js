import { access_key, API, endpoint } from "../constants/constants.js";
import { currencies } from "../constants/currencies.js";
import { currencyFrom, currencyTo } from "../controller/controllers.js";
import { state } from "../state/state.js";

const formSelects = document.querySelectorAll(".form__select");
const errorElement = document.querySelector(".form__error-message");
const fromCurrencyTextElement = document.querySelector(
  ".currency__text__name-from"
);
const toCurrencyTextElement = document.querySelector(
  ".currency__text__name-to"
);
const fromCurrencyAmountElement = document.querySelector(
  ".currency__text__amount-from"
);
const toCurrencyAmountElement = document.querySelector(
  ".currency__text__amount-to"
);
const currencyRatioWrapper = document.querySelector(
  ".form__currency__ratio-wrapper"
);

export const setView = async () => {
  try {
    const data = await fetch(
      `${API}${endpoint}?access_key=${access_key}&format=1`
    );
    const result = await data.json();
    addCurrencyOptions(result.rates);
  } catch (e) {
    showError(e.message);
  }
};

const addCurrencyOptions = (currenciesObj) => {
  const currenciesArray = Object.keys(currenciesObj);
  const fragment = document.createDocumentFragment();
  currenciesArray.forEach((el) => {
    if (currencies[el]) {
      const option = document.createElement("option");
      option.value = el;
      option.textContent = currencies[el];
      fragment.append(option);
    }
  });
  const copyFragment = fragment.cloneNode(true);
  formSelects[0].append(fragment);
  formSelects[1].append(copyFragment);
};

export const showError = (message) => {
  errorElement.textContent = message;
  errorElement.style.visibility = "visible";
};

export const hideError = () => {
  errorElement.style.visibility = "hidden";
};

export const displayExchangeRatio = () => {
  toCurrencyAmountElement.textContent = state.ratio;
  currencyRatioWrapper.style.visibility = "visible";
  fromCurrencyTextElement.textContent = currencies[currencyFrom.value];
  toCurrencyTextElement.textContent = currencies[currencyTo.value];
};

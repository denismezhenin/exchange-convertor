import { access_key, API, endpoint } from "../constants/constants.js"
import { state } from "../state/state.js"

const currencyFrom = document.querySelector('.form__fromCurrency__select')
const currencyTo = document.querySelector('.form__toCurrency__select')
const currencyFromInput = document.querySelector('.form__fromCurrency__input')
const currencyToInput = document.querySelector('.form__toCurrency__input')

export const getRatesForSelectedCurrencies = async () => {
  try {
    const data = await fetch(`${API}${endpoint}?access_key=${access_key}&symbols=${currencyFrom.value},${currencyTo.value}&format=1`)
    const result = await data.json()
    state.fromCurrencyRate = result.rates[currencyFrom.value]
    state.toCurrencyRate = result.rates[currencyTo.value]
    if (state.inputType) {
      setCalculatedExchangeResult(state.inputType)
    }
  } catch (e) {
    showError(e.message)
  }

}

export const setCalculatedExchangeResult = (type) => {
  state.inputType = type
  if (state.fromCurrencyRate && state.toCurrencyRate) { 
    type === "from" ? setToCurrency() : setFromCurrency()  
  }
}

const setToCurrency = () => {
    const result = (currencyFromInput.value / (state.fromCurrencyRate / state.toCurrencyRate)).toFixed(2)
    currencyToInput.value = result
}

const setFromCurrency = () => {
    const result = (currencyToInput.value * (state.fromCurrencyRate / state.toCurrencyRate)).toFixed(2)
    currencyFromInput.value = result
}

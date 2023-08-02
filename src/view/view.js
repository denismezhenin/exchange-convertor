import { access_key, API, endpoint } from "../constants/constants.js"
import { currencies } from "../constants/currencies.js"

const formSelects = document.querySelectorAll('.form__select')
const errorElement = document.querySelector('.form__error-message')

export const setView = async () => {
  try {
    const data = await fetch(`${API}${endpoint}?access_key=${access_key}&format=1`)
    const result = await data.json()
    addCurrencyOptions(result.rates)
  } catch(e) {
    showError(e.message)
  }

}

const addCurrencyOptions = (currenciesObj) =>  {
  const currenciesArray = Object.keys(currenciesObj)
  const fragment = document.createDocumentFragment();
  currenciesArray.forEach((el) => {
    if (currencies[el]) {
      const option = document.createElement('option')
      option.value = el
      option.innerText = currencies[el]
      fragment.append(option)
    } 
  })
  const copyFragment = fragment.cloneNode(true)
  formSelects[0].append(fragment)
  formSelects[1].append(copyFragment)
}

export const showError = (message) => {
  errorElement.innerText = message
  errorElement.style.visibility = "visible"
}
import {
  getRatesForSelectedCurrencies,
  setCalculatedExchangeResult,
} from "../controller/controllers.js";
import { setView } from "../view/view.js";

export const app = async () => {
  await setView();
  document
    .querySelectorAll(".form__select")
    .forEach((el) =>
      el.addEventListener("change", getRatesForSelectedCurrencies)
    );
  document
    .querySelectorAll(".form__input")
    .forEach((el) =>
      el.addEventListener("input", (e) =>
        setCalculatedExchangeResult(e.target.dataset.type)
      )
    );
};

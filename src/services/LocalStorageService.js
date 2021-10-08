/**
 * @author Programerika
 */

export class LocalStorageService {
  constructor() {}

  setItemToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  getItemFromLocalStorage = (key) => {
    return localStorage.getItem(key);
  };

  removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
}

/**
 * @author Programerika
 */

export class StorageService {
  constructor() {}

  setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  getItem = (key) => {
    return localStorage.getItem(key);
  };

  removeItem = (key) => {
    localStorage.removeItem(key);
  };

  isStorageEmpty = () => {
    if(localStorage.getItem("username")==null){
      return true;
    }else{
      return false;
    }
  }
}

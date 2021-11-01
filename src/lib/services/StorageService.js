/**
 * @author Programerika
 */

export class StorageService {

  setItem = (key, value) => {
    localStorage.setItem(key, value);
  };

  getItem = (key) => {
    return localStorage.getItem(key);
  };

  removeItem = (key) => {
    localStorage.removeItem(key);
  };

  isItemInStorageEmpty = (item) => {
    if(localStorage.getItem(item)==null){
      return true;
    }else{
      return false;
    }
  }
}

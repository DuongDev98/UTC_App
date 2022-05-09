import AsyncStorage from '@react-native-async-storage/async-storage';
import Contants from './Contants';
class Memory {

  //clear
  static async ClearData() {
    AsyncStorage.clear();
  }
  
  //userinfo
  static async GetUserInfo() {
    let json = await AsyncStorage.getItem(Contants.User);
    return JSON.parse(json);
  }

  static async SetUserInfo(o, callBack = null) {
    await AsyncStorage.setItem(Contants.User, JSON.stringify(o));
    if (callBack != null) callBack;
  }

  //id mặt hàng, tên mặt hàng, Số lượng, đơn giá
  static async IncreToCart(o) {
    let arr = await this.GetCartItem();
    let hasItem = false;
    if (arr == null) arr = [];
    arr.forEach((element, index) => {
      if (element.DMATHANGID == o.DMATHANGID) {
        hasItem = true;
        element.SOLUONG += 1;
      }
    });
    if (!hasItem) {
      arr.push(o);
    }
    this.SetCartItem(arr);
  }
  static async DecreToCart(DMATHANGID) {
    let arr = await this.GetCartItem();
    let remove = -1;
    if (arr != null) {
      arr.forEach((element, index) => {
        if (element.DMATHANGID == o.DMATHANGID) {
          element.SOLUONG -= 1;
          if (element.SOLUONG <= 0) {
            remove = index;
          }
        }
      });
      if (remove >= 0) {
        arr.splice(remove, 1);
      }
      this.SetCartItem(arr);
    }
  }
  static async RemoveToCart(DMATHANGID) {
    let arr = await this.GetCartItem();
    let remove = -1;
    arr.forEach((element, index) => {
      if (element.DMATHANGID == DMATHANGID) {
        remove = index;
      }
    });
    if (remove >= 0) {
      arr.splice(remove, 1);
    }
    this.SetCartItem(arr);
  }
  static async SetCartItem(arr) {
    AsyncStorage.setItem(Contants.MemoryItem, JSON.stringify(arr));
  }
  static async GetCartItem() {
    let o = await AsyncStorage.getItem(Contants.MemoryItem);
    return JSON.parse(o);
  }
}
export default Memory;

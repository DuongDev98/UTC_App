import AsyncStorage from '@react-native-async-storage/async-storage';
import Contants from './Contants';
class Memory {
  //id mặt hàng, tên mặt hàng, Số lượng, đơn giá
  static async IncreToCart(o) {
    let arr = await this.getCartItem();
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
    this.setCartItem(arr);
  }
  static async DecreToCart(DMATHANGID) {
    let arr = await this.getCartItem();
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
      this.setCartItem(arr);
    }
  }
  static async RemoveToCart(DMATHANGID) {
    let arr = await this.getCartItem();
    let remove = -1;
    arr.forEach((element, index) => {
      if (element.DMATHANGID == o.DMATHANGID) {
        remove = index;
      }
    });
    if (remove >= 0) {
      arr.splice(remove, 1);
    }
    this.setCartItem(arr);
  }
  static async setCartItem(arr) {
    AsyncStorage.setItem(Contants.MemoryItem, JSON.stringify(arr));
  }
  static async getCartItem() {
    let o = await AsyncStorage.getItem(Contants.MemoryItem);
    return JSON.parse(o);
  }
}
export default Memory;

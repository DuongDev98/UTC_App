const initUserSate = {
  ID: '',
  AVATAR: '',
  DIACHI: '',
  DIENTHOAI: '',
  DPHUONGXA: null,
  DPHUONGXAID: '',
  DQUANHUYEN: null,
  DQUANHUYENID: '',
  DTINHTHANH: null,
  DTINHTHANHID: '',
  EMAIL: '',
  FACEBOOKID: null,
  GOOGLEID: null,
  MATKHAU: '',
  NAME: '',
  TAIKHOAN: '',
  TDONHANGs: [],
};

// export const setUser = o => {
//   return {
//     type: 'setUser',
//     payload: o,
//   };
// };

// export const removeUser = o => {
//   return {
//     type: 'removeUser',
//   };
// };

const userReducer = (state = initUserSate, action) => {
  if (action.type == 'setUser') {
    return {
      ...state,
      ID: action.payload.ID,
      AVATAR: action.payload.AVATAR,
      DIACHI: action.payload.DIACHI,
      DIENTHOAI: action.payload.DIENTHOAI,
      DPHUONGXA: action.payload.DPHUONGXA,
      DPHUONGXAID: action.payload.DPHUONGXAID,
      DQUANHUYEN: action.payload.DQUANHUYEN,
      DQUANHUYENID: action.payload.DQUANHUYENID,
      DTINHTHANH: action.payload.DTINHTHANH,
      DTINHTHANHID: action.payload.DTINHTHANHID,
      EMAIL: action.payload.EMAIL,
      FACEBOOKID: action.payload.FACEBOOKID,
      GOOGLEID: action.payload.GOOGLEID,
      MATKHAU: action.payload.MATKHAU,
      NAME: action.payload.NAME,
      TAIKHOAN: action.payload.TAIKHOAN,
      TDONHANGs: action.payload.TDONHANGs,
    };
  }
  if (action.type == 'uploadavatar') {
    return {
      ...state,
      AVATAR: action.payload,
    };
  }
  if (action.type == 'removeUser') {
    return initUserSate;
  }
  return state;
};
module.exports = userReducer;

import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "../_actions/types";

export type Action = {
  type: string;
  payload: boolean | Payload;
};

export type Payload = {
  productInfo?: CartDetail[];
  cartDetail?: CartDetail[];
  cart?: Item[];
};

export type Item = {
  id: string;
  quantity: number;
  date: string;
};

export type Images = {
  original: string;
  thumbnail: string;
};

export type CartDetail = {
  continents: number;
  createdAt: string;
  description: string;
  images: Images[];
  price: number;
  sold: number;
  title: string;
  updatedAt: string;
  views: number;
  _id: string;
  quantity: number;
};

export type History = {
  dateOfPurchase: number;
  name: string;
  id: string;
  price: number;
  quantity: number;
  paymentId: string;
};

export type UserData = {
  _id: string;
  isAdmin: boolean;
  isAuth: boolean;
  email: string;
  name: string;
  role: string;
  image: string[];
  cart: Item[];
  history: History[];
};

export type UserState = {
  register: boolean;
  loginSuccess: boolean;
  userData: UserData;
  cartDetail: CartDetail[];
};

const initialState = {
  register: false,
  loginSuccess: false,
  userData: {
    _id: "",
    isAdmin: false,
    isAuth: false,
    email: "",
    name: "",
    role: "",
    image: [],
    cart: [],
    history: [],
  },
  cartDetail: [],
};

export default function (state: UserState = initialState, action: Action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state, loginSuccess: false };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: (action.payload as Payload).productInfo,
        userData: {
          ...state.userData,
          cart: (action.payload as Payload).cart,
        },
      };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        cartDetail: (action.payload as Payload).cartDetail,
        userData: {
          ...state.userData,
          cart: (action.payload as Payload).cart,
        },
      };
    default:
      return state;
  }
}

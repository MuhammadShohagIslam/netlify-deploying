import {
    StoreDataType,
    StoreAction,
    StoreActionType,
} from "./storeReducer.type";

export const initialState: StoreDataType = {
    user: null,
    carts: [],
    text: "",
    isCashOnDelivery:false,
    shippingAddress:{},
    isCouponed:false
};

//  to add data from window local storage to the initial state
if (typeof window !== "undefined") {
    if (window.localStorage.getItem("carts")) {
        // checking already carts to the window localStorage
        let cartsFromLocalStorage: string | null =
            window.localStorage.getItem("carts");
        if (cartsFromLocalStorage !== null) {
            initialState.carts = JSON.parse(cartsFromLocalStorage);
        }
    } else {
        initialState.carts = [];
    }
}

export const storeReducer = (
    state: StoreDataType = initialState,
    action: StoreAction
): StoreDataType => {
    switch (action.type) {
        case StoreActionType.LOGGED_IN_USER:
            return { ...state, user: action.payload };
        case StoreActionType.LOGOUT_USER:
            return { ...state, user: action.payload };
        case StoreActionType.ADD_TO_CART:
            return {
                ...state,
                carts: action.payload,
            };
        case StoreActionType.ADD_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress: action.payload,
                };
        case StoreActionType.ADD_COUPON:
                return {
                    ...state,
                    isCouponed: action.payload,
                };
        case StoreActionType.CASH_ON_DELIVERY:
            return {
                ...state,
                isCashOnDelivery: action.payload,
            };
        case StoreActionType.SEARCH_FILTER_VALUE:
            return { ...state, text: action.payload };
        default:
            return state;
    }
};

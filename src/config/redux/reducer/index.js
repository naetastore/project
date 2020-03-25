import { REST } from "../../REST";

const globalState = {
    global: [],
    banner: [],
    suggested: [],
    categories: [],
    product: [],
    termsUrl: '',
    isAuthenticated: false,
    inSession: {},
    addedItems: [],
    total: 0,
    paymentMethod: {},
    userData: null
}

export const reducer = (state = globalState, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return {
                ...state,
                userData: action.data
            }

        case "SET_SUGGESTED":
            return {
                ...state,
                suggested: action.data
            }
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.data
            }
        case "SET_PRODUCT":
            return {
                ...state,
                product: action.data
            }

        case "SET_GLOBAL":
            return {
                ...state,
                global: action.data
            }
        case "SET_BANNER":
            return {
                ...state,
                banner: action.data
            }

        case "DELETE_CART":
            const newItems = state.addedItems.filter(p => p.id !== action.product.id);
            return {
                ...state,
                addedItems: newItems,
                total: Number(state.total) - Number(action.product.price)
            }

        case "WHEN_YOUR_ZERO":
            let notZ = state.addedItems.filter(p => p.qty > 0);
            if (notZ) {
                return {
                    ...state,
                    addedItems: notZ
                }
            } else {
                return {
                    ...state,
                    addedItems: []
                }
            }

        case "DESTROY_CART":
            return {
                ...state,
                addedItems: [],
                total: 0,
                paymentMethod: {}
            }

        case "PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: action.method
            }

        case "UPDATE_SESSION":
            return {
                ...state,
                inSession: action.userdata
            }
        // Apa dong bedanya sam ayang di bawah \(^D^)/
        case "SET_SESSION":
            return {
                ...state,
                inSession: action.userdata
            }

        case "AFFECT_QUANTITY":
            const oldProduct = state.addedItems.find(product => product.id === action.product.id);
            if (action.handle === "PLUS") {
                if (oldProduct.qty < action.product.stock) {
                    oldProduct.qty = oldProduct.qty + 1;
                    return {
                        ...state,
                        total: state.total + oldProduct.price
                    }
                }
            }
            if (action.handle === "MINUS") {
                if (oldProduct.qty > 0) {
                    oldProduct.qty = oldProduct.qty - 1;
                    return {
                        ...state,
                        total: state.total - oldProduct.price
                    }
                }
            }
            break;

        case "IS_AUTHENTICATED":
            return {
                ...state,
                isAuthenticated: action.value
            }

        case "ADD_TO_CART":
            let price = action.product.price;
            price = price.split(',');
            let result = "";
            price.forEach(n => result += n);
            price = Number(result);

            const product = {
                'id': action.product.id,
                'name': action.product.name,
                'price': price,
                'qty': 1,
                'stock': action.product.qty,
                'image': REST.server.url + 'assets/img/product/' + action.product.image
            }

            const existed = state.addedItems.find(product => product.id === action.product.id);
            if (existed) {
                let prevState = state.addedItems;
                if (state.addedItems.find(product => product.id !== action.product.id)) {
                    prevState = [...state.addedItems];
                }

                existed.qty = existed.qty + 1;
                return {
                    ...state,
                    addedItems: prevState, existed,
                    total: state.total + price
                }
            }
            else
                return {
                    ...state,
                    addedItems: [...state.addedItems, product],
                    total: state.total + price
                }

        default:
            break;
    }
    return state;
}
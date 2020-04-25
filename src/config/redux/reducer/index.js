const globalState = {
    global: [],
    suggested: [],
    category: [],
    product: [],
    userData: {},

    addedItems: [],
    total: 0
};

const rootReducer = (state = globalState, action) => {
    switch (action.type) {
        case "SET_GLOBAL":
            return {
                ...state,
                global: action.data
            };
        case "SET_SUGGESTED":
            return {
                ...state,
                suggested: action.data
            };
        case "SET_CATEGORY":
            return {
                ...state,
                category: action.data
            };
        case "SET_PRODUCT":
            return {
                ...state,
                product: action.data
            };
        case "SET_USERDATA":
            return {
                ...state,
                userData: action.data
            };

        case "ADD_TO_CART":
            let price = action.data.price;
            price = price.split('.');
            let result = "";
            price.forEach(n => result += n);
            price = Number(result);

            const product = {
                'id': action.data.id,
                'name': action.data.name,
                'price': price,
                'qty': 1,
                'stock': action.data.qty,
                'image': action.data.image,
                'curs': action.data.curs
            };

            const existed = state.addedItems.find(data => data.id === action.data.id);
            if (existed) {
                let prevState = state.addedItems;
                if (state.addedItems.find(data => data.id !== action.data.id)) {
                    prevState = [...state.addedItems];
                }

                existed.qty = existed.qty + 1;
                return {
                    ...state,
                    addedItems: prevState, existed,
                    total: state.total + price
                };
            }
            else
                return {
                    ...state,
                    addedItems: [...state.addedItems, product],
                    total: state.total + price
                };
        case "PLUS_QTY":
            const added = state.addedItems.find(p => p.id === action.data.id);
            if (added.qty < action.data.stock) {
                added.qty += 1;
                return {
                    ...state,
                    total: state.total + added.price
                };
            }
            break;
        case "MINUS_QTY":
            const addedItem = state.addedItems.find(p => p.id === action.data.id);
            if (addedItem.qty > 0) {
                addedItem.qty -= 1;
                return {
                    ...state,
                    total: state.total - addedItem.price
                };
            }
            break;
        case "CLEAR_ADDED_ITEMS":
            return {
                ...state,
                addedItems: [],
                total: 0
            };
        case "DELETE_ADDED_ITEM":
            const newItems = state.addedItems.filter(p => p.id !== action.data.id);
            return {
                ...state,
                addedItems: newItems,
                total: Number(state.total) - Number(action.data.price)
            };
        case "WHEN_ZERO":
            let notZ = state.addedItems.filter(p => p.qty > 0);
            if (notZ) {
                return {
                    ...state,
                    addedItems: notZ
                };
            } else {
                return {
                    ...state,
                    addedItems: []
                };
            }

        default:
            break;
    }

    return state;
}

export default rootReducer;
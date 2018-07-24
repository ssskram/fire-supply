
const initialState = { cart: [] };
const incrementCountType = 'LOAD_CART';
const decrementCountType = 'DECREMENT_COUNT';

export interface CartState {
    cart: CartItems[]
}

export interface CartItems {
    id: any
    family: any
    obj: any
    unit: any
}

export const actionCreators = {
    loadCart: () => ({ type: incrementCountType }),
    decrement: () => ({ type: decrementCountType })
  };
  

export const reducer = (state, action) => {
    state = state || initialState;
  
    if (action.type === incrementCountType) {
      return { ...state, count: state.count + 1 };
    }
  
    if (action.type === decrementCountType) {
      return { ...state, count: state.count - 1 };
    }
  
    return state;
  };
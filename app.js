const  redux = require('redux')
const createStore = redux.createStore

const reduxlogger = require('redux-logger')
const applyMiddleWare= redux.applyMiddleware
const logger = reduxlogger.createLogger()

const BUY_CAKE= 'BUY_CAKE'
const BUY_ICE= 'BUY_ICE'

const buyCake = ()=>{
    return {
        type:BUY_CAKE ,
        info : 'hello'
    }
}

const buyIce = ()=>{
    return {
        type:BUY_ICE ,
        info : 'hello'
    }
}


const initialCakeState = {
    cake : 10
}
const initialIceState = {
    Ice : 10
}


const cakereducer = (state=initialCakeState , action)=>{
    switch(action.type){
        case BUY_CAKE:  return {
                ...state ,
                cake : state.cake -1 
            }
        default : return state    
    }
}

const Icereducer = (state=initialIceState , action)=>{
    switch(action.type){
        case BUY_ICE :  return {
                ...state ,
                Ice: state.Ice -1 
            }
        default : return state    
    }
}

const rootReducer = redux.combineReducers({
    cake:cakereducer ,
    ice : Icereducer
})



const store = createStore(rootReducer , applyMiddleWare(logger))
console.log('initial state' , store.getState())
const sub = store.subscribe(()=>{})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIce())
store.dispatch(buyIce())






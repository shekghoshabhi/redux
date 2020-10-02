const redux = require('redux')
const createStore = redux.createStore

const middleware = redux.applyMiddleware
const reduxThunk = require('redux-thunk').default
const axios = require('axios')

const LOAD = 'LOADING'
const SUCCESSFUL = 'SUCCESSFUL'
const FAILED = 'FAILED'

const initialState = {
    loading : false ,
    usrers : [], 
    error : ""
}

const loading = ()=>{
    return {
        type:LOAD
    }
}
const fetch = (user)=>{
    return {
        type:SUCCESSFUL,
        payloads : user
    }
}
const fail = (error)=>{
    return {
        type:FAILED,
        payloads : error
    }
}


const fetchUsers = ()=>{
    return function(dispatch){
        dispatch(loading())

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response =>{
               
            let users = response.data.map(user => user.id)
            dispatch(fetch(users))
        })
        .catch(error=>{
            
            dispatch(fail(error.message))
        })

    }
}


const reducer = (state = initialState , action)=>{

    switch(action.type){
        case LOAD : {
            return {
                ...state ,
                loading : true
            }
        }
        case SUCCESSFUL :{
            return {
                loading : false,
                user : action.payloads,
                error : ""
            }
        }
        case FAILED : {
            return {
                loading : false ,
                user : [] , 
                error : action.payloads
            }
        }
    }
}



const store = createStore(reducer, middleware(reduxThunk))


store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())


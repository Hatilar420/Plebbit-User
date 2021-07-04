const genralState = {
    error : null,
    data : null,
    isLoading : true
}

const SUCCESS = "SUCCESS"
const ERROR  = "Error"

const genralReducer = (state,action) =>{
    switch(action.type){

        case SUCCESS : return { 
        isLoading : false,
        data : action.data }
        case ERROR : return {
            error : action.error,
            isLoading : false
        }

        default : throw new Error("No case matched")

    }

}

const setGenralSuccess = (Data) =>{

return  {
    type : SUCCESS,
    data : Data
}

}

const setGenralError = (Error) =>{

    return  {
        type : SUCCESS,
        error : Error
    }
    
}

export {genralState,genralReducer,setGenralSuccess,setGenralError}
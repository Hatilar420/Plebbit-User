const gameState = {
    error : null,
    data : null,
    isLoading : true
}

const SUCCESS = "SUCCESS"
const ERROR  = "Error"

const gameReducer = (state,action) =>{
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

const setGameSuccess = (Data) =>{

return  {
    type : SUCCESS,
    data : Data
}

}

const setGameError = (Error) =>{

    return  {
        type : SUCCESS,
        error : Error
    }
    
}

export {gameState , gameReducer , setGameSuccess , setGameError}
const currentUserReducer = (state=null,action)=>{
    switch (action.type){
        case 'FETCH_CURRENT_USER':
            return action.payload;
        case 'UPDATE_POINTS':
            return {
                ...state,
                result: {
                    ...state.result,
                    points: state.result.points + action.payload
                }
            };
        default: return state;
    }
}
export default currentUserReducer;
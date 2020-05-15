import { combineReducers } from 'redux';

function ReducerDeaths(state={deaths:{}}, action){
    switch(action.type){
        case 'ADD_DEATHS':
            return { ...state, deaths:{...action.seriesDeaths }};
        default:
            return state;
    }
}

function ReducerCases(state={cases:{}}, action){
    switch(action.type){
        case 'ADD_CASES':
            return { ...state, cases:{...action.seriesCases}};
        default:
            return state;
    }
}

function ReducerSelectState(state={data:[]}, action){
    switch(action.type){
        case 'ADD_STATE':
            return {...state, data:[...state.data, action.data]};
        default:
            return state; 
    }
}

function ReducersDeathsByDay(state={deaths:{}}, action){
    switch(action.type){
        case 'ADD_DEATHS_BY_DAY':
            return { ...state, deaths:{...action.deathsByDay}};
        default:
            return state;
    }
}

function ReducersCasesByDay(state={cases:{}}, action){
    switch(action.type){
        case 'ADD_CASES_BY_DAY':
            return { ...state, cases:{...action.casesByDay}};
        default:
            return state;
    }
}

function ReducersIsLoad(state={isLoad:false}, action){
    switch(action.type){
        case 'IS_LOAD':
            return { ...state, isLoad:action.isLoad };
        default:
            return state;
    }

}

function ReducersSwitchTheme(state={theme:false}, action){
    switch(action.type){
        case 'SWITCH_THEME':
            return { ...state, theme:action.newTheme };
        default:
            return state;
    }

}

function ReducerCurrentData(state={currentData:{state:'*', cases:'*', deaths:'*', date:'*'}}, action){
    switch(action.type){
        case 'ADD_CURRENT_DATA':
            return { currentData:action.currentDataState };
        default:
            return state;
    }
}
function ReducerErrorMessage(state={alert:{show:false, info:''}}, action){
    switch(action.type){
        case 'SET_ALERT':
            return {...state, alert:action.alert};
        default:
            return state;
    }
}
export default combineReducers(
    {
        ReducerSelectState,
        ReducerDeaths,
        ReducerCases,
        ReducersDeathsByDay,
        ReducersCasesByDay,
        ReducersIsLoad,
        ReducersSwitchTheme,
        ReducerCurrentData,
        ReducerErrorMessage
        
    });
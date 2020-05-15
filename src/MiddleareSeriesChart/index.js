import store from '../Store/index';
import ENDPOINT from '../EndPoints/index';

async function loadFullInfo(initialDate, lastDate, uf){
    try{
        const response = await fetch(`${ENDPOINT}data/?initialDate=${initialDate}&lastDate=${lastDate}&uf=${uf}`);
        const responseCurrentData = await fetch('https://covid19-brazil-api.now.sh/api/report/v1');

    
        if(response.ok && responseCurrentData.ok){
            const data = await response.json();
            const currentData = await responseCurrentData.json();
            const currentDataState = currentData['data'].filter((state) => state['uf'] === uf)[0];
            const isLoad = true;

            store.dispatch({type:'ADD_CURRENT_DATA', currentDataState});
            store.dispatch({type:'ADD_DATA', data });
            store.dispatch({type:'IS_LOAD',isLoad });
            createSeries(data);
        }else{
            store.dispatch({type:'ADD_CURRENT_DATA', currentDataState:{state:'*', cases:'*', deaths:'*', date:'*'}});
            store.dispatch({type:'IS_LOAD',isLoad:true });
            store.dispatch({type:'SET_ALERT', alert:{show:true, message:'erro ao carregar dados'}});
        }
    }catch(e){
        store.dispatch({type:'IS_LOAD',isLoad:true });
        store.dispatch({type:'SET_ALERT', alert:{show:true, message:'erro de conexão'}})
    }
}

function createSeries(data){
    const oneDay = 86400000;
    const seriesDeaths = {
        name:'óbitos',
        data:[]
    }

    seriesDeaths['data'] = data.map( day => [new Date(day['datetime']).getTime() - oneDay, day['deaths']]);

    const seriesCases = {
        name:'casos confirmados',
        data:[]
    }

    seriesCases['data'] = data.map( day => [new Date(day['datetime']).getTime() - oneDay, day['cases']]);

    const deathsByDay = {
        name:'óbitos por dia',
        data:getDataByDay(data, 'deaths')
    };

    const casesByDay = {
        name:'casos por dia',
        data:getDataByDay(data,'cases')
    }
    
    store.dispatch({type:'ADD_DEATHS', seriesDeaths});
    store.dispatch({type:'ADD_CASES', seriesCases});
    store.dispatch({type:'ADD_DEATHS_BY_DAY', deathsByDay});
    store.dispatch({type:'ADD_CASES_BY_DAY', casesByDay});

    }

    function getDataByDay(data, type){

        const values = [];
        const twoDaysSomeHours = 237610000;
        for(let i=1; i < data.length; i++){
            //if necessário devido a uma coleta incorreta de dados feita pela api tornando o dado negativo quando subtraido
           if(data[i][type] - data[i-1][type] >= 0){
                values.push([new Date(data[i]['datetime']).getTime() - twoDaysSomeHours, data[i][type] - data[i-1][type]]);
            }
    }
    return values;

}
export default loadFullInfo;
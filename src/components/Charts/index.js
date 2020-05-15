import React from 'react';
import { useSelector } from 'react-redux';
import Chart from '../Chart/index';
import Grid from '@material-ui/core/Grid';

function Charts(){
    const state = useSelector(state => state);
    const deaths = state.ReducerDeaths.deaths;
    const cases = state.ReducerCases.cases;
    const deathsByDay = state.ReducersDeathsByDay.deaths;
    const casesByDay = state.ReducersCasesByDay.cases;
    const isLoad = state.ReducersIsLoad.isLoad;

    return (
        <>
            <Grid item xs={12} sm={12} md={6}>
                { isLoad ? <Chart type="line" title="Dados acumulativos" seriesOne={cases} seriesTwo={deaths}/> : <div></div> }
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                { isLoad ? <Chart type="column" title="Dados por dia" seriesOne={casesByDay} seriesTwo={deathsByDay}/> : <div></div> }
            </Grid>
        </>
    );
}

export default Charts;
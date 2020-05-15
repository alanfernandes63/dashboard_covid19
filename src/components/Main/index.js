import React, { useEffect } from 'react';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Info from '../Info/index';
import Inputs from '../Inputs/index';
import loadFullInfo from '../../MiddleareSeriesChart/index';
import Dialog from '@material-ui/core/Dialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import Charts from '../Charts/index';

function Main(){

    const classes = useStyles();
    const state = useSelector(state => state);
    const isLoad = state.ReducersIsLoad.isLoad;

    useEffect(() =>{
        async function loadData(){
          const strInitialDate= '2020-04-25';
          const currentlyDate = new Date();
          const lastDay = currentlyDate.getDate() < 10 ? `0${currentlyDate.getDate()}` : currentlyDate.getDate();
          const lastMonth = currentlyDate.getMonth() < 10 ? `0${currentlyDate.getMonth() + 1}` : currentlyDate.getMonth() + 1;
          const lastYear = currentlyDate.getFullYear();

          const strLastDate = `${lastYear}-${lastMonth}-${lastDay}`;
          const state = 'RN';
          loadFullInfo(strInitialDate, strLastDate, state);
        };
    
        loadData();
    
      },[]);

    return(
        <div className={classes.main}>
            <Dialog open={!isLoad}>
                <div className={classes.dialog}>
                    <p>Carregando dados...</p>
                    <LinearProgress color="primary"/>
                </div>
            </Dialog>
            <Container className={classes.content}>
                <Grid spacing={1} container>
                    <Grid sm={12} xs={12} item md={6}>
                        <Inputs />
                    </Grid>
                    <Grid sm={12} item xs={12} md={6}>
                        <Info />
                    </Grid>
                    {isLoad ? <Charts /> : <Grid item className={classes.defaultChart}/>}
                </Grid>
            </Container>
        </div>
    );
}

export default Main;
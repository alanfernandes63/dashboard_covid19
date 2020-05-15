import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem, Grid, Button } from '@material-ui/core';
import states from '../../data/states';
import loadFullInfo from '../../MiddleareSeriesChart/index';
import { useDispatch } from 'react-redux';
import CustomSnackbar from '../Alerts/index';

import './styles.css';

function Inputs(){

    const classes = useStyles();
    const [initialDate, setInitialDate] = useState(new Date('2020-04-25T21:11:54'));
    const [lastDate, setLastDate] = useState(new Date());
    const [state, setState] = useState('RN');
    const dispatch = useDispatch();

    useEffect(() =>{

    },[]);

    function handlerInitialDate(date){
        setInitialDate(date);
    }

    function handlerLastDate(date){
        setLastDate(date);
    }

    function handlerChange(event){
        setState(event.target.value);
    }

    async function getData(event){
        event.preventDefault();
        if( initialDate && lastDate && validateDate(initialDate, lastDate)){
            const initialDay = initialDate.getDate() < 10 ? `0${initialDate.getDate()}` : initialDate.getDate();
            const initialMonth = initialDate.getMonth() < 10 ? `0${initialDate.getMonth() + 1}` : initialDate.getMonth() + 1;
            const initialYear = initialDate.getFullYear();
            const strInitialDate = `${initialYear}-${initialMonth}-${initialDay}`;

            const lastDay = lastDate.getDate() < 10 ? `0${lastDate.getDate()}` : lastDate.getDate();
            const lastMonth = lastDate.getMonth() < 10 ? `0${lastDate.getMonth() + 1}` : lastDate.getMonth() + 1;
            const lastYear = lastDate.getFullYear();
            const strLastDate = `${lastYear}-${lastMonth}-${lastDay}`;
        
            const isLoad = false;

            dispatch({type:'IS_LOAD', isLoad});
            loadFullInfo(strInitialDate, strLastDate, state);
        }else{
            dispatch({type:'SET_ALERT', alert:{show:true, message:'Datas incorretas'}});
            //setDatesIsvalid(true);
        }
    }

    function validateDate(initialDate, lastDate){
        return 0  < lastDate.getTime() - initialDate.getTime();
    }

    return(
        <>
        <CustomSnackbar />
        <form onSubmit={ getData }>
            <Grid container className={ classes.container }>
                <Grid item xs={12} md={12}>
                    <Select fullWidth value={ state } onChange={ handlerChange }>
                    {
                        states.map(
                        ( state ) => ( <MenuItem value={ state['uf'] } key={ state['uf'] }>{ state['name'] }</MenuItem> )
                        )
                    }
                    </Select>
                </Grid>
            </Grid>
            <Grid container className={ classes.container } spacing={2}>
                <Grid item xs={12} md={6}>
                    <p className={ classes.p }>data inicial</p>
                    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                        <KeyboardDatePicker value={ initialDate } onChange={ handlerInitialDate } format="dd/MM/yyyy" fullWidth></KeyboardDatePicker>
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <p className={ classes.p }>data final</p>
                    <MuiPickersUtilsProvider utils={ DateFnsUtils }>
                        <KeyboardDatePicker value={ lastDate } onChange={ handlerLastDate } format="dd/MM/yyyy" fullWidth></KeyboardDatePicker>
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            <Grid container className={classes.container}>
                <Grid item xs={12} md={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">Consultar</Button>
                </Grid>
            </Grid>
        </form>
        </>
    );
}

export default Inputs;
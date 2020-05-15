import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import useStyles from './styles';
import InfoItem from '../InfoItem';
import store from '../../Store/index';

function Info(){
    const classes = useStyles();
    const [isLoad, setIsload] = useState(false);
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [currentData, setCurrentData] = useState({state:'carregando...', cases:'carregando...', deaths:'carregando...'});

    store.subscribe(()=>{
        setIsload(store.getState().ReducersIsLoad.isLoad);
        setCurrentData(store.getState().ReducerCurrentData.currentData);
        const date = new Date(currentData['datetime']);
        const strDay = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const strMonth = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth()}`;
        setDay(strDay);
        setMonth(strMonth);
        setYear(date.getFullYear());
    });

    return(
            <Card className={classes.cardContainer}>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12} className={classes.title}>
                    { isLoad ? <><p>{`Dados atuais ${currentData['state']}`}</p><p>{`última atualização ${day}/${month}/${year}`}</p></>  : 'carregando...'}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoItem title="Casos confirmados" value={currentData['cases']} color="#2b908f" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoItem title="Óbitos" value={currentData['deaths']} color="#f45b5b"/>
                    </Grid>
                </Grid>
            </Card>
    );
}

export default Info;

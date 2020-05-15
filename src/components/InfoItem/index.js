import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import store from '../../Store/index';

function InfoItem(props){

    const [isLoad, setIsLoad] = useState(false);

    store.subscribe(()=>{
        setIsLoad(store.getState().ReducersIsLoad.isLoad);
    });

    useEffect(() =>{
    },[]);

    const classes = makeStyles({
        container:{
            height:110,
            backgroundColor:props.color,
        },
        title:{
            marginLeft:5,
            marginTop:5,
            fontWeight:'bold',
        },
        info:{
            textAlign:'center',
            fontWeight:'bold',
            fontSize:20
        }

    })();

    return(
        <Grid container  className={classes.container}>
            <Grid item sm={12} md={12} xs={12}>
                <p className={classes.title}>{ props.title }</p>
            </Grid>
            <Grid container className={classes.info} alignItems="center" alignContent="center">
                <Grid item xs={12} md={12}>
                    {isLoad ? <p>{props.value}</p> : <p>carregando...</p>}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default InfoItem;
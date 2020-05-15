import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import store from '../../Store/index';
import { useDispatch } from 'react-redux';

function CustomSnackbar(){

    const dispatch = useDispatch();

    const state = store.getState().ReducerErrorMessage.alert;

    const [alert, setAlert] = useState(state);

    store.subscribe(() =>{
        setAlert(store.getState().ReducerErrorMessage.alert);
    });

    useEffect(() =>{
    },[]);

    return (
        <Snackbar
        autoHideDuration={7000}
        onClose={ () => { dispatch({type:'SET_ALERT', alert:{show:false, message:''}}) } }
        anchorOrigin={{vertical:'top',horizontal:'right'}}
        open={ alert['show'] }
        message={alert['message']}
        color="secondary" />
    );
}

export default CustomSnackbar;
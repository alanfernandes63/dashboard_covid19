import React, { useState } from 'react';
import useStyles from './styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import store from '../../Store/index';

function Header(){
    const classes = useStyles();
    const dispatch = useDispatch();
    const darkTheme = useSelector(state => state).ReducersSwitchTheme.theme;
    const [iconTheme, setIconTheme] = useState(store.getState().ReducersSwitchTheme.theme);

    store.subscribe(() =>{
        setIconTheme(store.getState().ReducersSwitchTheme.theme);
    });

    function switchTheme(){
        const newTheme = !darkTheme;
        dispatch({type:'SWITCH_THEME', newTheme});
    }

    return (
        <div className={classes.header}>
            <Container>
                <Paper className={classes.paper} square>
                    <Grid container>
                        <Grid item md={11} xs={10}>
                            <Link underline="none" component="button" onClick={()=>{}}>
                                <p className={classes.title}>DashBoard covid-19</p>
                            </Link>
                        </Grid>
                        <Grid item xs={2} md={1}>
                            <Grid className={classes.containerIconMode} container alignItems="flex-end" alignContent="flex-end" justify="flex-end">
                                <IconButton onClick={ switchTheme }>
                                { iconTheme ? <Brightness7Icon onClick={switchTheme} /> : <Brightness4Icon /> }
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}

export default Header;
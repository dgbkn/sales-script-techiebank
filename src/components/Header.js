import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import { motion } from "framer-motion";

import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4'; //light
import { useState } from 'react';
import { ChangeHistory } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import { useHistory } from 'react-router-dom';
import { Button, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton';

import { useQuery, gql } from '@apollo/client'
import { badgeVarients } from '../motionUtils';
import { Paper } from '@material-ui/core';

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name,
      id
    }
  }
`




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

export default function Header({ setdarkTheme, darktheme }) {
    const classes = useStyles();
    const history = useHistory();

    var [location, setLocation] = useState(history.location.pathname);



    const { loading, error, data } = useQuery(CATEGORIES)

    if (loading) return <p>   <Skeleton animation="wave" height={10} width="100%" style={{ marginBottom: 6 }} />  .</p>
    if (error) return <p>Error fetching categories</p>

    return (
        <motion.div className={classes.root}
            initial={{ x: '10px' }}
            animate={{
                x: '0', transition: { duration: 1 }
            }}
            transition={{ delay: 5 }}


        >
            <AppBar position="static" color="primary">
                <Toolbar>





                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="change theme"
                        style={{ paddingLeft: '20px' }}
                        onClick={() => history.push('/')}
                    >

                        <CodeIcon />
                    </IconButton>



                    <Typography className={classes.title} variant="h6" noWrap>
                        <Button onClick={() => history.push('/')}
                            style={{ color: 'white' }}
                        >
                            Scripts Feel
                        </Button>
                    </Typography>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search For Scripts…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => {

                                if (e.target.value) {

                                    history.push(`/search/${encodeURIComponent(e.target.value.trim())}`);

                                } else {
                                    history.push(`/`);
                                }

                            }}
                        />
                    </div>

                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="change theme"
                        onClick={() => { setdarkTheme(!darktheme) }}
                        style={{ paddingLeft: '20px' }}
                    >
                        {darktheme ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>

                </Toolbar>
            </AppBar>


            <motion.div
      variants={badgeVarients}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
            <Paper style={{ display: 'inline', padding: '10px' }} elevation={0} id="cat__head">
                <Typography variant="p" style={{ margin: '20px', display: 'inline-block', fontSize: '18px' }}>Categories: </Typography>


                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" style={{ margin: '20px', display: 'inline-block', boxShadow: 'none' }} >
                    
                    <Button color={window.location.pathname === `/` ? 'secondary' : 'primary'} key={`alls`} onClick={() => { history.push(`/`); setLocation(`/`) }} style={{ borderRadius: '20px', margin: '2px' }}>All</Button>

                    {data.categories.map(category => {
                        
                        return <Button color={window.location.pathname === location && location.includes(`${category.id}`) ? 'secondary' : 'primary'} key={category.id} onClick={() => { history.push(`/category/${category.id}`); setLocation(`/category/${category.id}`) }} style={{ borderRadius: '20px', margin: '2px' }}>{category.name}</Button>
                    })}
                </ButtonGroup>

            </Paper>
                    </motion.div>
        </motion.div>
    );
}

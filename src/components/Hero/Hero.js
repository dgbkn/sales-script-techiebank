
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button, Typography } from '@material-ui/core';
import { Typewriter } from 'react-simple-typewriter'
import { motion } from 'framer-motion';

import SectionHeader from './SectionHeader';

const useStyles = makeStyles(theme => ({
    root: {
       
    },
    image: {
        boxShadow:
            '25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)',
        borderRadius: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            maxWidth: 500,
        },
    },
}));

const Hero = props => {
    const { className, ...rest } = props;
    const classes = useStyles();





    const theme = useTheme();
    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return (
        <motion.div className={clsx(classes.root, className)} {...rest} style={{ paddingLeft:'40px'}}
        initial={{x:'-100px'}}
        animate={{x:'0'}}
        whileHover={{scale:1.009,boxShadow:' 10px 10px 30px #bebebe,-10px -10px 30px #ffffff'}}
        >
            <Grid
                container
                justify="space-between"
                spacing={4}
                direction={isMd ? 'row' : 'column-reverse'}
                style={{margin:'25px'}}
            >
                <Grid
                    item
                    container
                    alignItems="center"
                    xs={12}
                    md={6}
                    data-aos={'fade-up'}
                >
                    <SectionHeader
                        title={
                            <span>
                                Beautiful Scripts That Will
                                <br />
                                <Typography component="span" variant="inherit" color="primary">
                                    <Typewriter
                                        words={['Make You Enginner', 'Get You A Job', 'Help You Start A Startup', 'Make You Innovative']}
                                        loop={0}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                        onLoopDone={() => console.log(`Done after 5 loops!`)}
                                    />

                                </Typography>
                            </span>
                        }
                        subtitle="Save yourself time and money By Using PreBuilt Templates From Us."
                        ctaGroup={[
                            <Button variant="contained" color="primary" size="large" onClick={()=>window.scrollTo(0,-23)}>
                                Start now
                            </Button>
                        ]}
                        align="left"
                        disableGutter
                        titleVariant="h3"
                    />
                </Grid>
                <Grid
                    item
                    container
                    justify="flex-start"
                    alignItems="center"
                    xs={12}
                    md={6}
                    data-aos={'fade-up'}
                    style={{ overflow: 'hidden', height: '550px' }}
                >
                    {/* <img
            src="https://assets.maccarianagency.com/the-front/web-screens/home/home-hero-bg-light.png"
            alt="TheFront Company"
            className={classes.image}


          /> */}

                    <motion.div className='jss143' 
                            // whileHover={{scale:1.009,boxShadow:' 20px 20px 60px #bebebe,-20px -20px 60px #ffffff'}}
                            >

                    </motion.div>

                </Grid>
            </Grid>
        </motion.div>
    );
};

Hero.propTypes = {
    /**
     * External classes
     */
    className: PropTypes.string,
};

export default Hero;
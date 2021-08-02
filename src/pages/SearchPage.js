import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { motion } from "framer-motion";
import useFetch from '../hooks/useFetch';
import { containerVariants, buttonVariants } from '../motionUtils';
import { useEffect } from 'react';
import SkeletonPage from '../components/Skeleton';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function SearchPage() {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));

    var indexOfindex = ["movies", "series", "channels"];
    // var query = URLSearchParams(useLocation().search);

    var { query: search_term } = useParams();
    var history = useHistory();


    var { data, loading, error } = useFetch('https://strapi-demo.shreeram4.repl.co/items?_q=' + encodeURIComponent(search_term));

    useEffect(() => {
        console.log(data, "is data", data?.length)
        return () => {

        }
    }, [data])

    return (
        <div>

            <motion.div
                className={useStyles.root}
                style={{ margin: '20px 20px' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >

                <Grid container spacing={3}>


                    {data && data.length > 0 && data.map((item, i) => {

                        return (
                            <>
                                {item &&
                                    <Grid item xs={6} sm={3} key={i}>
                                        <Paper className={useStyles.paper}>
                                            <motion.div
                                                variants={buttonVariants}
                                                whileHover="hover"
                                            >
                                                <Card>
                                                    <CardActionArea onClick={() => item.link ? window.open(item.link, '_newtab' + Math.floor(Math.random() * 999999)) : {}}>
                                                        <CardMedia
                                                            style={{ height: 140 }}
                                                            image={item.photo ? item.photo : `/logo.gif`}
                                                            title={item.name}
                                                        />
                                                        <CardContent>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {item.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                {item.content.substring(0, 100)}....
                                                            </Typography>
                                                        </CardContent>
                                                    </CardActionArea>
                                                    <CardActions>
                                                        <Button size="small" color="" onClick={() => { history.push(`/details/${item.id}`) }}>
                                                            Learn More
                                                        </Button>

                                                        {item.link &&
                                                            <a href={item.link} target="_blank">
                                                                <Button size="small" color="">
                                                                    Link to Buy
                                                                </Button>
                                                            </a>
                                                        }

                                                    </CardActions>
                                                </Card>
                                            </motion.div>


                                        </Paper>
                                    </Grid>
                                }
                            </>
                        );
                    })}

                </Grid>
            </motion.div>
            <br />
            {data && data.length === 0 && <center><h4>No Scripts Found</h4></center>}


            {loading && <SkeletonPage />}

            {error && <h4>Oops, an error occurred.</h4>}

        </div>
    )
}
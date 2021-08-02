
import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

import SkeletonPage from '../components/Skeleton'


import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { containerVariants, buttonVariants } from '../motionUtils';
import { motion } from 'framer-motion';



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
const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name,
      id,
      items{
        id,
        name,
        content,
        photo,
        link,
        categories{
          id,
          name
        }
      }
    }
  }
`

export default function Category() {
  var history = useHistory();


  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if (loading) return <SkeletonPage />
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <motion.div
      className={useStyles.root}
      style={{ margin: '20px 20px' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >      <h2>{data.category.name} Items </h2>


      <Grid container spacing={3}>


        {data.category.items.map(item => (

          <Grid item xs={6} sm={3} >
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
                      <Link to={item.link} target="_blank">
                        <Button size="small" color="">
                          Link to Buy
                        </Button>
                      </Link>
                    }

                  </CardActions>
                </Card>
              </motion.div>


            </Paper>
          </Grid>

          // <div key={item.id} className="review-card">
          //   <h2>{item.name}</h2>

          //   {item.categories.map(c => (
          //     <small key={c.id}>{c.name}</small>
          //   ))}

          //   <p>{item.content.substring(0, 200)}...</p>

          //   <Link to={}>Read more</Link>

          // </div>
        ))}



      </Grid>


      {/* 
      {data.category.items.map(item => (
        <div key={item.id} className="review-card">
          <h2>{item.name}</h2>

          {item.categories.map(c => (
            <small key={c.id}>{c.name}</small>
          ))}
          
          <p>{item.content.substring(0, 200)}...</p>
          <Link to={`/details/${item.id}`}>Read more</Link>
        </div>
      ))} */}



    </motion.div>
  )
}

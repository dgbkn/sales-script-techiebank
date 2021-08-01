import React from 'react'
import { Link, useHistory } from 'react-router-dom'
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





const ITEMS = gql`
query GetPaginatedItems($start:Int! = 0){
  items(start:$start){
    id,
    name,
    content,
    categories{
      id,
      name
    }
  }
}
`

// items(limit:10,start:$start){  } RULE FOR THE PAGINATION 

export default function Homepage() {
  const { loading, error, data } = useQuery(ITEMS, {
    variables: { start: 0 }
  })

  var history = useHistory();

  if (loading) return <SkeletonPage />
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div className={useStyles.root}>
      <Grid container spacing={3}>


        {data.items.map(item => (

          <Grid item xs={6} sm={3}>
            <Paper className={useStyles.paper}>

              <Card>
                <CardActionArea>
                  <CardMedia
                    style={{ height: 140 }}
                    image={item.photo}
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
                  <Button size="small" color="primary" onClick={() => { history.push(`/details/${item.id}`) }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>


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
    </div>
  )
}

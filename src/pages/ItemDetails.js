import React from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { useEffect } from 'react';
import SkeletonArticle from '../components/SkeletonArticle';



import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// import ReactRic
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


const item = gql`
  query Getitem($id: ID!) {
    item(id: $id) {
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
`

export default function ItemDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(item, {
    variables: { id: id }
  })

  var history = useHistory();

  useEffect(() => {
    if (document.body.contains(document.getElementById('cat__head'))) {
      document.getElementById('cat__head').style.display = 'none';
    }
    return () => {
      if (document.getElementById('cat__head').style.display = 'none') {
        document.getElementById('cat__head').style.display = '';
      }
    }
  }, [])

  if (loading) return <SkeletonArticle />
  if (error) return <p>Error :(</p>

  // console.log(data)
  return (
    <div className={useStyles.root} style={{ margin: '2% 2%' }}>

      {/*       
      <h1>{data.item.name}</h1>

        <div>
          <img src={data.item.photo ? data.item.photo : `/logo.gif`} style={{width: '50%'}} />
        </div>
      
      <ReactMarkdown children={`${data.item.content}`} />



      {data.item.link &&
        <center>
          <Link to={data.item.link}>
            <Button size="large" color="primary" variant="contained">Purchase Link</Button>
          </Link>
        </center>
      }


      
{data.item.freelink &&
        <center>
          <Link to={data.item.freelink}>
            <Button size="large" color="primary" variant="contained">Download Link</Button>
          </Link>
        </center>
      }


      <CardActions>
        {data.item.categories.map(c => (
          <Button size="small" onClick={() => { history.push(`/category/${c.id}`) }} style={{}}>
            #{c.name}
          </Button>))}
      </CardActions>
 */}




      <Card>
        <CardActionArea>
          <CardMedia
            style={{ height: '400px' }}
            image={data.item.photo ? data.item.photo : `/logo.gif`}
            title={data.item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.item.name}
            </Typography>
            <Typography variant="body2" color="" component="p">
              <ReactMarkdown >{data.item.content}</ReactMarkdown>
            </Typography>

            {data.item.link &&
              <center>
                <a href={data.item.link}>
                  <Button size="large" color="primary" variant="contained">Purchase Link</Button>
                </a>
              </center>
            }



          </CardContent>
        </CardActionArea>


            <CardActions style={{ margin: '20px' }}>

              {data.item.categories.map(c => (
                <Button size="small" onClick={() => { history.push(`/category/${c.id}`) }} style={{}}>
                  #{c.name}
                </Button>))}

            </CardActions>
      </Card>
    </div>
  )
}

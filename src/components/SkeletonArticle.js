
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';



export default function SkeletonArticle() {
    return (
        <div style={{margin:'0 5%'}}>

<Skeleton animation="wave" height={400} width="100%" style={{ marginBottom: 6 }} />



            <Skeleton animation="wave" variant="circle" width={40} height={40} />

            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />



        </div>
    )
}

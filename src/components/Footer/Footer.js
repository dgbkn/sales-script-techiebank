import React from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { useMediaQuery, Grid, Button, Typography } from '@material-ui/core';

export default function Footer() {
    return (
        <footer style={{margin:'40px'}}>
            <center>
                <Typography component="span" variant="h6" color="primary" style={{fontFamily:'Nunito'}}>
                Crafted By Love With 
            <Typewriter
                                        words={[ ' Techno Botics 🦸 ',' Lakshit Agarwal 👽 ', ' Himesh Parashar 🤖 ', ' Dev Goyal 🤕 ']}
                                        loop={0}
                                        cursor
                                        cursorStyle='_'
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                        onLoopDone={() => console.log(`Done after 5 loops!`)}
                                    />

</Typography>
                </center>
        </footer>
    )
}

import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Badge } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons' 
import logo from '../../assets/commerce.png'
import { Link, useLocation } from 'react-router-dom'
import useStyles from './styles'

function Navbar({ totalItems }) {
    const classes = useStyles()
    const location = useLocation()
    return (
        <div>
            <AppBar position="fixed" color="inherit" className={classes.appbar}>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color= "inherit" >
                        <img src={logo} alt="commerce.js" className={classes.image} height="25px"/>
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' && (
                        <div className={classes.button} >
                            <IconButton component={Link} to="/cart" aria-label="show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar

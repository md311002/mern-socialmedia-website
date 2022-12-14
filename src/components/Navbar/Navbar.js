import React, { useEffect, useState } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.jpg'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        setUser(null)
        // navigate('/')
        window.location.reload()
    }

    useEffect(() => {
        const token = user?.token

        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' style={{ textDecoration: 'none' }} className={classes.brandContainer}>
                <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
                {/* <img className={classes.image} src={memories} alt="memories" height='60'></img> */}
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ?
                    (<div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button className={classes.logout} variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                    ) : (
                        <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar

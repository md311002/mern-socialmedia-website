import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles'
import LockOutLinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../../actions/auth'
// import { GoogleLogin } from 'react-google-login'
// import Icon from './Icon';

const Auth = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFromData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' })
    const navigate = useNavigate()
    const handelShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handelSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData, navigate))
        }
        else {
            dispatch(signIn(formData, navigate))
        }
    }

    const handelChange = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prev) => !prev)
        setShowPassword(false)
    }

    // const googleSuccess = async (res) => {
    //     console.log(res)
    // }

    // const googleFailure = (error) => {
    //     console.log(error)
    //     console.log('Try again later')
    // }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon></LockOutLinedIcon>
                </Avatar>
                <Typography>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handelSubmit}>
                    <Grid spacing={2} container
                    >
                        {
                            isSignup && (
                                <>
                                    <Input name='firstname' label="First Name" handelChange={handelChange} autoFocus half></Input>
                                    <Input name='lastname' label="Last Name" handelChange={handelChange} half></Input>
                                </>
                            )
                        }
                        <Input name='email' label='Email Address' handelChange={handelChange} type='email'></Input>
                        <Input name='password' label='Password' handelChange={handelChange} type={showPassword ? 'text' : 'password'} handelShowPassword={handelShowPassword}></Input>
                        {isSignup && <Input name='confirmPassword' label='Confirm Password' handelChange={handelChange} type='password'></Input>}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    {/* <GoogleLogin
                        clientId='93513205363-icnm1qcs5pjuotu3f85elptg08fgf7mf.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    /> */}
                    <Grid container justifyContent='center'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}

export default Auth

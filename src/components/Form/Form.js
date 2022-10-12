import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useNavigate } from 'react-router-dom'


const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    })
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])

    const classes = useStyles();

    const handelSubmit = (e) => {
        e.preventDefault();
        if (!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate))
        }
        else {
            dispatch(updatePost(currentId, postData));
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center '>
                    Sign In to create post
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper} elevation={6}>
            <form onSubmit={handelSubmit} className={`${classes.form} ${classes.root}`} noValidate autoComplete='off'>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} A Memory</Typography>
                <TextField name='title' variant='outlined' label='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} fullWidth></TextField>
                <TextField name='message' variant='outlined' label='Message' value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} fullWidth></TextField>
                <TextField name='tags' variant='outlined' label='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} fullWidth></TextField>
                <div className={classes.fileInput}><FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='small' type='submit' fullWidth>Submit</Button>
                <Button className={classes.buttonSubmit} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form

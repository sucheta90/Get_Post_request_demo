const { createSecretKey } = require('crypto');
const express = require('express');
// I am creating an express application
const app = express();
const path = require('path');
const {v4: uuidv4} = require('uuid');
const methodOverride = require('method-override')


// Instruct express to treat a post request which has _method query parameter and 
// use its value to determine the HTTP verb to apply, ignoring the request's actual HTTP method
// this is done to facilitate patch/put/delete requests to be submitted from HTML form
// which does not support thse HTTP verbs
app.use(methodOverride('_method'));
// asking express app to use urlencoded middleware for all calls
app.use(express.urlencoded({extended: true}));
// asking express app to use json middleware for all calls
app.use(express.json());
// asking express app to use ejs as template engine
app.set('view engine', 'ejs');
// asking express app to search templates from current_dir/views
app.set('views', path.join(__dirname, 'templates'));



const comments = [
    {   
        id: uuidv4() ,
        username: 'Todd',
        comment:'lol that is so funny'
    },
    {
        id: uuidv4(),
        username:'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuidv4(),
        username:'Sk8erBoi',
        comment:'Plz delete your accounr, Todd',
    },
    {
        id: uuidv4(),
        username:'onlysayswoof',
        comment:'woof woof woof'
    }
]

app.get('/comments', (req, res ) =>{
    res.render('comments/index', {comments})
})
app.get('/comments/new', (req,res)=>{
    res.render('comments/new');
})

app.post('/comments',(req,res)=>{
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuidv4()});
    res.redirect('/comments');
})

app.get('/comments/:id', (req,res)=>{
    const {id} = req.params ; 
    const comment = comments.find(c => c.id === id);
    console.log(comment)
    console.log(id)
    res.render('comments/show', {comment})
})

app.patch("/comments/:id", (req,res)=>{
    const {id} = req.params ; 
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id); 
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})
app.get('/comments/:id/edit', (req,res)=>{
    const{id} =req.params;
    const comment = comments.find(c=> c.id === id);
    res.render('comments/edit', {comment});
})

app.get('/tacos', (req,res)=>{
    res.send('GET / taco response')
})

app.post('/tacos', (req,res)=>{
    console.log(req.body)
    res.send('Post/ tacos response')
})


 



app.listen(3000, ()=>{
    console.log('On Port 3000')
})


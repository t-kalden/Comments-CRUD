import express from 'express';
import path from 'path';
import { v4 as uuid } from 'uuid';
import methodOverride from 'method-override';


const app = express();
const __dirname = path.resolve();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


let comments = [
    {   
        id : uuid(),
        username : 'Todd',
        comment : 'lol thats so funny'
    },
    {
        id : uuid(),
        username : 'Skyler',
        comment : 'i love my dog'
    },
    {
        id : uuid(),
        username : 'Sk8erboi',
        comment : 'radical af '
    },
    {   
        id : uuid(),
        username : 'doggy',
        comment : 'Woof woof woof'
    }
]

app.get('/comments', (req,res) => {
    res.render('comments/index.ejs', {comments});
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new.ejs');
})

app.post('/comments', (req,res) => {
    const { username, comment } = req.body;
    comments.push({username,comment, id : uuid()});
    res.redirect('/comments')
})

app.get('/comments/:id', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show.ejs', { comment });
})

app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const existingComment = comments.find(c => c.id === id);
    existingComment.comment = newCommentText;
    res.redirect('/comments');
}) 

app.get('/comments/:id/edit', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit.ejs', { comment });
})

app.delete('/comments/:id' ,(req,res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
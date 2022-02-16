const express= require("express");
const path= require("path");
const mongoose= require("mongoose");
const bodyParser= require('body-parser');
const Post= require('./database/models/Post');
const fileUpload= require('express-fileupload');
const expressSession= require('express-session');
const connectMongo= require('connect-mongo');
const connectFlash = require("connect-flash");
const edge = require("./node_modules/edge.js");
const app= new express();


mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
        .then(() => console.log('You are now connected to Mongo!'))
        .catch(err => console.error('Something went wrong', err))



const createPostController= require('./controllers/createPost');
const homePageController= require('./controllers/homePage');
const getPostController= require('./controllers/getPost');
const storePostController= require('./controllers/storePost');
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logout");
const likePostController= require('./controllers/likePostController');

app.use(express.static('public'));
const port= 3000;


app.use(expressSession({
    secret: 'AtharvBlog',
    store: connectMongo.create({ mongoUrl: 'mongodb://localhost:27017/node-blog' }),
    saveUninitialized: false,
	resave: false
    
}));



app.set('view engine', 'ejs');
// app.use('*', (req, res, next) => {
//     edge.global('auth', req.session.userId);
//     next();
// });

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const storePost = require('./middleware/storePost');
const auth = require("./middleware/auth");
const setUserVal= require('./middleware/setUserVal');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
app.use('/posts/store', storePost);

app.use(connectFlash());


app.get("/",setUserVal,homePageController);

app.get("/about",setUserVal,(req,res)=>{
    res.render('about');
});



app.get('/contact',setUserVal, (req, res) => {
    res.render('contact');
});

// app.get('/post', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'pages/post.html'));
// });

app.get('/posts/new',auth,setUserVal, createPostController);

app.post('/store/:userId',auth,setUserVal, storePostController);

app.get('/ppost/:id',setUserVal, getPostController);

app.get("/auth/register",redirectIfAuthenticated,setUserVal, createUserController);

app.post("/users/register",redirectIfAuthenticated,setUserVal, storeUserController);

app.get('/auth/login',redirectIfAuthenticated,setUserVal ,loginController);

app.post('/users/login',redirectIfAuthenticated,setUserVal, loginUserController);

app.get("/auth/logout", setUserVal, logoutController);

//app.get('/post/like',auth,setUserVal, likePostController.getLike);

app.post('/post/like/',setUserVal, likePostController.changeLike );

app.listen(port, ()=>{
    console.log(`listening at the port ${port} `);
});


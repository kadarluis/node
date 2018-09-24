const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const User =  require('./models/user').User;
const router_app = require('./routes_app');
const session_middleware = require('./middlewares/session');


//setting
app.set('view engine', 'jade');

//MIDLLEWARE
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true}));
app.use(session({
    secret:'1564165fdgsg1313',
    resave: false,
    saveUninitialized: false
}));
app.use('/app', router_app);
app.use('/app', session_middleware);

//ROUTES
app.get('/', (req,res)=>{
    console.log(req.session.user_id);
    res.render('index')
});

app.get('/signup', (req,res)=>{
    User.find((err,doc)=>{
        console.log(doc);
        res.render('signup');
    });
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/session', (req,res)=>{
    User.findOne({email: req.body.correo, password: req.body.password},(err,user)=>{
        req.session.user_id = user._id;
        res.redirect('/app')
    });
});

app.post('/users', (req,res)=>{
    const user = new User ({email: req.body.correo, 
                            password: req.body.password});
    user.save().then((us)=>{
        res.send('Guardamos la informacion exitosamente');
    },(err)=>{
        if(err){
            console.log(String(err));
            res.send('No se guardo la informacion');
        }
    });   
});
    // console.log('Usuario ingresado: '+ req.body.correo);
    // console.log('Contrasena ingresado: '+ req.body.password);
    // res.render('login')
app.listen(3000, ()=>{
    console.log('SERVIDOR ON');
    
});
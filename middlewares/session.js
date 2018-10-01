const User =  require('../models/user').User;

module.exports = (req, res) => {
    User.findOne({email:req.body.correo, password:req.body.password}, (err,user)=>{
        if(err){
            console.log('entro a error');
            console.log(err);
            res.redirect('/login');
        }
        if(!user){
            console.log('Tu usuario no existe');
            res.redirect('/login');
        }else{
            console.log(req.session.user_id);
            req.session.user_id = user._id;
            res.redirect('/app')
        }
    });
};
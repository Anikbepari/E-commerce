const express = require("express");
const  morgan = require('morgan');
const  bodyparser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

const islogedin = (req,res,next) => {
    const login = true;     

    if(login){
        req.body.id=101;
        next();
    }else{
        return res.status(401).json({message : 'please login first'});
    }
    
       
}; 

app.get('/test', (req, res) => {
    res.status(200).send({
        message: 'api testing is working ',
    });
});

app.get('/api/user',islogedin, (req, res) => {
    console.log(req.body.id);
    res.status(200).send({
        message: 'user profile is returned ',
    });
});

app.use((req,res,next) =>{
        res.status(404).json({message:'route not found'});
});
app.listen(3001, () => {
    console.log('server is running at http://localhost:3001');
});
  
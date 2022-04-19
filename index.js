//dependencies 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

//jwt secret
const JWT_SECRET = 'wuebhebicaovbaqivvbqaubvpuiqenabvubawnseivovebwhaevcobeyhsbavvowbibv';

//mongodb database connection
mongoose.connect("mongodb+srv://ankb223:rumni123@firstcluster.asqvg.mongodb.net/hopsicklezDB",{
    useNewurlParser: true,
    useunifiedTopology: true
})


//creating variable with database schema & model
const User = require('./model/verified_users');
const bcrypt = require('bcryptjs/dist/bcrypt');

//creating express app , introducing bodyparser & declaring listening port
const app = express();
app.use(bodyParser.json());
const PORT = 5000;

//declaring route paths using path dependency
app.use('/',express.static(path.join(__dirname,'static')));

//server running on port - listening command
app.listen(PORT,()=>{
    console.log("Express server is up");
});





//register api call
app.post('/register', async (req,res)=>{
    
    console.log(req.body);
    
    const { username , password: plainTextPassword} = req.body;
    
    //error handling
    if(!username || typeof username !== 'string'){
        return res.json({status:'error ', error:'Invalid Username'})
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status:'error ', error:'Invalid Password'})
    }


    //encrypting password with bcrypt and introducing salt to store in DB
    const password = await bcrypt.hash(plainTextPassword,10);


    //all conditions satisfied response scripting
    try{ 
        const response = await User.create({
            username ,
            password
        })
        console.log('User created Succesfully: ',response)

    } catch(error){

            //error handling
            if(error.code === 11000){ 
                res.json({status : 'error' , error: ' Username already in use'})
            }
            else{
                throw error;
        }
    }

    //sending status code for frontend page to read
    res.json({status:'ok'});
    
})


//login api call
app.post('/login' , async (req,res)=>{

    console.log(req.body);

    const { username , password : plainTextPassword } = req.body;

    const user = await User.findOne({username}).lean();

    //error handling
    if(!user){
        return res.json({status: 'error' , error : 'Invalid username/password'});
    }


    //checking password
    const passCheck = await bcrypt.compare(plainTextPassword,user.password);

    if(passCheck){

        const token = jwt.sign({

            id: user._id,
            username : user.username

        }, JWT_SECRET
        )

        //sending ok response
        return res.json({status:'ok',data : token});

    }

    //error handling
    res.json({status:'error', error: 'Invalid Username/Password'});

})



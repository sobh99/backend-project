import express from "express"
import bcrypt from "bcrypt"

const app = express()
const port = 3000;

const users = [];

app.use(express.json())

app.post('/register', async (req, res)=>{

    try{
        const{ email, password } = req.body
        const findUser = users.find((data)=> email == data.email)
        if(findUser){
            res.status(400).send("Wrong email or password !")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        users.push({email, password:hashedPassword});
        console.log(users)
        res.status(201).send("Registered Successfully !");


    }catch(err){
        res.status(500).send({message:err.message});
    }
});

app.post('/Login', async (req, res)=>{

    try{
        const{ email, password } = req.body
        const findUser = users.find((data)=> email == data.email)
        if(!findUser){
            res.status(400).send("Wrong email or password !")
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if(passwordMatch){
            res.status(201).send("Logged in Successfully !");
            
        } else{
            res.status(400).send("Wrong email or password !")
        }

    } catch(err){
        res.status(500).send({message:err.message});
    }
});

app.listen(port, () => {
    console.log("Server is started on port 3000")
})
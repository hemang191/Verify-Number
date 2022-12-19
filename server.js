const express = require('express') ; 
const fetch = require('cross-fetch') ; 
const bodyParser = require('body-parser') ; 
const dotenv = require('dotenv') ; 

dotenv.config() ; 


const app = express() ;

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine" , "ejs") ; 

app.get('/' , (req , res)=>
{
  res.sendFile(__dirname + "/entry.html"); 
})

 
app.post('/', (req , res)=>
{
  
  let number = req.body.number; 
  const url = `https://phonenumbervalidatefree.p.rapidapi.com/ts_PhoneNumberValidateTest.jsp?number=${number}&country=IN`;
  
  
  async function data()
  {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': 'phonenumbervalidatefree.p.rapidapi.com'
      }
    };
    const response = await fetch(url,options) ; 
    
    const data  = await response.json() ;

    const isValid = data.isValidNumber ; 
    const carrier = data.carrier ; 

    res.render('data' , {isValid , carrier}) ; 
  }
  data() ; 

})

const PORT = process.env.PORT ; 


app.listen(PORT  , ()=>
{
    console.log(`connected to port no ${PORT}`) ; 
})
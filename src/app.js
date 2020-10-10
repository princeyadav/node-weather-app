const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//path set up
const PublicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//handler set up
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(PublicDirectorypath))


app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Prince Yadav'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Prince Yadav'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'Must provide an Address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitute, location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude, longitute, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                temp:forecastData.temp,
                description:forecastData.description,
                name:forecastData.name,
                location,
                address:req.query.address
                
            })
        })
        
    })
    
})



app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Prince Yadav',
        errorname:'Page not found!'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})


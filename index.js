const express=require('express')
const hbs = require("hbs")
const app = express()
const port = 9090

app.set('view engine', 'hbs')

hbs.registerHelper('isFriend',
function(friend){
    var value;
    if(friend)
        value ='Unfriend';
    else value = 'Add Friend';
    return value;
})

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
var usernames= "Default";
var ids= "Default";
app.get('/profile', function(req,res){res.render('profile',{
    title: 'About Me',
    name: 'Carlo Luis Santos',
    id: '118',
    degree: 'BSCS-ST',
    bio: 'Carlo is a student of the College of Computer Studies and is very active member of multiple organizations.'
})})
app.get('/', function(req,res){res.render('index',{})})
app.get('/post', function(req,res){res.render('post',{
    forumtitle: '[Martial Law] What if Marcos never declared Martial Law?',
    forumdate: 'February 28, 2020',
    forumauthor: 'Carlobear',
    forumpost:"What if Marcos never declared Martial Law and stepped down in '73? Would we have seen a President Ninoy Aquino? Would we have been a vastly different country today (socially and/or economically), or would it be more of the same? I'd like to know your thoughts on this.",
    forumreact: 999,
    commentcount: 2
})})
app.get('/activities', function(req,res){res.render('activities',{
    title: 'Extra Curricular Activities',
    orgs: [{
        name: 'Alyansang Tapat Sa Lasallista',
        position:'College of Computer Studies Governor'},
        {
        name: 'Computer Studies Government',
        position:'Chief of Staff'},
        {
        name: 'La Salle Computer Society',
        position:'Associate Vice President Human Resource Development'}],
})})
app.listen(port, function(){
    console.log('App listening at port ' + port)
})
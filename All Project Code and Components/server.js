const express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


var pgp = require('pg-promise')();

let dbConfig = {
 	host: 'localhost',
 	port: 5432,
 	database: 'tierio',
 	user: 'postgres',
 	password: 'secret'
};

const isProduction = process.env.NODE_ENV === 'production';
dbConfig = isProduction ? process.env.DATABASE_URL : dbConfig;
let db = pgp(dbConfig);

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory





//client.connect();
//console.log("connected");


//app.set('port', process.env.PORT || 3000);

// LEADERBOARD
// gets the top limit tierlists within a certain category
app.get('/leaderboard', function (req, res, next) {
    var category = req.query.category_input;
    //category = 'food';
    console.log(category);
    var limit = 10;
    var sql = "SELECT * FROM tierlists WHERE category = \'" + category + "\' ORDER BY votes DESC LIMIT " + limit + ";";
    console.log(sql);
db.task('get-everything', task => {
        return task.batch([
            task.any(sql)
        ]);
    })
    .then(info => {
//console.log(info);
    res.render('leaderboard',{
my_title: "Leaderboard",
data: info[0]
})
    })
    .catch(err => {
            console.log('error', err);
            res.render('leaderboard', {
                my_title: 'Leaderboard',
                data: '',
            })
    });  
});
// upvote and downvote, change votes
// add tier list to the database
// app.post('/leaderboard', function (req, res, next) {
//     var tierlistid = req.body.tierlistid;
//     var newVotes = req.body.newVotes;
//     var sql = "UPDATE tierlists SET votes = " + newVotes + " WHERE tierlistid = " + tierlistid;
//     console.log(sql);
//     db.task('get-everything', task => {
//         return task.batch([
//             task.any(sql)
//         ]);
//     }) 
//     .then(info => {
//     	res.render('/create_tier_list',{
// 				my_title: "Make List",
//                 data: info[0],
//                 id: info[0].tierlistid
// 			})
//     })
//     .catch(err => {
//             console.log('error', err);
//             res.render('/create_tier_list', {
//                 my_title: 'Make List',
//                 data: ''
//             })
//     });
    
// });

// SEARCH
// search in the datavase based on a parameter givin a search string
app.get('/search', function (req, res, next) {
    var parameter = req.query.search_by_input;
    var searchString = req.query.search_string_input;
    //var parameter = 'category';
    //var searchString = 'food';
    console.log(parameter);
    console.log(searchString);
    var sql = "SELECT * FROM tierlists WHERE " + parameter + " = \'" + searchString + "\';";
    console.log(sql);
db.task('get-everything', task => {
        return task.batch([
            task.any(sql)
        ]);
    })
    .then(info => {
//console.log(info);
    res.render('search',{
my_title: "Search",
data: info[0],
search_by: parameter,
search_string: searchString

})
    })
    .catch(err => {
            console.log('error', err);
            res.render('search', {
                my_title: 'Search',
                data: '',
                search_by: parameter,
search_string: searchString
            })
    });  
});

// VIEW
app.get('/view', function (req, res, next) {
    var id = req.query.id_val;
    var newVotes = req.query.newVotes;
    var votes = "SELECT * FROM tierlists WHERE tierlistid = 0;";
    if(!newVotes){
    votes = "SELECT * FROM tierlists WHERE tierlistid = 0;";
    }else{
        votes = "UPDATE tierlists SET votes = (SELECT votes FROM tierlists WHERE tierlistid = "+id+") +" + newVotes + " WHERE tierlistid = " + id + ";";
        //votes = "SELECT * FROM tierlists WHERE tierlistid = 0;";
    }
    var sql = "SELECT * FROM items WHERE tierlistID = " + id;
    var tier = "SELECT * FROM tierlists WHERE tierlistID = " + id;
   
    console.log(votes);
    console.log(newVotes);
db.task('get-everything', task => {
        return task.batch([
            task.any(votes),
            task.any(sql),
            task.any(tier)
        ]);
    })
    .then(info => {
//console.log(info);
    res.render('view',{
my_title: "Search Items",
                items: info[1],
                data: info[2]
})
    })
    .catch(err => {
            console.log('error', err);
            res.render('view', {
                my_title: 'Search Items',
                data: '',
            })
    });
});

// CREATE TIER LIST
app.get('/create_tier_list', function(req, res) {
    //console.log("in create get");
    var id = "SELECT MAX(tierlistid) FROM tierlists";
    console.log(id);
    db.task('get-everything', task => {
        return task.batch([
            task.any(id)
        ]);
    }) 
    .then(info => {
        console.log(info[0][0].max);
        res.render('create_tier_list', {
            tierId: info[0][0].max
        })
    })
    .catch(err => {
        console.log('error', err);
        res.render('create_tier_list');
    });
});

// add tier list to the database
// app.post('/login', function (req, res, next) {
//     var category = req.body.newCategory;
//     var creator_name = req.body.newCreator;
//     var tierlist_name = req.body.newName;
//     var num_ranks = 10;
//     // var creator_name = 'allison';
//     // var tierlist_name = 'test';
//     // var category = 'food';
//     // console.log(category);
//     // console.log(creator_name);
//     // console.log(tierlist_name);
//     // console.log(num_ranks);
//     //var rank1 = req.query.tRank1;
//     //var rank2 = req.query.tRank2;
//     //var rank3 = req.query.tRank3;
//     //var rank4 = req.query.tRank4;
//     //var rank5 = req.query.tRank5;
//     //var rank6 = req.query.tRank6;
//     //var rank7 = req.query.tRank7;
//     //var rank8 = req.query.tRank8;
//     //var rank9 = req.query.tRank9;
//     //var rank10 = req.query.tRank10;
//     var votes = 0;
//     var sql = "INSERT INTO tierlists (category, creator_name, tierlist_name, num_ranks, rank1, rank2, rank3, rank4 ,rank5, rank6, rank7, rank8, rank9,rank10, votes) VALUES (\'" + category + "\',\'" + creator_name + "\',\'" +  tierlist_name+ "\'," +  num_ranks+ "," + "\'\'," + "\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," + votes + ")";
//     console.log(sql);
//     db.task('get-everything', task => {
//         return task.batch([
//             task.any(sql)
//         ]);
//     }) 
//     .then(info => {
//     	res.sendFile(__dirname+ '/views/create_tier_list.html');
//     })
//     .catch(err => {
//         console.log('error', err);
//         res.sendFile(__dirname+ '/views/create_tier_list.html');
//     });
    
// });







app.post('/login', function (req, res, next) {
    var category = req.body.inputCategory;
    var creator_name = req.body.inputUser;
    var tierlist_name = req.body.inputListName;
    var num_ranks = 10;
    console.log(category);
    console.log(creator_name);
    console.log(tierlist_name);

    var votes = 0;
    var sql = "INSERT INTO tierlists (category, creator_name, tierlist_name, num_ranks, rank1, rank2, rank3, rank4 ,rank5, rank6, rank7, rank8, rank9,rank10, votes) VALUES (\'" + category + "\',\'" + creator_name + "\',\'" +  tierlist_name+ "\'," +  num_ranks+ "," + "\'\'," + "\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," +"\'\'," + votes + ")";
    //var id = "SELECT MAX(tierlistid) FROM tierlists";
    console.log(sql);
    db.task('get-everything', task => {
        return task.batch([
            task.any(sql)
        ]);
    }) 
    .then(info => {
        //console.log(info[1][0].max);
        res.redirect('create_tier_list');
    })
    .catch(err => {
        console.log('error', err);
        res.redirect('create_tier_list');
    });
    
});



// get them itemsss and add ranks
app.post('/create_tier_list', function (req, res, next) {
    //console.log(req)
    var tTierlistID = req.body.tTierlistID;
    var ranking = req.body.tRanking;
    var color = req.body.tColor;
    var item_name = req.body.tItem_name;
    var rankIndex = req.body.rankIndex;
    //var numberRanks = req.body.numRanks;
    var numberOfRows = req.body.numRows;
    //make a select query to check if the item exists
    //var select = "SELECT * FROM tierlist WHERE tierlistid = tierlistID AND rank" + rankIndex + " = " + ranking + ";";
    // add item
    var sql = "INSERT INTO items(tierlistID, ranking, color, item_name) VALUES (" + tTierlistID + ", \'" +  ranking + "\',\'" + color + "\',\'" + item_name + "\')";
    var rankName = "UPDATE tierlists SET rank" + rankIndex+ " = '"+ ranking+"' WHERE tierlistid=" + tTierlistID +";";
    var numRanks = "UPDATE tierlists SET num_ranks = " + numberOfRows +" WHERE tierlistid=" + tTierlistID +";";;
    console.log(sql);
    console.log(rankName);
    console.log(numRanks);
    db.task('get-everything', task => {
        return task.batch([
            task.any(sql),
            //task.any(select),
            task.any(rankName),
            task.any(numRanks)
        ]);
    })
    .then(info => {
        //res.render('create_tier_list');
    })
    .catch(err => {
        console.log('error', err);
        //res.render('create_tier_list');
    });
    
});
// LOGIN
app.get('/login', function(req, res) {
	res.render('login',{
		my_title:"Login"
	});
});
// HOME PAGE
app.get('/', function(req, res) {
	//res.sendFile(__dirname+'/views/home_page.html');
	res.render('home_page');
});
app.get('/home_page', function(req, res) {
	//res.sendFile(__dirname+'/views/home_page.html');
	res.render('home_page');
});

//app.listen(3000);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

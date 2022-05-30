//File that includes part of the create_tier_list.html functionality
var tierlist_id = -1; // tierlist_id so items and ranks could be changed
var rowNum = 5;
// called when initial tierlist items are created
function create_list() {
    //console.log("here")
    // set tier list main values
    // get and store tierlist id 
    // var name = document.getElementById("inputListName").value;
    // var creator = document.getElementById("inputUser").value;
    // var category = document.getElementById("dropdownMenuButton").value;
    // //console.log(document.getElementById("category_type").value);
    // console.log(name);
    // console.log(creator);
    // console.log(category);
    // $(document).ready(function() {
    //     $.ajax({type:'POST', url:'http://localhost:8080/login', dataType:'jsonp', data: {newName:name, newCreator:creator, newCategory:category} }).then(function(data) {
    //         console.log()
    //     });
    // });
    console.log("here")
}
// called when the tierlist is finished and the user presses submit
function submit_list(tierId) {
  //console.log(tierId);
    // get all tier list items and ranks
    // store all items in the database items table
    // add the ranks to the database tierlist table
    var tempID = "";
    $(document).ready(function() {
        for (var i = 0; i < rowNum; i++)
        {
            var rowNumber = i+1;
            tempID = 'row' + rowNumber;
            var rank = document.getElementById(tempID).innerHTML;
            tempID2 = 'cell' + rowNumber;
            var rankCard = document.getElementById(tempID2);
            //console.log(rankCard);
            //console.log(rankCard.childElementCount);
            for (var j = 1; j < rankCard.childElementCount; j++)
            {
                // get items from the rank card
                var child = rankCard.children[j];
                console.log(child);
                //console.log(child.id);
                //console.log(document.getElementById(child.id).lastChild.firstChild.data);
                var itemName = document.getElementById(child.id).lastChild.firstChild.data

                $.ajax({url:"http://tierio.herokuapp.com/create_tier_list", dataType:"json", method:'post', data: {tTierlistID: tierId, tRanking:rank, tItem_name: itemName, rankIndex: rowNumber, numRows: rowNum }}).then(function(data) {
                })
            }
        }
    })
    alert("Thank you for submitting a tierlist!");
    
}

//function to delete items from the table
function delItem(nameID) {
    document.getElementById(nameID).remove();
}


//function to add card element to table
//TODO error is that when the card is inserted, it displays the user's input for a few frames, then the card disappears
//The card goes to the correct row
/*function plusItem() {
    //iName is 'item name' since 'name' is a reserved word
    var iName = document.getElementById("itemName").value;
    var des = document.getElementById("itemDes").value;
    var item = $('<div id="' + iName + '" class="card" style="width: 18rem"><button onclick="deleteCard(\'' + iName + '\')" type="button" class="btn btn-danger btn-circle btn-sm">delete</button><div class="card-body"><h4 class="card-title" id="itemName">'+iName+'</h4><p class="card-text" id="itemText">'+des+'</p></div></div>');
    var cell = "cell" + cellNum;
    item.appendTo(document.getElementById(cell));
}*/

var counter = 0;

function addElement (id) {  // this adds a card element but not horizontally
    counter++;
    var i_id = id + "" + counter;
    var insertItem = $('<div id="' + i_id + '" class="card" style="width: 18rem"><button onclick="deleteCard(\'' + i_id + '\')" type="button" class="btn btn-danger btn-circle btn-sm">delete</button><p class="card-text" id="itemText" contenteditable = "true">Sample Item Text</p></div></div>');
    // create a new div element
    insertItem.appendTo(document.getElementById(id));
	console.log(i_id);
}

function deleteCard(id) {
	console.log(id);
	document.getElementById(id).remove();
}


//function to open the form that add items to the table
function openform(cellID){
    cellNum = cellID;
    document.getElementById("form").style.display = 'block';
    event.preventDefault();
}

//function to hide a row
function sub_row() {
    var itemID = "tr" + rowNum;
    document.getElementById(itemID).style.display = 'none';
    event.preventDefault();
    rowNum--;
}

//function to show a row
function add_row(){
    rowNum++;
    var itemID = "tr" + rowNum;
    document.getElementById(itemID).style.display = '';
    event.preventDefault();

}

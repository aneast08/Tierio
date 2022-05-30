// js file to load and display tierlist

// get the tierlist_id from the search page?
// get and display tierlist given the tierlists id in the database
function build(tierlist_id)
{
    $(document).ready(function() {
        $.ajax({url:"localhost:3000/view_tier_list", dataType:"jsonp"},method='get').then(function(data,items) {
            // get all ranks and add them to an array
            var ranks = []
            ranks.push(data.rank1);
            ranks.push(data.rank2);
            ranks.push(data.rank3);
            ranks.push(data.rank4);
            ranks.push(data.rank5);
            ranks.push(data.rank6);
            ranks.push(data.rank7);
            ranks.push(data.rank8);
            ranks.push(data.rank9);
            ranks.push(data.rank10);
            // loop rthrough the needed ranks
            for (var i = 0; i < data.numRanks; i++)
            {
                //update the rank name 
                var row = i+1;
                var rank_id = "cell" + row;
                var rank_name_id = "row" + row;
                document.getElementById(rank_name_id).innerHTML = ranks[i];
                //search through items and look for the rank and add them if there is a match
                items.forEach(function(item,index) {
                    
                    if (item.ranking == rank[i])
                    {
                        var item_id = "item" + index; // create item id
                        addElement(item_id,item.item_name,rank_id);
                    }
                });
            }
            // hide the remaining rank rows that werent used
            for (var i = data.numRanks; i <= 10; i++)
            {
                var itemID = "tr" + i;
                document.getElementById(itemID).style.display = 'none';
                event.preventDefault();
            }
        })
    })
}

// for now this is a copy from create_tier.js å
function addElement (i_id,name, r_id) {  // this adds a card element but not horizontally 
    var insertItem = $('<div id="' + i_id + '" class="card" style="width: 18rem"><button onclick="deleteCard(\'' + i_id + '\')" type="button" class="btn btn-danger btn-circle btn-sm">delete</button><p class="card-text" id="itemText" contenteditable = "true">' + name + '</p></div></div>');
    // create a new div element 
    insertItem.appendTo(document.getElementById(r_id));
	console.log(i_id);
}
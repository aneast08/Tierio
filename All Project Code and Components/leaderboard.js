// load in the
function addTopLists(categoryName)
{
    $(document).ready(function() {
        $.ajax({url:"localhost:3000/leaderboard", dataType:"jsonp"},method='get').then(function(data) {
            // for each list returned, add a card
            data.forEach(list)
            {
                if (list.category == categoryName) addTierCard(list.tierlist_name,list.creator_name,list.tierlistid, list.votes);
            }
        })
    })
}

// adds a card with the basic tierlist info and a button to load view_tier_list with the lists database id and a upvote downvote button
function addTierCard(name,creator,listId)
{
    // TODO
}
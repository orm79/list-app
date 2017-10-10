// By: Daniel Olsson <orol1600@student.miun.se>

simplist = {

  set: function() {
    
    var inputText = document.getElementById('textField').value;
    var itemList = simplist.get();
    
    var myList = [];
    
    //check that input is not empty
    if ( inputText.length > 0 ) {
      //push new inputText into itemList array
      itemList.push(inputText);
      //stringify itemList array and store in localStorage as storedList
      localStorage.setItem('storedList', JSON.stringify(itemList));
    }
    
    //reset the value of the input field to empty
    document.getElementById('textField').value = "";
    //render html to the user
    simplist.render();
   
    //todo: add description popup for "no empty strings allowed"
    return;
  },
  
  get: function() {
    
    //create empty array
    var itemList = [];
    
    //get stored list from localStorage
    itemListStr = localStorage.getItem('storedList');
    
    //if the list is not null parse into array
    if (itemListStr !== null) {
      itemList = JSON.parse(itemListStr);
      console.log(itemList);
    }
    
    return itemList;
  },

  del: function() {
    
    //get the itemlist via get() method
    var itemList = simplist.get();    
    
    //get the id for clicked button
    var id = this.getAttribute('id');
    
    //splice out the item
    itemList.splice(id, 1);
    
    //send the list back to storage
    localStorage.setItem('storedList', JSON.stringify(itemList));
    
    //re-render the view
    simplist.render();

    },

  render: function() {
    
    //get the itemlist via get() method
    var itemList = simplist.get();
    var markup = "";
    
    //for each item in the list array save to markup string
    for (var i = 0; i < itemList.length; i++) {
      markup += '<div id="' + i + '" class="panel panel-default clearfix">\n' +
        '<div class="panel-body clearfix">' + itemList[i] + '</div>\n' + 
          '<div class="panel-footer clearfix"><button class="' +
          'btn btn-lg btn-danger pull-right del">Delete</button></div></div>\n';
    }

    //change the innerHTML of listcontent to our new markup
    document.getElementById('listContent').innerHTML = markup;
    
    //add eventlisteners to all rendered delete buttons
    var delBtns = document.getElementsByClassName('del');
    for (var i = 0; i < delBtns.length; i++) {
      delBtns[i].addEventListener('click', simplist.del);
    }
  }

}

//if add item button is clicked, run set-method on simplist object
document.getElementById('addItemBtn').addEventListener('click', function(event) {
  event.preventDefault();
  simplist.set();
});

simplist.render();




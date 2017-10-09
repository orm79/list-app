simplist = {

  set: function() {
    
    var inputText = document.getElementById('textField').value;
    var itemList = simplist.get();
    
    listObj = {
      content: inputText,
      done: false
    }
    
    //check that input is not empty
    if ( inputText.length > 0 ) {
      //push new inputText into itemList array
      itemList.push(listObj);
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

  render: function() {
    
    var itemList = simplist.get();
    var markup = "";

    itemList.forEach(function(item, index) {
      markup += '<li id="' + index + '" class="list-group-item list-group-item-warning">' +
        item.content + '</li>\n';
    })
    // for (var i = 0; i < itemList.length; i++) {
    //   markup += '<li id="' + i + '" class="list-group-item list-group-item-warning">' +
    //     itemList[i].content + '</li>\n';
    // }

    document.getElementById('listUl').innerHTML = markup;
  }

}

//if add item button is clicked, run set-method on simplist object
document.getElementById('addItemBtn').addEventListener('click', function(event) {
  event.preventDefault();
  simplist.set();
});

simplist.render();




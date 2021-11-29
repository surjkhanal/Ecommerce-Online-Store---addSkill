let email = document.getElementById('email')

email.addEventListener('input', (event) => {
    if(event.target.value.indexOf('@')==-1) {
        event.target.style.border = "1px solid red"
    }else{
        event.target.style.border = ""
    }
})

let form = document.getElementById('search-form')
let searchField = form.getElementsByTagName('input')[0]
let history = {
    'Tomato':'',
    'Apple':''
}
autocomplete(searchField,history)
let containers = document.querySelectorAll('.container')

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let searchText = event.target['search'].value
    console.log(searchText)
    let type = event.target['product-type'].value
    if(type == 'fruit'){
        fn(containers[1],searchText)
    }else{
        fn(containers[0],searchText)
    }
    form.reset()
})

function fn(targetContainers,text){
    document.querySelectorAll('div.container').forEach(ctn=>{
        ctn.classList.add('hidden')
    })
    
    let target = document.querySelector('#result-target')
    target.innerHTML =''
    target.parentNode.classList.remove('hidden')
    
    
    history[text]=1
    autocomplete(searchField,history)
    text = text.toUpperCase()

        let cards = targetContainers.querySelectorAll('.col-sm-4')
        cards.forEach(card=>{
            let heading = card.querySelector('.panel-heading')
            heading.textContent = heading.textContent.toUpperCase()
            if(heading.textContent.indexOf(text)==0){
                target.appendChild(card.cloneNode(true));
            }
        })
        // console.log("History ",history)
}


let cards = document.querySelectorAll('.col-sm-4')
let c=0;
cards.forEach(card => {
    let time=0;
    let id;
    card.onmouseenter =(event)=>{
        timeStart = Date.now()
        id= setInterval(()=>{
            time+=0.1
        },100)
    }
    card.onmouseout=(event)=>{
        clearInterval(id)
        console.log("Hover :",time,"s")
    }
})



// W3 Imported for history/auto complete

function autocomplete(inp, arr) {
    arr = Object.keys(arr)
    console.log(inp,arr)

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("click", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        // if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
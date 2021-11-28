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
let containers = document.querySelectorAll('.container')
let history = []

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    let searchText = event.target['search'].value
    console.log(searchText)
    let type = event.target['product-type'].value
    if(type == 'fruit'){
        containers[0].style.display = "none"
        fn(containers[1],searchText)
    }else{
        containers[1].style.display = "none"
        fn(containers[0],searchText)
    }
})

function fn(targetContainers,text){
    text = text.toUpperCase()
    // targetContainers.innerHTML = ''
    if(text){
        history.push(text)
        let cards = targetContainers.querySelectorAll('.col-sm-4')

        console.log(cards)
        cards.forEach(card=>{
            let heading = card.querySelector('.panel-heading')
            heading.textContent = heading.textContent.toUpperCase()
            if(heading.textContent.indexOf(text)!=0){
                // card.style.display='none'
                card.remove()
            }
        })
        console.log("History ",history)
    }

}


let cards = document.querySelectorAll('.col-sm-4')
let c=0;
cards.forEach(card => {
    let timeStart;
    let timeEnd;
    card.onmouseenter =(event)=>{
        timeStart = Date.now()
        event.stopPropagation();
        card.onmouseout=(event)=>{
            card.onmouseout=''
            timeEnd = Date.now()
            console.log(timeEnd-timeStart)
        }
    }
})
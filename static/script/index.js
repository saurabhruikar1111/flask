console.log('very goodafternoon')
//alert('connection succesful')
// const el=document.createElement('input')
// document.body.appendChild(el)
// async function fetchdata(search) {
//     let response;
//     if(search!=''){

//             response = await axios.get('http://127.0.0.1:5000/',{
//             params:{
//                 stock_name:search
//             }
            
//         })
//         return response.data
    
//     }
//     return {}
//     // console.log(response.data)
    
// }


// const root = document.querySelector('.container')
// root.innerHTML = `
//     <label> <b> search for a stock </b> </label>
//     <input class = 'input' > 
//     <div class='dropdown'>  
//         <div class = 'dropdown-menu'>
//             <div class = 'dropdown-content results'>  </div>
//         </div>
//     </div>
// `
createautocomplete({
    root : document.querySelector('.autocomplete'),
    
    renderOption(stock) {
        return `
        <p>${stock}<p>
        `
    },

    onOptionselect(stocks,stock) {
        OnStockSelect(stocks,stock)
    },

    inputValue(stock) {
        return stock
    },
    async fetchdata(search){
        let response;
        if(search!=''){
    
                response = await axios.get('/f',{
                params:{
                    stock_name:search
                }
                
            })
            return response.data
        
        }
        return {}
        // console.log(response.data)
        
    }


})


// const input = document.querySelector('input');
// // const maindiv =document.querySelector('#target')
// const dropdown = document.querySelector('.dropdown');
// const resultWrapper = document.querySelector('.results');






// const oninput = async event =>{
//     const stocks=await fetchdata(event.target.value)
//     if(Object.keys(stocks).length==0){
//         dropdown.classList.remove('is-active')
//         return
//     }
    
//     dropdown.classList.add('is-active');
//     resultWrapper.innerHTML=''
//     console.log(stocks)
    
//     for (let stock in stocks){
//         const option = document.createElement( 'a')
//         option.classList.add('.dropdown-item')
//         option.innerHTML = `
//         <p>${stock}<p>
//         `
//         option.addEventListener('click',()=>{
//             input.value = stock
//             dropdown.classList.remove('is-active')
//             console.log(stocks[stock],222)
//             OnStockSelect(stocks[stock],stock)
//         })
        
//         resultWrapper.appendChild(option)
//     }
// }

// input.addEventListener('input',debounce(oninput,500))
// document.addEventListener('click',event=>{
//     if(!root.contains(event.target)){
//         dropdown.classList.remove('is-active')
//     } 
// })

const OnStockSelect = async (symbol,stock) =>{
    const res=await axios.get('/search', {
        params:{
            sym:symbol
        }
    } )
    console.log(res.data)
    document.querySelector('#summary').innerHTML=stocktemplate2(res.data,stock)
}

const stocktemplate = stockdata =>{
    console.log(stockdata.currentPrice)
    const {currentPrice,debtToEquity} = stockdata;
    console.log(currentPrice,debtToEquity);
    return `
        
    <article >
        <article class = 'notification is-primary'> 
        <p class='title'>  ${stockdata.currentPrice} </p>
        <p class='subtitle'>  currentprice </p>
        </article>

        <article class = 'notification is-primary'> 
        <p class='title'>  ${stockdata.debtToEquity} </p>
        <p class='subtitle'>  debtToEquity </p>
        </article>

        <article class = 'notification is-primary'> 
        <p class='title'>  ${stockdata.ebitdaMargins} </p>
        <p class='subtitle'>  ebitdaMargins </p>
        </article>

        <article class = 'notification is-primary'> 
        <p class='title'>  ${stockdata.pegRatio} </p>
        <p class='subtitle'>  pegRatio </p>
        </article>

        <article class = 'notification is-primary'> 
        <p class='title'>  ${stockdata.revenueGrowth} </p>
        <p class='subtitle'>  revenueGrowth </p>
        </article>
    </article>
    
    `
}

const stocktemplate2 = (stockdata,stock) =>{
    console.log('in the second template')
    const article = document.createElement('p')
    option=document.createElement('p')
    option.innerHTML=`<figure class='media-left'>
        <p class='notification is-success is-light is-size-4' >  ${stock} </p>                
    </figure>`
    console.log(stockdata)
    article.appendChild(option)
    
    //article.innerText='test string'
    for(const obj in stockdata){
        if(typeof(stockdata[obj])=='number'){
            console.log('in if statement')
            stockdata[obj]=stockdata[obj].toFixed(2);
        }
        const option=document.createElement('p')
        option.innerHTML=`<article class = 'notification is-primary'> 
        <p class='title'>  ${stockdata[obj]} </p>
        <p class='subtitle'>  ${obj} </p>
        </article>`
        article.appendChild(option)
    }
    console.log(stockdata)
    return article.innerHTML
}

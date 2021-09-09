const fs = require('fs/promises')
const data = require('./broken-database.json')



function changeNames(nameProduct){

    const productName =  nameProduct.map((product)=>{

       const namesProduct =  product.name

       const fixNames = namesProduct.replace(/[æ]/g,'a')
       .replace(/[¢]/g,'c')
       .replace(/[ø]/g,'o')
       .replace(/[ß]/g,'b')



       return fixNames
    })

    const jsonCorrectNames = data.map(getName=> getName.name = productName.shift())

    return jsonCorrectNames
  
}



function stringToNumber(productsPriceString) {

    const productPrice = productsPriceString.map((productsPrice)=>{
        
        const price = productsPrice.price
        
        return Number(price)

    })

    const jsonCorrectPrice = data.map(getPrice=> getPrice.price = productPrice.shift())

    return jsonCorrectPrice
}


function corrigeQtde(data){
    const qtde = data.map(item => {
        
        if(item.hasOwnProperty('quantity') === false){
           return item['quantity'] = 0
        }else{
            return item.quantity 
        }

    })

    return qtde

}

changeNames(data)
stringToNumber(data)
corrigeQtde(data)




const newDataBase = JSON.stringify(data)



function  promise() {
    return fs.writeFile('./saida.json', newDataBase)
}

 
async function  validate() {
    await promise()

    const saidaJson = require('./saida.json')
    
    console.log('---'.repeat(30))
    
    console.log("Filtro por categoria e Id\n")
    console.log(FilterCategoryAndId(saidaJson))
    
    console.log('---'.repeat(30))
    
    console.log("Quantidade por categoria\n")
    console.log(FilterQuantityByCategory(saidaJson))
}   

validate()

    



const FilterCategoryAndId = (json)=>{

    const sortByCategoryAndId = (a,b)=>{
        if(a.category < b.category){return -1}
        if(a.category> b.category){return 1}
        if(a.id < b.id){return -1}
        if(a.id > b.id){return 1}
    
        return 0
    }

    const result =  json.sort(sortByCategoryAndId)
  
      return result
  }


  const FilterQuantityByCategory = (json)=>{
    const categories = []
    
     json.map((product) => {
        const index = categories.findIndex((category) => category.category === product.category)

        
        const object = {
            category: product.category,
            quantityTotal: product.quantity * product.price
        }
        
        return index === -1
            ? categories.push(object)
            : categories[index].quantityTotal += product.quantity*product.price 
    })

    return categories
    
}


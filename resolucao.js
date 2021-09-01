const { sign } = require('crypto')
const fs = require('fs')
    
const data = require('./broken-database.json')


//-----------------Corrige name--------------------

function corrigeFrase(frase){
    const formatada = frase.replace(/[æ]/g,'a')
       .replace(/[¢]/g,'c')
       .replace(/[ø]/g,'o')
       .replace(/[ß]/g,'b')

   return formatada
}


const nameCorrigido = data
   .map(item=> item.name)
   .map(item=> corrigeFrase(item))

const produtosCorrigidos = data.map(item=>{
   return item.name=nameCorrigido.shift()
})


//-------------Fim name ---------------------------------------





//------------- PrecoStringToNumber----------------------------

function corrigePrice(priceString){
    const price = Number(priceString)
    return price
}

const precoCorrigido = data
   .map(item=> item.price)
   .map(item=> corrigePrice(item))


   const produtosCorrigidosPreco = data.map(item=>{
    return item.price=precoCorrigido.shift()
 })
 
//-----------------Fim price------------------------------







// Corrigir quantidade 0 ---------------------------------

function corrigeQtde(data){
    const qtde = data
    .map(item => item)
    .map(item => {
        if(item.hasOwnProperty('quantity') === false){
           return item['quantity'] = 0
        }else{
            return item.quantity 
        }

    })

    return qtde

}

corrigeQtde(data)

const newDataBase = JSON.stringify(data) 

fs.writeFile("./saida.json", newDataBase, (err)=>{
    if(err){
        console.log('err:', err)
    }
}) 
//fim quantidade 0 --------------------------------------------------



const saidaJson  = require('./saida.json')



const FiltraCategoriaAndId = (json)=>{
  const result =  json.sort((a,b)=>{
        if(a.category < b.category){return -1}
        if(a.category> b.category){return 1}
        if(a.id < b.id){return -1}
        if(a.id > b.id){return 1}
    
        return 0
    })

    return result
}

// const teste = saidaJson.map(item => {
//     const qtde = item.quantity
//     // let result;

//     if(item.category === item.category){
//      return  = item
//     }

   
    
// })


console.log(typeof teste)

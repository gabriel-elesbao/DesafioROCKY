
    
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

console.log(data)

// newArrayWords.map(item => {
//     if(correctWords.includes(item)){
//       return  console.log(item)
//     } else{
//         return item.toLocaleUpperCase
//     }
// })
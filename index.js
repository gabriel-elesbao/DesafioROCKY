
    
const data = require('./broken-database.json')



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





console.log(data)

// newArrayWords.map(item => {
//     if(correctWords.includes(item)){
//       return  console.log(item)
//     } else{
//         return item.toLocaleUpperCase
//     }
// })
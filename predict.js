import { createChart, updateChart } from "./scatterplot.js"




let nn = ml5.neuralNetwork({ task: 'regression', debug: true })
nn.load('./model/model.json', modelLoaded)

function modelLoaded(){
    console.log('model is loaded')
    
    //when results are ready

    
    
}

document.getElementById('submit').addEventListener('click', () => {
 predictPrice()
})

async function predictPrice(){
    let sqft = document.getElementById('sqft').value
    //convert to number
    sqft = parseInt(sqft)
    //get select option value
    let location = document.getElementById('neighborhood').value

    let bedrooms = document.getElementById('bedrooms').value
    bedrooms = parseInt(bedrooms)
    let bathrooms = document.getElementById('bathrooms').value
    bathrooms = parseInt(bathrooms)
    let brick = document.getElementById('brick').checked
    if(brick){
        brick = 'Yes'
    }
    else{
        brick = 'No'
    }


    let result = await nn.predict({ sqft, bedrooms, bathrooms, brick, location})
    console.log(result[0].value)
    //only show 2 decimals
    result[0].value = result[0].value.toFixed(2)
    document.getElementById('result').innerHTML = `The price of this house is  ${result[0].value} euros`


    
}



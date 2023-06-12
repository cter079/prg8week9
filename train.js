function loadData(){
    Papa.parse("./house-prices.csv", {
        download:true,
        header:true, 
        dynamicTyping:true,
        complete: results => console.log(results.data)
    })
}
loadData()

 

function checkData(data){


   

        // data voorbereiden
    data.sort(() => (Math.random() - 0.5))
    let trainData = data.slice(0, Math.floor(data.length * 0.8))
    let testData = data.slice(Math.floor(data.length * 0.8) + 1)

    let nn = ml5.neuralNetwork({ task: 'regression', debug: true })

    for(let house of trainData){
        nn.addData({ sqft:house.SqFt, bedrooms: house.Bedrooms, bathrooms:house.Bathrooms, brick:house.Brick, location:house.Neighborhood }, { price: house.Price })
    }
//trainen
    nn.normalizeData()

    let trainingOptions = {
        epochs: 17,
        batchSize: 25
    }

    nn.train(trainingOptions, test)

    nn.save()

    //test the data
    async function test(){
    let correct = 0
    
    for(let house of testData){
        if(house.Price == undefined){
            return
        }

        let houseWithoutPrice = { sqft:house.SqFt, bedrooms: house.Bedrooms, bathrooms:house.Bathrooms, brick:house.Brick, location:house.Neighborhood }
        console.log(houseWithoutPrice)
        

        
        let result = await nn.predict({ sqft: houseWithoutPrice.sqft, bedrooms: houseWithoutPrice.bedrooms, bathrooms:houseWithoutPrice.bathrooms, brick:houseWithoutPrice.brick, location:houseWithoutPrice.location})
        console.log(result[0].value)
        if(result[0].value > house.Price * 0.85 && result[0].value < house.Price * 1.15){
            console.log('correct')
            correct++
        }
        else{
            console.log('wrong')
        }
        console.log(`accuracy: ${correct / testData.length * 100}%`)


    }

}




}

loadData()

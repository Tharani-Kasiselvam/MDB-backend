const {MongoClient} = require('mongodb');

const connectToDB = async() => {
    const uri = `mongodb+srv://sherleytharani:Guvi2024@mangodbtmj.rmeyv9c.mongodb.net/?retryWrites=true&w=majority&appName=mangodbtmj`

        //Create a new Mongoclient
        const client = new MongoClient(uri)
        
    try{
        //Connect to the MongoDB cluster
        await client.connect()
        console.log("MongoDB connection success")

        //get the database
        const database = client.db('sample_airbnb')
        console.log("get database")


        //get the collection
        const collection = database.collection('listingsAndReviews')

        //create a query to list data which are related to Country Brazil
        const query = {'address.country':'Brazil'}

        //cursor to get the result
        let cursor = collection.find(query)

        //print documents 
        // await cursor.forEach(doc=>{
        //     console.log(doc)
        // })

        //count method usage (deprecate)
        const nooflist = await cursor.count();
        console.log("nooflist:",nooflist)

        //Querying againg to make the limit functionality work
        cursor = collection.find(query)

        // display result by converting toArray
        // const result = await cursor.toArray()
        
        //  using limit method
        // const result = await cursor.limit(5).toArray()

        //using both limit and sort [asc: 1, desc: -1]
        //ascending order
        // const result = await cursor.sort({price : 1}).limit(10).toArray()

        //descending order
        const result = await cursor.sort({price : -1}).limit(10).toArray()

        

        let data = result.map((values) =>{
                return [values.name,parseFloat((values.price).toString())]
            } 
        )
        console.log(data)

    }catch(error){
        console.log(error)
    }finally{
        //closing the DB connection
        await client.close()
    }
}
connectToDB()
// const simulateAsyncPause = () =>
//   new Promise(resolve => {
//     setTimeout(() => resolve(), 1000);
//   });


// export default async function runChangeStream(database,mongoClient) {
//   let changeStream;
//   try {
//     const ticketsCollection = await database.collection('tickets')
//     // open a Change Stream on the "haikus" collection
//     changeStream = ticketsCollection.watch();
//     // set up a listener when change events are emitted
//     changeStream.on("change", next => {
//       console.log("received a change to the tickets collection: \t", next.fullDocument);
//     });

//     await simulateAsyncPause();

//     await ticketsCollection.insertOne({
//       title: "Record of a Shriveled Datum",
//       content: "No bytes, no problem. Just insert a document, in MongoDB",
//     });
    
//     await simulateAsyncPause();

//     await changeStream.close();
//     console.log("closed the change stream");
    
//   } 
//   finally {
//     await mongoClient.close();
//   }
// }

const simulateAsyncPause = () =>
  new Promise(resolve => {
    setTimeout(() => resolve(), 1000);
  });


export default async function runChangeStream(database, mongoClient,socket) {
  let changeStream;
  try {
    const ticketsCollection = await database.collection('tickets')
    // open a Change Stream on the "haikus" collection
    changeStream = ticketsCollection.watch();
    // set up a listener when change events are emitted
    changeStream.on("change", next => {
      socket.compress(true).emit('ticketsUpdatedInDb', changes)
      console.log('ticketsUpdatedInDb in changeStream is working!');
    });

    // await simulateAsyncPause();

    // await ticketsCollection.insertOne({
    //   title: "Record of a Shriveled Datum",
    //   content: "No bytes, no problem. Just insert a document, in MongoDB",
    // });
    
    // await simulateAsyncPause();
    await changeStream.close();
  } catch (err) {
    console.log(err.message);
  } finally {
    await mongoClient.close();
  }
}

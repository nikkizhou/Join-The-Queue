// import React, { createContext, useState } from "react";

// // Create two context:
// // UserContext: to query the context state
// // UserDispatchContext: to mutate the context state
// const AppContext = createContext(undefined);
// const AppDispatchContext = createContext(undefined);

// // A "provider" is used to encapsulate only the
// // components that needs the state in this context
// function AppProvider({ children }) {
//   const [ticketsData, setTicketsData] = useState({
//     username: "John Doe"
//   });
//   //tickets for a spesific 

//   return (
//     <AppContext.Provider value={ticketsData}>
//       <AppDispatchContext.Provider value={setUserDetails}>
//         {children}
//       </AppDispatchContext.Provider>
//     </AppContext.Provider>
//   );
// }

// export { UserProvider, UserContext, UserDispatchContext };
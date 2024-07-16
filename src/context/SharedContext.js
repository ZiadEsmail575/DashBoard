import axios from "axios";
import { createContext, useState } from "react";





export let sharingContext = createContext();

export default  function SharedContextProvider(props) {

    const [transactions, setTransactions] = useState([]);

    const [customers, setCustomers] = useState([]);

    const [mixedData, setMixedData] = useState([]);

    const [searchResult ,setSearchResult ] = useState("");

    const [selectedCustomer, setSelectedCustomer] = useState(null);


    async function getCustomers (){
  
        await axios.get('https://ziadesmail575.github.io/customerApis/db.json').then(res=>setCustomers(res?.data?.customers))
        .catch(err=>console.error(err));
      
      
      };
      console.log(customers);
      async function getTransaction (){
        
        await axios.get('https://ziadesmail575.github.io/customerApis/db.json').then(res=>{setTransactions(res?.data?.transactions)
        }).catch(err=>console.error(err));
        
      };
      
function mixesData() {
    if (customers.length > 0 && transactions.length > 0) {

        const checkCustomersId = customers?.map(customer => ({
          ...customer,
          id: Number(customer?.id) 
          
        }));
        console.log(checkCustomersId);
        const checkTransactionssId = transactions.map(transaction => {
          const amount = Number(transaction?.amount);
          return {
            ...transaction,
            customer_id: Number(transaction?.customer_id),
            amount: isNaN(amount) ? 0 : amount 
          };
        });
    console.log(checkTransactionssId);
        const data = checkCustomersId.map(customer => {
          const customerTransactions = checkTransactionssId.filter(transaction => transaction?.customer_id === customer?.id);
          return {
            ...customer,
            transactions: customerTransactions
          };
        });
        setMixedData(data);
        
      }
}


  
 

const filteredData = mixedData.filter(customer => {
    const searchNumber = parseFloat(searchResult); 
      const isSearchNumber = !isNaN(searchNumber)
    return customer.name.toLowerCase().includes(searchResult.toLowerCase()) ||
    (isSearchNumber && customer.transactions.some(transaction => transaction.amount === searchNumber));
        
  });
  const result = filteredData.flatMap(customer => {
    const dailyTotals = {};
  
    customer.transactions.forEach(transaction => {
      const { date, amount } = transaction;
      
      if (!dailyTotals[date]) {
        
        dailyTotals[date] = 0;
      }
      
      dailyTotals[date] += amount;
    });
  
   let totalAmount = customer.transactions.reduce((acc, sum) => acc + sum.amount, 0)
    const dailyTotalsArray = Object.keys(dailyTotals).map(date => ({
      name: customer.name,
      date: date,
      amountPerDay: dailyTotals[date],
      totalAmount,
     
    }));
  
    return dailyTotalsArray;
  });








    return <sharingContext.Provider value={{transactions,result , setTransactions , customers , setCustomers , mixedData , setMixedData , searchResult , setSearchResult , getCustomers , getTransaction , mixesData , filteredData , selectedCustomer, setSelectedCustomer}}>
        {props.children}
    </sharingContext.Provider>
}




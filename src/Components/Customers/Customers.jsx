import React, { useContext, useEffect } from 'react';
import { sharingContext } from '../../context/SharedContext';




export default function Customers() {
  let {transactions  , customers,result    , searchResult , setSearchResult , getCustomers , getTransaction , mixesData , filteredData} = useContext(sharingContext)
    



useEffect(() => {
  

  getCustomers();
  getTransaction();
}, []);

useEffect(() => {
  mixesData()
}, [customers, transactions]);





console.log(customers);
console.log(transactions);




  return (<>
    
    <h1 className='text-center mb-4 p-3'>customer transactions</h1>
    <input value={searchResult} onChange={(e)=>setSearchResult(e.target.value)} type="text" placeholder='serach by name or transaction amount' className='form-control p-2 mb-4' />
    <table className='table table-bordered mb-5 border-5 rounded-3 border-dark p-2 text-center'>
        <thead className='bg-dark'>
            <tr>
            <th>Name</th>
            
            
            <th>TotalTransactions</th>
            
            </tr>
        </thead>
        <tbody>
      
            
        {filteredData.map((customer,i) => (
            <tr key={i}>
              <td>{customer?.name}</td>
              
              <td >{customer.transactions.reduce((acc, sum) => acc + sum.amount, 0)}</td>
            </tr>
          ))}
            



            
            
        </tbody>
    </table>
    </>
  )
}

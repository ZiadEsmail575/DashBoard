import React from 'react'
import Customers from '../Customers/Customers'
import Transactionsgraph from '../Transactions/Transactionsgraph'

export default function Layout() {
  return (
    <section>
      <div className="container p-5">
      <Customers/>
      <Transactionsgraph/>
      </div>
    </section>
  )
}

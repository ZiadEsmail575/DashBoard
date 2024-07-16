
import React, { useContext, useEffect} from 'react';

import { sharingContext } from '../../context/SharedContext';

import { Bar } from "react-chartjs-2";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Transactionsgraph() {

let { getTransaction ,result } = useContext(sharingContext)







let selectedName = result.map(elle => elle.name);
let selectedAmountPerDay = result.map(ele => ele?.amountPerDay)
let selectedDate = result.map(ele => ele.date)

useEffect(() => {
  getTransaction();
  
}, []);
console.log(result);


const labels = selectedName;

const data = {
labels:labels,
datasets: [
{
  
  maxBarThickness:"40",

label: `Transactions amount`,
backgroundColor: "rgb(00, 99, 132)",
borderColor: "rgb(00, 99, 132)",
data:  selectedAmountPerDay,
options:{
  maintainAspectRatio : false
}

},
],
};

return (
  
<div className="mb-3 p-3 m-auto" style={{height:"50vh" , width:"60vw" ,position:"relative"}}>
  <p className='text-center h5 mb-5'>Hover thr bar to know transactions per day amount</p>
<Bar  options={{maintainAspectRatio : false}} data={data} />

</div>

);


 }

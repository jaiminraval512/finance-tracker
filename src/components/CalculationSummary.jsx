import React from 'react'

export const CalculationSummary = ({transaction}) => {
   
        let totalExpense=0;
        let totalIncome=0;
        transaction.forEach((elem)=>{
            const amt= Number(elem.amount)  ||0;
            const type = elem.type?.toLowerCase().trim();
            if(type==='expense'||type==='debit'){
                totalExpense+=amt
            }
            else{
                 totalIncome+=amt;
              
            }
            
        })
        const totalBalance = totalIncome-totalExpense;
    
    

   
    
  return {totalBalance,totalExpense,totalIncome}
}
 
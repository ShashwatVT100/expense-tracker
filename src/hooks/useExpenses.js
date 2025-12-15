import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
const useExpenses=()=>{
    const [expenses,setExpenses]=useLocalStorage('expenses',[]);
    const addExpense=(expenseData)=>{
        const newExpense={
            id: Date.now(),
            ...expenseData,
            date:new Date().toISOString().split('T')[0]
        };
        setExpenses(prevExpenses=>[newExpense,...prevExpenses]);
    }
    const removeExpense=(id)=>{
        setExpenses(prevExpenses=>prevExpenses.filter(expenses=>expenses.id!==id));
    }
    const getTotalAmount=useMemo(()=>{
        return expenses.reduce((sum,expense)=>sum+expense.amount,0);
    },[expenses]);
    const getExpensesByCategory=(category)=>{
        if(!category||category==='all')return expenses;
        return expenses.filter(expense=>expense.category===category);
    }
    return{
        expenses,
        addExpense,
        removeExpense,
        getTotalAmount,
        getExpensesByCategory
    };
}
export default useExpenses;
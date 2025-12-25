import React,{useState} from 'react';
import useExpenses from './hooks/useExpenses';
import useFilters from './hooks/useFilters';
import './index.css';

function App() {
  const {expenses,addExpense,removeExpense,getTotalAmount}=useExpenses();
  const {filters,filteredData:filteredExpenses,updateFilter,clearFilters,getFilterSummary}=useFilters(expenses);
  const [description,setDescription]=useState('');
  const [amount,setAmount]=useState('');
  const [category,setCategory]=useState('food');
  const categories=['food','transport','entertainment','bills','shopping','others'];
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!description.trim()||!amount)return;
    addExpense({
      description:description.trim(),
      amount:parseFloat(amount),
      category
    });
    setDescription('');
    setAmount('');
  }
  return (
    <div className="App">
      <h1>Presonal Expense Tracker</h1>
      <form className='expense-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Description</label>
          <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='What did you spend on?' required/>
        </div>
        <div className='form-group'>
          <label>Amount</label>
          <input type='number' step='0.01' value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder='0.00' required/>
        </div>
        <div className='form-group'>
          <label>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            {categories.slice(1).map(cat=>(
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase()+cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Add Expense</button>
      </form>
      <div className='filters'>
        <div className='form-group'>
          <label>Filter By Category</label>
          <select value={filters.category} onChange={(e)=>updateFilter('category',e.target.value)}>
            {categories.map(cat=>(
              <option key={cat} value={cat}>
                {cat==='all'?'All Categories':cat.charAt(0).toUpperCase()+cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Search Description</label>
          <input type='text' value={filters.searchTerm} onChange={(e)=>updateFilter('searchTerm',e.target.value)} placeholder='Search expenses...'/>
        </div>
         <div className='form-group'>
          <label>Search Description</label>
          <input type='text' value={filters.searchTerm} onChange={(e)=>updateFilter('searchTerm',e.target.value)} placeholder='Search expenses...'/>
        </div>
        <div className='form-group'>
          <label>Max Amount</label>
          <input type='number' value={filters.maxAmount} onChange={(e)=>updateFilter('maxAmount',e.target.value)} placeholder='9.99'/>
        </div>
        {getFilterSummary.hasActiveFilters&&(
          <button onClick={clearFilters} style={{background:'#6c757d'}}>
            Clear Filters({getFilterSummary.activeCount})
          </button>
        )}
        <div style={{margin:'20px 0',padding:'10px',background:'#f8f9fa',borderRadius:'8px'}}>
          <p>
            Showing {getFilterSummary.totalResultes} of {expenses.length} expenses.
            {getFilterSummary.hasActiveFilters&&1 `(${getFilterSummary.activeCount} filter${getFilterSummary.activeCount!=='1'?'s':''} active)`}
          </p>
        </div>

      </div>
      <div className='expense-list'>
        {filteredExpenses.length===0?(
          <p style={{textAlign:'center',color:'#666',fontStyle:'italic'}}>{expenses.length===0?'No Expense yet. Add your first expense above!':'No expenses match your filter. Try adjusting your filter!'}</p>
        ):(<div>{
          filteredExpenses.map(expense=>(
            <div key={expense.id} className='expense-item'>
              <div className='expense-info'>
                <div className='expense-description'>
                  {expense.description}
                </div>
                <div className='expense-category'>{expense.category}</div>
                <div style={{color:'#666',fontSize:'14px'}}>{expense.date}</div>
              </div>
              <div className='expense-amount'>${expense.amount.toFixed(2)}</div>
              <button onClick={()=>removeExpense(expense.id)} style={{background:'#e53e3e',padding:'5px 10px',fontSize:'12px'}}>Delete</button>
            </div>
          ))}
        <div className='total-section'>
        <h2>Total Expenses</h2>
        <div className='total-amount'>${getTotalAmount.toFixed(2)}</div>
        {getFilterSummary.hasActiveFilters&&(
          <div style={{fontSize:'16px',color:'#666',marginTop:'10px'}}>
            Filtered Total: ${filteredExpenses.reduce((sum,expense)=>sum+expense.amount,0).toFixed(2)}
          </div>
        )}
        </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;

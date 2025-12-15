import { useState,useMemo } from "react";
const useFilters=(data)=>{
    const [filters,setFilters]=useState({
        category:'all',
        dateFrom:'',
        dateTo:'',
        minAmount:'',
        maxAmount:'',
        searchTerm:''
    });
    const updateFilter=(key,value)=>{
        setFilters(prevFilters=>({
            ...prevFilters,
            [key]:value
        }));
    };
    const clearFilters=()=>{
        setFilters({
            category:'all',
            dateFrom:'',
            dateTo:'',
            minAmount:'',
            maxAmount:'',
            searchTerm:''
        });
    };
    const filteredData=useMemo(()=>{
        return data.filter(item=>{
            if(filters.category!=='all'&&item.category!==filters.category){
                return false;
            }
            if(filters.dateFrom&&item.date<filters.dateFrom){
                return false;
            }
            if(filters.dateTo&&item.date>filters.dateTo){
                return false;
            }
            if(filters.minAmount&&item.amount<parseFloat(filters.minAmount)){
                return false;
            }
            if(filters.maxAmount&&item.amount>parseFloat(filters.maxAmount)){
                return false;
            }
            if(filters.searchTerm&&!item.description.toLowerCase().includes(filters.searchTerm.toLowerCase())){
                return false;
            }
            return true;
        });
    },[data,filters]);
    const getFilterSummary=()=>{
        const activeFilters=Object.entries(filters).filter(([key,value])=>{
            if(key==='category') return value!=='all';
            return value!=='';
        });
        return{
            activeCount:activeFilters.length,
            totalResult:filteredData.length,
            hasActiveFilters:activeFilters.length>0
        };
    };
    return{
        filters,
        filteredData,
        updateFilter,
        clearFilters,
        getFilterSummary
    };
};
export default useFilters;
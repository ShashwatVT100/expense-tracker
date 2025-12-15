import { useState } from "react";
const useLocalStorage=(key,initialValue)=>{
    const [storedValue,setStoredValue]=useState(()=>{
        try{
            const item=window.localStorage.getItem(key);
            return item?JSON.parse(item):initialValue;
        }catch(err){
            console.error(`Error reading localStorage key "${key}": `,err);
            return initialValue;
        }
    });
    const setValue=(value)=>{
        try{
            setStoredValue(value);
            const valueToStore=value instanceof Function?value(storedValue):value;
            window.localStorage.setItem(key,JSON.stringify(valueToStore));
        }catch(err){
            console.error(`Error setting localStorage key "${key}": `,err);
        }
    };
    return [storedValue,setValue];
}
export default useLocalStorage;
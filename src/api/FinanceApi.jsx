import axios from "axios";


const api = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL
});

// read opration 
export const getTransaction = ()=>{
    return api.get('/transactions');
}

// delete operation 

export const deleteTransaction = (id) =>{
    return api.delete(`/transactions/${id}`);
}

// create / post operation 

export const postTransaction = (post) =>{
    return api.post('/transactions',post);
}

// update / put operation 

export const putTransaction = (id,post)=>{
    return api.put(`/transactions/${id}`,post);
}


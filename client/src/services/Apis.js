import {commonrequest} from "./ApiCall"
import {BASE_URL} from "./helper"

export const registerfunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/user/register`,data,header);
}

export const usergetfunc = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/user/details`,"");
}

export const singleUsergetfunc = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"");
}

export const editfunc = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}
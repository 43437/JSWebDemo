import axios from 'axios'

let rootUrl = 'http://localhost:4000'

export function get(url, param){
    return new Promise((resolve, reject)=>{
        axios.get(rootUrl + url, {params: param}).then(response => {
            resolve(response.data)
        }, err =>{
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function post(url, param){
    return new Promise((resolve, reject) =>{
        axios.post(rootUrl + url, param).then(response => {
            resolve(response.data)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}
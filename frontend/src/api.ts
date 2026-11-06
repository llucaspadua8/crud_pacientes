import type { PatientType } from "./types"

const API_URL = 'http://localhost:3000'

export async function buscarPatientsApi() {
    const resultado = await fetch(`${API_URL}/patients`)
    if (!resultado.ok){
        throw new Error('erro ao buscar patients')
    }
    return resultado.json()
} 

export async function criarPatientApi(patient:PatientType) {
    const resultado = await fetch(`${API_URL}/patients`,{
        method:'POST', headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(patient)
    })
    if (!resultado.ok){
        const erroBody = await resultado.json()
        throw erroBody
    }
    return resultado.json()
} 

export async function atualizarPatientApi(id:number, patient:PatientType) {
    const resultado = await fetch(`${API_URL}/patients/${id}`,{
        method:'PATCH', headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(patient)
    })
    if (!resultado.ok){
        const erroBody = await resultado.json()
        throw erroBody
    }
    return resultado.json()
} 

export async function excluirPatientApi(id:number) {
    const resultado = await fetch(`${API_URL}/patients/${id}`,{
        method:'DELETE'
    })
    if (!resultado.ok){
        throw new Error('erro ao excluir patient')
    }
}


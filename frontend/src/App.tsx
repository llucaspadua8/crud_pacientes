import { useEffect, useState } from 'react'
import './App.css'
import FormsPatients from './Components/FormsPatients'
import ListarPatients from './Components/ListarPatients'
import type { PatientType } from './types'
import { buscarPatientsApi, excluirPatientApi } from './api'
import { confirm } from 'material-ui-confirm'
import { green, red } from '@mui/material/colors'

function App() {

const [patients, setPatients] = useState<PatientType[]>([])
const [carregando, setCarregando] = useState(true)
const [novoPatient, setNovoPatient] = useState<PatientType>({
    id: 0,
    nome: '',
    data_nascimento: '',
    CPF: '',
    email: '',
    sexo: '',
})

async function buscarPatients() {
  try {
    const dados = await buscarPatientsApi()
    setPatients(dados)
  } catch (error) {
    console.error('erro ao buscar patients', error)
  }finally{
    setCarregando(false)
  }
}

function editarPatient(patient:PatientType) {
  setNovoPatient(patient)
}

async function excluirPatient(id:number) {
  try {
    const { confirmed } = await confirm({
      title:"Excluir paciente",
      description: "Deseja mesmo excluir esse paciente?",
      confirmationText:"Confirmar",
      confirmationButtonProps:{sx:{bgcolor:green[600], color:'black'}},
      cancellationText:"Cancelar",
      cancellationButtonProps:{sx:{bgcolor:red[600], color:'black'}}
    });
    if (!confirmed)return

    await excluirPatientApi(id)
    await buscarPatients()
  } catch (error) {
    console.error('erro ao exclui patient', error)
  }
}

useEffect(()=>{
  buscarPatients()
},[])

if (carregando) return <p>Carregando pacientes...</p>

return(<div className='App'>
     
    <h3>Pacientes</h3>

    <FormsPatients novoPatient={novoPatient} setNovoPatient={setNovoPatient} buscarPatients={buscarPatients}/>
    <ListarPatients patients={patients} editarPatient={editarPatient} excluirPatient={excluirPatient}/>


</div>)
}
export default App

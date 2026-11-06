import { Alert, Button, MenuItem, TextField } from "@mui/material"
import type { PatientType } from "../types"
import { green, red } from "@mui/material/colors"
import { useState } from "react"
import { atualizarPatientApi, criarPatientApi } from "../api"

interface FormsPatientsProps{
    novoPatient: PatientType
    setNovoPatient: React.Dispatch<React.SetStateAction<PatientType>>
    buscarPatients: () => Promise<void>
}

type ErroType = Partial<Record<keyof PatientType, string>>

function FormsPatients({novoPatient, setNovoPatient, buscarPatients}:FormsPatientsProps){

const [erro, setErro] = useState<ErroType>({})
const [msgSucesso, setMsgSucesso] = useState<string | null>(null)


async function handleSubmit(e:React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if(!validar())return

    try {
    {novoPatient.id ? await atualizarPatientApi(novoPatient.id, novoPatient) : await criarPatientApi(novoPatient)}
    await buscarPatients()
    setNovoPatient({id: 0, nome: '', data_nascimento: '', CPF: '', email: '', sexo: '',})
    setMsgSucesso(novoPatient.id ? 'Alterações realizadas com sucesso!': 'Paciente cadastrado com sucesso!')
    } catch (error:any) {
        const novoErro:ErroType = {}
        const erroMensagem = error.message 

        if (Array.isArray(erroMensagem)){
            if (erroMensagem.some((msg)=>msg.includes('CPF'))){
                novoErro.CPF = 'CPF inválido'
            }
            if (erroMensagem.some((msg)=>msg.includes('email'))){
                novoErro.email = 'Email inválido'
            }
            if (erroMensagem.some((msg)=>msg.includes('nome'))){
                novoErro.nome = 'Nome inválido'
            }
        } else if (typeof erroMensagem === 'string' && erroMensagem.includes('CPF')){
            novoErro.CPF = 'Já existe um paciente com esse CPF'
        }
        setErro(novoErro)
    }
}

function validar():boolean {
    const novoErro:ErroType = {}

    if(novoPatient.nome.length < 2){
        novoErro.nome = 'Nome precisa possuir ao menos 2 caracteres'
    }
    if(!novoPatient.data_nascimento){
        novoErro.data_nascimento = 'Data de nascimento é obrigatória'
    } else if (novoPatient.data_nascimento < '1900-01-01'){
        novoErro.data_nascimento = 'Data de nascimento inválida'
    }
    if(!novoPatient.CPF){
        novoErro.CPF = 'CPF é um campo obrigatório'
    }
    if(!novoPatient.email){
        novoErro.email = 'Email é um campo obrigatório'
    }
    if(!novoPatient.sexo){
        novoErro.sexo = 'Sexo é um campo obrigatório'
    }
    setErro(novoErro)
    return Object.keys(novoErro).length === 0
}

function handleClean(){
    setNovoPatient({id: 0, nome: '', data_nascimento: '', CPF: '', email: '', sexo: '',})
    setErro({})
}

return(<section>

    {msgSucesso && (
        <Alert severity="success" onClose={()=>setMsgSucesso(null)}>
        {msgSucesso}
        </Alert>
    )}
    <form className="forms-container" onSubmit={handleSubmit}>
        <TextField  type="text" label="Nome"  helperText={erro.nome} error={!!erro.nome}
        value={novoPatient.nome} onChange={(e)=>setNovoPatient({...novoPatient, nome:e.target.value})}/>

        <TextField  slotProps={{inputLabel:{shrink:true}}} type="date" label="Data de Nascimento" helperText={erro.data_nascimento} error={!!erro.data_nascimento}
        value={novoPatient.data_nascimento} onChange={(e)=>setNovoPatient({...novoPatient, data_nascimento:e.target.value})}/>

        <TextField  type="text" label="CPF" helperText={erro.CPF} error={!!erro.CPF}
        value={novoPatient.CPF} onChange={(e)=>setNovoPatient({...novoPatient, CPF:e.target.value})}/>

        <TextField  label="Email" helperText={erro.email} error={!!erro.email}
        value={novoPatient.email} onChange={(e)=>setNovoPatient({...novoPatient, email:e.target.value})}/>

        <TextField  select label="Sexo" helperText={erro.sexo} error={!!erro.sexo}
        value={novoPatient.sexo} onChange={(e)=>setNovoPatient({...novoPatient, sexo:e.target.value})}>
            <MenuItem value="M">Masculino</MenuItem><MenuItem value="F">Feminino</MenuItem>
        </TextField>
        
        <div className="forms-acoes">
            <Button type="submit" sx={{bgcolor:green[600], ":hover":{bgcolor:green[400]}}} variant="contained" size="small">
            {novoPatient.id ? 'Salvar Alterações' : 'Cadastrar'}
            </Button>

            {novoPatient.id !== 0 && (
            <Button sx={{bgcolor:red[600], ":hover":{bgcolor:red[400]}}} variant="contained" size="small" onClick={handleClean}>
            Cancelar
            </Button>
            )}
        </div>
    </form>

</section>)
}
export default FormsPatients

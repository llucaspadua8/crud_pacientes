import { Button } from "@mui/material"
import type { PatientType } from "../types"
import { formatData } from "../utils/formatData"
import { formatSexo } from "../utils/formatSexo"
import { blue, red } from "@mui/material/colors"

interface ListarPatientsProps{
    patients: PatientType[]
    editarPatient: (patient: PatientType) => void
    excluirPatient: (id: number) => Promise<void>
}

function ListarPatients({patients, editarPatient, excluirPatient}:ListarPatientsProps){

return(<section>

    <div className="patients-container">
        {patients.map((patient)=>
        <div key={patient.id} className="patients-card">
            <div className="patients-info">
                <p>Nome: <strong>{patient.nome}</strong></p>
                <p>Data de Nascimento: <strong>{formatData(patient.data_nascimento)}</strong></p>
                <p>CPF: <strong>{patient.CPF}</strong></p>
                <p>Email: <strong>{patient.email}</strong></p>
                <p>Sexo: <strong>{formatSexo(patient.sexo)}</strong></p>
            </div>
            <div className="patients-acoes">
                <Button sx={{bgcolor:blue[600], ":hover":{bgcolor:blue[400]}}} variant="contained" size="small" onClick={()=>editarPatient(patient)}>Editar</Button>
                <Button sx={{bgcolor:red[600], ":hover":{bgcolor:red[400]}}} variant="contained" size="small" onClick={()=>excluirPatient(patient.id)}>Excluir</Button>
            </div>
        </div>
        )}
    </div>

</section>)
}
export default ListarPatients
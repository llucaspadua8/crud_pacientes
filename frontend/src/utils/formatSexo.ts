

export function formatSexo(sexo:string):string{
    const opcoes:Record<string, string> = {
        M: 'Masculino',
        F: 'Feminino'
    }
    return opcoes[sexo]
}
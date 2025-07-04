import moment from "moment"
import Alunos from "../models/User.js"
import axios from "axios"


const getAllStudents = async (request, response) => {
    const students = await Alunos.find()
    return response.status(200).send(students)
}

const registrationStudent = async (request, response) => {
    let student = request.body

    student.name = student.name.toLowerCase()
    const alunoIsExist = await Alunos.findOne({
        cpf: student.cpf
    })
    
    if(alunoIsExist) {
        return  response.status(400).send({ message: "Usuário já cadastrado!" })
    }else {
        await Alunos.create(student)
        return  response.status(201).send({ message: "Usuário cadastrado com sucesso" })
    }

}

const getStudent = async (request, response) => {
    const { search } = request.query
    const student = await Alunos.find({name: {$regex: search.toLowerCase()}})

    if(student.length === 0) {
        const studentcpf = await Alunos.find({
            cpf: {$regex: Number(search)}
        })

        if(studentcpf.length === 0) {
            return response.json({message: "Nenhum aluno encontrado!"})
        }else {
            return response.json(studentcpf)
        }
    }else {
        return response.json(student)
    }

}

const updateStudent = async (request, response) => {
    const studentId = request.params.id
    
   const updateStudent = await Alunos.findByIdAndUpdate(studentId, request.body);
   if(updateStudent) {
     return response.status(200).send({message: "Aluno atualizado com sucesso!"})
   }else {
    return response.status(400).send({message: "Não foi possivel atualizar!"})
   }
}

const deleteStudent = async (request, response) => {
    const { id } = request.params

    const deletedStudent = await Alunos.findByIdAndDelete(id)
    
    if(!deletedStudent) {
        return response.status(404).send({message: "não foi possível deletar o aluno!"})
    }else {
        return response.status(200).send({message: "Aluno deletado com sucesso!"})
    }
}

const getCep = async (request, response) => {
    const { cep } = request.params

    try{
        const resp = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return response.status(200).send(resp.data)
    }catch{
        return response.status(404).send({message: "Cep não encontrado!"})
    }
    
}



export { registrationStudent, getAllStudents, getStudent, updateStudent, deleteStudent, getCep }
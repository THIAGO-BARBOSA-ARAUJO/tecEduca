import moment from "moment"
import Alunos from "../models/User.js"


const getAllStudents = async (request, response) => {
    const students = await Alunos.find()
    return response.status(200).send(students)
}

const registrationStudent = async (request, response) => {
    let student = request.body

    student.name = student.name.toLowerCase()
   console.log(student.startCourse)
    const alunoIsExist = await Alunos.findOne({
        cpf: student.cpf
    })
    
    console.log(alunoIsExist)
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
            return response.json({message: "Nenhum usuário encontrado!"})
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
        return response.status(400).send({message: "não foi possível deletar o aluno!"})
    }else {
        return response.status(200).send({message: "Aluno deltado com sucesso!"})
    }
}

export { registrationStudent, getAllStudents, getStudent, updateStudent, deleteStudent }
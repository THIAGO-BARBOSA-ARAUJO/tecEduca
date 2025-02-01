import mongoose from "mongoose"
import moment from "moment"

const alunosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    cpf: {
        type: String,
        required: true,
    },

    profission: {
        type: String,
    },

    course: {
        type: String,
        required: true,
    },

    register: {
        type: String,
        required: true,
    },

    logradouro: {
        type: String,
        required: true,
    },

    numberHouse: {
        type: String,
        required: true,
    },

    complement: {
        type: String,
    },

    neighborhood: {
        type: String,
        required: true,
    },

    state: {
        type: String,
        required: true,
    },

    cep: {
        type: String,
    },

    maritalState: {
        type: String,
        required: true,
    },

    motherName: {
        type: String,
        required: true,
    },

    telephone: {
        type: String,
        required: true,
    },

    sexo: {
        type: String,
        required: true,
    },

    dateBirth: {
        type: String,
        required: true,
    },

    rg: {
        type: String,
    },
    
    email: {
        type: String,
        required: true,
    },
   
    startCourse: {
        type: String,
        default: moment().format("L"),
    },

    financialSituation: {
        type: String,
    },
    
    createdAt: {
        type: Date,
        default: moment().format("L")
    }
})

export default mongoose.model('Alunos', alunosSchema)
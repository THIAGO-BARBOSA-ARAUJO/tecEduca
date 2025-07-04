import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/select";
import {DatePicker} from "@nextui-org/date-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import api from "@/services/api";
import moment from "moment"
import { Slide, toast } from 'react-toastify';
import { cpf } from 'cpf-cnpj-validator';

const sexos = [{key: "masculino", label: "Masculino"}, {key: "feminino", label: "Feminino"}, {key: "não informado", label: "Não informado"}]

const courses = [{key: "Instalações Elétricas", label: "Instalações Elétricas"}, {key: "Comandos Elétricos", label: "Comandos Elétricos"}, {key: "Automação", label: "Automação"}]

export function EditStudent({getAllStudents, getStudent, typeModal, studentEdit, onClose }: any) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [ startCourse, setStartCourse ] = useState<String>()
    const [ dateBirth, setDateBirth ] = useState<String>()
    const [ cep, setCep ] = useState<any>()

    async function queryCode(cep: any){
        // const resp = await api.get(`cep/${cep}`)
        // setCep(resp)
    }

    async function handleFilterProducts(data: any) {
        switch (data.course) {
            case '0':
                data.course = "Instalações Elétricas"
                break;
            case "1":
                data.course = "Comandos Elétricos"
                break;
            case "2":
                data.course = "Automação"
                break 
        }

        switch (data.sexo) {
            case '0':
                data.sexo = "Masculino"
                break;
            case "1":
                data.sexo = "Feminino"
                break;
            case "2":
                data.sexo = "Não Informado"
                break 
        }

       data.dateBirth = dateBirth
       data.startCourse = startCourse

       if(typeModal == "Edit") {
          const resp = await api.put(`/student/${studentEdit._id}`, data)
          if(resp.status === 200) {
            toast.success("Aluno atualizado com sucesso!"), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }
          }else {
            toast.error("Aluno não atualizado!"), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }
          }
       }else {
         const respi = await api.post('student', data)
         if(respi.status === 201) {
            toast.success("Aluno cadastrado com sucesso!"), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }
         }else {
            toast.error("Não foi possível cadastrar o aluno!"), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            }
         }
       }
       await getAllStudents()
       
       onClose()
    }

    useEffect(() => {
        setDateBirth(studentEdit?.dateBirth)
        setStartCourse(studentEdit?.startCourse)
    }, [])

    return (
        <div className="flex flex-col pl-8 pr-8 bg-white shadow-2xl m-auto w-[calc(100vw-150px)] h-[calc(100vh-100px)] mt-[-100px]">
            <form onSubmit={handleSubmit(handleFilterProducts)} className="mt-14 flex-col flex overflow-x-hidden overflow-y-auto	">
                <div className="flex gap-20">
                    <div className="flex flex-col w-full">
                        <Input {...register("name", { required: 'O nome é obrigatório' })} 
                        defaultValue={studentEdit?.name} 
                        label="Nome*" placeholder="Digite o nome do Aluno" 
                        variant="underlined"
                        //isInvalid={errors.name}
                        color={errors.name ? "danger" : "default"}
                        errorMessage="Por favor insira o nome!"
                        />
                        
                    </div>

                    <div className="flex flex-col w-full">
                        <Input {...register("register", { required: 'O registro é obrigatório' })} 
                        defaultValue={studentEdit?.register} 
                        label="Código da matrícula*" 
                        placeholder="Digite a matrícula do aluno" 
                        variant="underlined"
                        color={errors.register ? "danger" : "default"} />
                    </div>
                    
                </div>

                <div className="flex mt-11 gap-20">
                    <Input {...register("cpf")} defaultValue={studentEdit?.cpf} label="Cpf*" placeholder="Digite o cpf do Aluno" variant="underlined" />
                    
                    <Input {...register("rg")} defaultValue={studentEdit?.rg} label="Rg*" placeholder="Digite o RG do Aluno" variant="underlined" />
                    
                    {
                        typeModal === "Edit" ?

                        (<DatePicker defaultValue={parseDate(`${studentEdit?.dateBirth?.split("T")[0]}`)} onChange={(data: any) => setDateBirth(moment(data).subtract(1, 'months').format())} label="Data de Nascimento" variant="underlined" />)

                        :

                        (<DatePicker onChange={(data) => setDateBirth(moment(data).subtract(1, 'months').format())} label="Data de Nascimento" variant="underlined" />)
                    }
                    
                    <Select defaultSelectedKeys={["masculino"]} {...register("sexo")} variant="underlined" label="Sexo" >
                        {sexos.map((sexo) => (
                            <SelectItem key={sexo.key}>
                                {sexo.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                
                <div className="flex mt-11 gap-20">
                    <Input {...register("email")} defaultValue={studentEdit?.email} label="Email*" placeholder="Digite o email do Aluno" variant="underlined" />
                    
                    <Input {...register("motherName")} defaultValue={studentEdit?.motherName} label="Nome da Mãe" placeholder="Digite o Nome da Mãe do Aluno" variant="underlined" />
                </div>

                <div className="flex mt-11 gap-20">
                    <Input {...register("profission")} defaultValue={studentEdit?.profission} label="Profissão" placeholder="Digite a profissão do Aluno" variant="underlined" />
                    
                    <Input {...register("maritalState")} defaultValue={studentEdit?.maritalState} label="Estado civil" placeholder="Digite o Estado civil do Aluno" variant="underlined" />
                    
                    <Input {...register("financialSituation")} aria-label="situação financeira" defaultValue={studentEdit?.financialSituation} label="Situação Financeira" placeholder="Digite a Situação Finaceira do Aluno" variant="underlined" />
                    
                    <Select defaultSelectedKeys={["Instalações Elétricas"]} {...register("course")} variant="underlined" label="Curso" >
                        {courses.map((course) => (
                            <SelectItem key={course.key}>
                                {course.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <div className="flex mt-11 gap-20">
                    <Input {...register("telephone")} defaultValue={studentEdit?.telephone} type="tel" label="telefone" placeholder="Digite o Telefone do Aluno" variant="underlined" />

                    {
                        typeModal === "Edit" ?

                        // defaultValue={studentEdit?.startCourse}

                        (<DatePicker defaultValue={parseDate(`${studentEdit?.startCourse?.split("T")[0]}`)} onChange={(data) => setStartCourse(moment(data).subtract(1, 'months').format())} label="Inicio do Curso" variant="underlined" />)

                        :

                        (<DatePicker onChange={(data) => setStartCourse(moment(data).subtract(1, 'months').format())} label="Inicio do Curso" variant="underlined" />)
                    }
                   
                </div>

                <h1 className="mt-10 mb-5 text-[20px]">Endereço</h1>

                <div className="flex gap-20">
                    <Input {...register("logradouro")} defaultValue={studentEdit?.logradouro} label="Rua" placeholder="Digite a Rua do Aluno" variant="underlined" />
                    
                    <Input {...register("numberHouse")} defaultValue={studentEdit?.numberHouse} type="number" label="Número" placeholder="Digite o Número da Casa do Aluno" variant="underlined" />
                    
                    <Input {...register("complement")} defaultValue={studentEdit?.complement} label="Complemento" placeholder="Digite o Complemento do Aluno" variant="underlined" />
                </div>

                <div className="flex mt-11 gap-20">
                    <Input {...register("neighborhood")} defaultValue={studentEdit?.neighborhood} label="Bairro" placeholder="Digite o Bairro do Aluno" variant="underlined" />
                    
                    <Input {...register("state")} defaultValue={studentEdit?.state} label="Estado" placeholder="Digite o Estado do Aluno" variant="underlined" />
                    
                    <Input {...register("cep")} onChange={(cep) => queryCode(cep.target.value)} defaultValue={studentEdit?.cep} type="number" label="Cep" placeholder="Digite o Cep do Aluno" variant="underlined" />
                </div>
                
                <footer className=" mt-10 justify-self-end self-end">
                    <Button color="danger"  variant="light" onPress={onClose}>
                        Cancelar
                    </Button>

                    <Button className="text-white w-28 h-15 text-lg bg-[#03A9F4]" type="submit" variant="solid">
                        {typeModal === "Edit" ? "Salvar" : "Cadastrar"}
                    </Button>
                </footer>

            </form>

        </div>
        
    )
}
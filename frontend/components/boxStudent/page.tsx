import { useEffect, useState } from "react"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
  import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    useDisclosure
  } from "@nextui-org/modal";

  import {Tooltip} from "@nextui-org/tooltip";
  import Image from 'next/image'
  import Link from 'next/link'
  import Edit from '@/public/images/edit.svg'
  import View from '@/public/images/view.png'
  import Trash from '@/public/images/lixeira.png'
  import { ModalDelete } from "../modalDelete/page";
  import { ModalEdit } from "../modalEdit/ModalEdit";
  import api from "@/services/api";

  type StudentType = {
    name: string,
    
    cpf:string,

    profission: string,

    course: string,

    registration: string,

    logradouro: string,

    numberHouse: number,

    complement: string,

    neighborhood: string,

    state: string,

    cep: number,

    maritalState: string,

    motherName: string,

    telephone: number,

    dateBirth: string,

    rg: string,
    
    email: string,
   
    startCourse: Date,

    financialSituation: string,
    
    _id: string 
  }

  type params = {
    search: string
  }


export function BoxStudent( { students, setStudents } ) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [ modal, setModal ] = useState('')
    const [ nameStudent, setNameStudent ] = useState('')
    const [ idStudent, setIdStudent ] = useState('')
    

    function deleteStudent(id: string) {
        console.log(id)
        api.delete(`/student/${id}`)
        getAllStudents()
    }

    function EditStudentForm(id: string) {
        console.log("lalalala")
    }

    async function getAllStudents() {
        const students = await api.get('students')
        setStudents(students.data)
      }

    useEffect(() => {
        if(students.length === 0) {
            getAllStudents()
        }
    }, [])

    return (
        <>
            {
                students.length > 0 
                ? 
                <Table className="flex-1" removeWrapper>
                <TableHeader className="h-10">
                    <TableColumn>NOME</TableColumn>
                    <TableColumn>CPF</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>COURSE</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
            
                <TableBody>
                    {students.map((student: StudentType, index: number) => (
                        <TableRow className="shadow-md h-16" key={index}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.cpf}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.course}</TableCell>
                            <TableCell>
                            <div className="flex gap-5">
                                {/* <Tooltip color="primary" content="Infos">
                                    <Link href="/student"><Image width={24} height={24} src={Edit} alt='imagem de edição' /></Link>
                                </Tooltip> */}
                                
                                <Tooltip color="primary" content="Editar">
                                    <Image onClick={() => {
                                        setNameStudent(student.name)
                                        setModal('Edit')
                                        onOpen() 
                                        }} className="cursor-pointer"  width={24} height={24} src={Edit} alt='imagem de visualização' />
                                </Tooltip>
    
                                <Tooltip color="danger" content="Excluir">
                                    
                                    <Image onClick={() => {
                                        setModal('Delete')
                                        onOpen()
                                        setIdStudent(student._id)
                                        }} className="cursor-pointer"  width={24} height={24} src={Trash} alt='imagem de exclusão' />
                                    
                                </Tooltip>
                            </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
                
                : 
                   students.message
            }
            
            <Modal size={modal === "Delete" ? "md": "full"} backdrop="opaque" isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                { 
                    modal === 'Delete' ? <ModalDelete title="Excluir Aluno ?" description="Tem certeza que deseja excluir o aluno ?" onSubmit={() => deleteStudent(idStudent)} /> : <ModalEdit getAllStudents={getAllStudents} nameStudent={nameStudent} onSubmit={() => EditStudentForm(idStudent)} typeModal="Edit" />
                }
            </Modal>
        </>
    )
}
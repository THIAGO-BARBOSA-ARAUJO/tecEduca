import api from "@/services/api";
import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    } from "@nextui-org/modal";
import { useEffect, useState } from "react";
import { EditStudent } from "../boxStudent/edit";

    interface modalDeleteProps {
        description?: string
        nameStudent: string,
        typeModal: string,
        getAllStudents: () => {},
        onSubmit: () => void
     }


export function ModalEdit({getAllStudents, onSubmit, nameStudent, typeModal }: any) {

    const [ studentEdit, setStudentEdit ] = useState<any>(null)

    async function getStudent() {
        const student = await api.get(`student?search=${nameStudent}`)
        setStudentEdit(student.data[0])
    }

    useEffect( () => {
        getStudent()
        
    }, [])

    return (
        <ModalContent>
        {(onClose) => (
            <>
            <ModalHeader className="flex flex-col gap-1 bg-[#03A9F4]">
                {
                    typeModal === 'Edit' ? (
                        <p className="text-[white] h-32">ALUNO {'>'} {studentEdit?.name?.toUpperCase()}</p>
                    ):
                    (
                        <p className="text-[white] h-32">CADASTRAR</p>
                    )
                } 
            </ModalHeader>
            <ModalBody>
                { studentEdit !== null 
                
                ? 
                    (<EditStudent getAllStudents={getAllStudents} getStudent={getStudent} typeModal={typeModal} studentEdit={studentEdit} onClose={onClose} />) 
                : 
                    ("Carregando")
                }
                
            </ModalBody>
            <ModalFooter className="pr-10 pb-5">
               
                
            </ModalFooter>
            </>
        )}
        </ModalContent>
    

    )
}
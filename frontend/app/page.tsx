"use client"
import {Input} from "@nextui-org/input";
import {Roboto} from "next/font/google"
import { Button } from "@nextui-org/button";
import { BoxStudent } from "@/components/boxStudent/page"
import api from "@/services/api";
import { useState } from "react";
import SerachIcon from "@/public/images/search.svg"
import Image from "next/image";
import { Modal, useDisclosure } from "@nextui-org/modal";
import { ModalEdit } from "@/components/modalEdit/ModalEdit";

const roboto = Roboto({
  weight: "700",
  style: "normal"

})

export default function Home() {

  const [students, setStudents] = useState([])
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  async function getAllStudents() {
    const students = await api.get('students')
    setStudents(students.data)
  }

  const searchStudent = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value === "") {
      getAllStudents()
    }else {
      const student = await api.get(`student?search=${event.target.value}`, )
    
      setStudents(student.data)
    }
  };

  return (
    <main className={roboto.className}>
      <div className="pl-5 pr-5">
        <h1 className="text-[#329cca] text-3xl mt-10">Gestão de Alunos</h1>
        <p className="mt-2 text-[#949494] text-base">Configure e cadastre Alunos</p>

        <section className="flex items-center justify-between">
          <div className="mt-7">
            <h3 className="text-[#727272] mb-2">Alunos</h3>
            <Input 
              isClearable
              onChange={(e) => searchStudent(e)}
              radius="lg"
              color="default"
              placeholder="busque por nome ou cpf"
              onClear={() => getAllStudents() }
              startContent={
                <Image src={SerachIcon} width={20} height={20} alt='imagem de pesquisa' aria-label="imagem de pesquisa" />
              }
              />
          </div>
          <Button 
          color="primary"
          onClick={() => onOpen()}
          >
            Cadastrar aluno
          </Button>
        </section>

        <section className="mt-8 w-full">
          <BoxStudent students={students} setStudents={setStudents} />
        </section>
      </div>

      <Modal size="full" backdrop="opaque" isOpen={isOpen} isDismissable={false} onOpenChange={onOpenChange}>
                { 
                     <ModalEdit getAllStudents={getAllStudents} onSubmit={() => {}} nameStudent={'lalalala'} typeModal="Cadastrar" />
                }
            </Modal>
    </main>
  );
}

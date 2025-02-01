import { Button } from "@nextui-org/button";
import {
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter,
    } from "@nextui-org/modal";

    interface modalDeleteProps {
        title: string,
        description: string
        onSubmit: () => void
     }


export function ModalDelete({ onSubmit, description, title }: modalDeleteProps) {

    return (
        <ModalContent>
        {(onClose) => (
            <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
                <p> 
                    {description}
                </p>
                
            </ModalBody>
            <ModalFooter>
               
                <Button color="primary" onPress={onClose}>
                    Fechar
                </Button>

                <Button color="danger" variant="light" onClick={onSubmit}  onPress={onClose}>
                    Excluir
                </Button>
            </ModalFooter>
            </>
        )}
        </ModalContent>
    )
}
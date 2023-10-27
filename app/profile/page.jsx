'use client';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import { Card, Dropdown, Text, Button, Row, Modal, useModal, Grid, Loading } from "@nextui-org/react";

function Profile() {
  const inactiveLink = 'flex gap-1 p-1';
  const activeLink = inactiveLink + ' bg-primary-orange rounded-lg text-white';
  const router = useRouter();
  const pathname = usePathname();
  const {data: session } = useSession();
  const { setVisible, bindings } = useModal();

  function presencas() {
    if (session?.user.email === "themastersbarbershop01@gmail.com") {
      router.push('/presencas');
    } else {
      setVisible(true);
    }
  }

  function gestao() {
    if (session?.user.email === "themastersbarbershop01@gmail.com") {
      router.push('/gestaoDashboard');
    } else {
      setVisible(true);
    }
  }

  return (
        <div className='glassmorphism  flex-grow'>
          <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'>Selecione o Serviço Desejado:</span>
          <div class="content-center justify-center mt-4 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Presenças</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para marcar presenças selecione este campo
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button type='button' onPress={presencas} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Filas</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para marcar fila selecione este campo
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={() => router.push('/filas')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Reclamações</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para efectuar uma reclamação selecione este campo
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={() => router.push('/reclamacoes')} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
            <Card css={{ mw: "330px" }}>
               <Card.Header>
                 <Text b>Gestão</Text>
                    </Card.Header>
                    <Card.Divider />
                    <Card.Body css={{ py: "$10" }}>
                      <Text>
                        Para fazer a gestão da sua empresa selecione este campo
                      </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                      <Row justify="flex-end">
                        <Button onPress={gestao} size="sm">Selecionar</Button>
                      </Row>
              </Card.Footer>
            </Card>
        </div>
        <Modal
                scroll
                width="600px"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header>
                <Text id="modal-title" size={18}>
                <span className='mb-4 font-satoshi font-semibold text-base text-gray-700 p-1'>Erro!</span>                   
                </Text>
                </Modal.Header>
                <Modal.Body>
                <Text id="modal-description">
                    Não tem autorização para aceder a este Serviço...
                </Text>
               
                </Modal.Body>
                <Modal.Footer>
                <Button auto onPress={() => setVisible(false)}>
                    OK
                </Button>
                </Modal.Footer>
            </Modal>
      </div>    
  )
}

export default Profile
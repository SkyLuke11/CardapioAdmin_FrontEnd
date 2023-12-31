import { useState } from 'react';
import { Input } from '../../input';
import { InputImg } from '../../inputImg';
import { Button, Container, Footer } from './styles'
import { IoCamera } from 'react-icons/io5';
import { HiClipboardList } from 'react-icons/hi'
import { api } from '../../../services/api';
import { useAuth } from '../../../contexts/auth';
import { toast } from 'react-toastify';
import Validator from '../../../services/validator';

interface Categorias {
  id: string,
  nome: string,
  imagem: string,
  created_at: string,
}

export function ModalEditCategoria({ data, setClose }: { data: Categorias, setClose: () => void }) {

  const { token } = useAuth()
  const validator = new Validator()

  const [nome, setNome] = useState(data.nome)
  const [imagem, setImagem] = useState(data.imagem)

  const [validatorError, setValidatorError] = useState({ error: '', msg: '' })

  async function editCategory(e: any) {

    e.preventDefault()

    const validatorImagem = validator.imagem(imagem, 'Sua categoria')

    try {

      if (nome.length < 1) {
        setValidatorError({ error: 'nome', msg: 'Campo não preenchido.' })
        return
      }

      if (validatorImagem != null) {
        setValidatorError({ error: 'imagem', msg: validatorImagem })
        return
      }

      setValidatorError({ error: '', msg: '' })

      await api.put(`/categoria/${data.id}`, {
        nome,
        imagem,
      }, { headers: { Authorization: token } })
      data.nome = nome
      data.imagem = imagem

      setClose()

    } catch (e: any) {
      toast.error(e.response.data.msg)
    }

  }

  return (
    <Container>
      <form onSubmit={editCategory}>

        <h1>Editar Categoria</h1>

        <Input label='Nome' name='categoria' valor={nome} setValor={setNome} marginBottom={2} erro={validatorError.error == 'nome' ? validatorError.msg : ''}>
          <HiClipboardList size={20} />
        </Input>

        <InputImg label='Imagem' valor={imagem} setValor={setImagem} marginBottom={2} erro={validatorError.error == 'imagem' ? validatorError.msg : ''}>
          <IoCamera size={18} />
        </InputImg>

        <Footer>
          <Button type='button' onClick={setClose}>Cancelar</Button>
          <Button type='submit'>Salvar</Button>
        </Footer>
      </form>
    </Container>
  );
}
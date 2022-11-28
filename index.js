import express from 'express'
import * as dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

dotenv.config()
const app = express()
app.use(express.json())

let data = [
    {
        name: "Ana",
        department: "T.I"
    }
]

// ROTAS
// MÉTODO GET
app.get('/', (request, response) => {
    // no json temos a resposta que queremos obter
    // SEMPRE retornamos algo, uma resposta
    return response.status(200).json(data)
})

// MÉTODO POST: passa o caminho, chama a requisição, captura o body, insere o id, dá push no dado original
app.post('/create', (request, response) => {
    const newData = {
        // capturar o body da requisição e adicionar um id
        ...request.body,
        id: uuidv4()
    }

    console.log(request)

    data.push(newData)

    return response.status(201).json(data)
})

// MÉTODO PUT: encontrar o item, encontrar a posição do item
app.put('/edit/:id', (request, response) => {
    // seta o id como um parâmetro
    const { id } = request.params

    // encontrar o item
    const update = data.find(
        item => item.id == id
    )

    // encontrar a posição do item
    const index = data.indexOf(update)

    //array[posição] = item, atualiza o item existente
    data[index] = {
        ...update,
        ...request.body
    }

    // retorna o item atualizado
    return response.status(200).json(data[index])
})

// MÉTODO DELETE: setar o parâmetro da requisição, encontrar o item, encontrar a posição, fazer SPLICE
app.delete('/delete/:id', (request, response) => {
    //passa id como parâmetro
    const { id } = request.params

    // encontrar o item
    const deleteById = data.find(
        item => item.id == id
    )

    // descobre a posição do item
    const index = data.indexOf(deleteById)

    // exclui o item do id usado como parâmetro que está posicionado no index
    data.splice(index, 1)

    return response.status(200).json(data)
})

app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))
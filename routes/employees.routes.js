import express from "express";
import { v4 as uuidv4 } from "uuid";
import EmployeeModel from "../models/employee.models.js";

const router = express.Router();

// banco de dados (será feito no mongo)
// let data = [
//     {
//         name: "Paula",
//         department: "T.I."
//     }
// ]

// ---------- ROTAS ----------
// MÉTODO GET
// no json temos a resposta que queremos obter
// SEMPRE retornamos algo, uma resposta
router.get("/", async (request, response) => {
  try {
    const employees = await EmployeeModel.find();

    return response.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

// MÉTODO POST: passa o caminho, chama a requisição, captura o body, insere o id, dá push no dado original
router.post("/create", async (request, response) => {
  try {
    const newEmployee = await EmployeeModel.create(request.body);

    return response.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

// MÉTODO PUT: encontrar o item, encontrar a posição do item
router.put("/edit/:id", (request, response) => {
  // seta o id como um parâmetro
  const { id } = request.params;

  // encontrar o item
  const update = data.find((item) => item.id == id);

  // encontrar a posição do item
  const index = data.indexOf(update);

  //array[posição] = item, atualiza o item existente
  data[index] = {
    ...update,
    ...request.body,
  };

  // retorna o item atualizado
  return response.status(200).json(data[index]);
});

// MÉTODO DELETE: setar o parâmetro da requisição, encontrar o item, encontrar a posição, fazer SPLICE
router.delete("/delete/:id", (request, response) => {
  //passa id como parâmetro
  const { id } = request.params;

  // encontrar o item
  const deleteById = data.find((item) => item.id == id);

  // descobre a posição do item
  const index = data.indexOf(deleteById);

  // exclui o item do id usado como parâmetro que está posicionado no index
  data.splice(index, 1);

  return response.status(200).json(data);
});

export default router;

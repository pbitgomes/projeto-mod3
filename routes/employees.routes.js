import express from "express";
import { v4 as uuidv4 } from "uuid";
import EmployeeModel from "../models/employee.models.js";
import TodoModel from "../models/todo.models.js";

const router = express.Router();

// ---------- ROTAS ----------
// MÉTODO GET
router.get("/", async (request, response) => {
  try {
    const employees = await EmployeeModel.find().populate("todos");
    return response.status(200).json(employees);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

//GET BY ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const employee = await EmployeeModel.findById(id).populate("todos");

    if (!employee) {
      return response.status(404).json("Funcionário não encontrado.");
    }

    return response.status(201).json(employee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

// MÉTODO POST
router.post("/create", async (request, response) => {
  try {
    const newEmployee = await EmployeeModel.create(request.body);

    return response.status(201).json(newEmployee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

// MÉTODO PUT
router.put("/edit/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const update = await EmployeeModel.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true, runValidators: true }
    );

    return response.status(200).json(update);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

// MÉTODO DELETE
router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const deleteEmployee = await EmployeeModel.findByIdAndDelete(id);
    await TodoModel.deleteMany({ responsable: id })

    return response.status(200).json(deleteEmployee);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo está errado." });
  }
});

export default router;

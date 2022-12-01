import express from 'express'
import * as dotenv from 'dotenv'
import employeeRouter from './routes/employees.routes.js'
import toDoRouter from './routes/todo.routes.js'
import dbConnection from './config/db.config.js'

// configuração padrão do dotenv (setada porta 8080)
dotenv.config()

dbConnection()

// inicialização do express
const app = express()
// permitir a interpretação de json()
app.use(express.json())

app.use('/employee', employeeRouter)
// todos os CRUDs dessa funcionalidade estão nesse arquivo em separado (employees.routes.js); importado
// UMA ROTA PARA CADA FUNCIONALIDADE!
// por exemplo: acesso "http://localhost:8080/employee/edit/:id" 

app.use('/todo', toDoRouter)
"http://localhost:8080/todo"
"http://localhost:8080/todo/create"
"http://localhost:8080/todo/edit/:id"
"http://localhost:8080/todo/delete/:id"

// executar o sevidor na porta 8080
app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))
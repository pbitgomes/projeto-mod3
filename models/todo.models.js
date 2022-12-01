import { model, Schema } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String
        },
        description: {
            type: String,
            maxlength: 50
        },
        deadline: {
            type: Date
        },
        // pegar o responsável pela tarefa do modelo de funcionários (relação 1:muitos)
        responsable: {
            // pegar o id do que queremos recuperar
            type: Schema.Types.ObjectId,
            // pegar a referência do que queremos recuperar (veio do modelo de funcionários, nome do model e não da collection)
            ref: "Employee"
        }
    },
    {
        timestamps: true
    }
)

const TodoModel = model("Todo", todoSchema)

export default TodoModel
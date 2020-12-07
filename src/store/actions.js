import axios from "axios";

export default {
  retrieveTodos(context) {
    return new Promise((resolve, reject) => {
      axios
        .get("todos")
        .then(response => {
          context.commit("retrieveTodos", response.data);
          resolve(response);
        })
        .catch(error => {
          alert("Error feching todos");
          reject(error);
        });
    });
  },
  addTodo({ commit }, todo) {
    return new Promise((resolve, reject) => {
      axios
        .post("todos", todo)
        .then(response => {
          commit("pushTodo", response.data);
          resolve(response);
        })
        .catch(error => {
          alert("Error feching todos");
          reject(error);
        });
    });
  },
  updateTodo(context, todo) {
    axios
      .patch("todos/" + todo.id, todo)
      .then(response => {
        context.commit("updateTodo", response.data);
      })
      .catch(error => {
        alert("error updating todo");
      });
  },
  deleteTodo({ commit }, id) {
    axios
      .delete("todos/" + id)
      .then(respose => {
        commit("removeTodo", id);
      })
      .catch(error => {
        alert("error in deleing");
      });
  },
  checkAll({ commit }, checked) {
    axios
      .patch("todos/complete-all", { completed: checked })
      .then(response => {
        commit("checkAll", checked);
      })
      .catch(error => alert("error to complete all"));
  },
  clearCompleted({ state, commit }) {
    let completedTodosId = state.todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    axios
      .delete("todos/delete-completed", {
        data: {
          todos: completedTodosId
        }
      })
      .then(response => {
        commit("removeCompletedTodos");
      })
      .catch(error => alert("error to clear completed"));
  }
};

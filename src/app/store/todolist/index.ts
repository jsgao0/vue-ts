import { ActionContext } from 'vuex'
import { selfReq } from '@/utils/request'
interface TodoItems {
  id: number
  name: string
  description: string
}
interface State {
  list: TodoItems[]
}

export default {
  state: {
    list: [],
  },
  getters: {
    todolist: (state: State) => state.list,
  },
  mutations: {},
  actions: {
    getTodoListAsync(context: ActionContext<State, State>) {
      console.log(context)
      selfReq.Get({ path: 'list' }).then((res: {}) => console.log(res))
    },
    addTodoItemAsync(context: ActionContext<State, State>) {
      console.log(context)
      selfReq
        .Post({ path: 'list', payload: { name: '1', description: '1' } })
        .then((res: {}) => console.log(res))
    },
    deleteTodoItemAsync(context: ActionContext<State, State>) {
      console.log(context)
      selfReq.Delete({ path: 'list/1' }).then((res: {}) => console.log(res))
    },
    replaceTodoItemAsync(context: ActionContext<State, State>) {
      console.log(context)
      selfReq
        .Put({ path: 'list/1', payload: { name: '2', description: '2' } })
        .then((res: {}) => console.log(res))
    },
    updateTodoItemAsync(context: ActionContext<State, State>) {
      console.log(context)
      selfReq
        .Patch({ path: 'list/1', payload: { name: '3', description: '3' } })
        .then((res: {}) => console.log(res))
    },
  },
}

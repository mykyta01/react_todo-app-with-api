import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { USER_ID } from '../utils/constants';
import { getTodos } from '../api/todos';

type TodosStateContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  tempTodo: Todo | null;
  setTempTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  deletingTodosIds: number[];
  setDeletingTodosIds: React.Dispatch<React.SetStateAction<number[]>>;
  updatingTodosIds: number[];
  setUpdatingTodosIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export const TodosStateContext = React.createContext<TodosStateContextType>({
  todos: [] as Todo[],
  setTodos: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  tempTodo: null,
  setTempTodo: () => {},
  deletingTodosIds: [],
  setDeletingTodosIds: () => {},
  updatingTodosIds: [],
  setUpdatingTodosIds: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deletingTodosIds, setDeletingTodosIds] = useState<number[]>([]);
  const [updatingTodosIds, setUpdatingTodosIds] = useState<number[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      errorMessage,
      setErrorMessage,
      tempTodo,
      setTempTodo,
      deletingTodosIds,
      setDeletingTodosIds,
      updatingTodosIds,
      setUpdatingTodosIds,
    }),
    [
      todos,
      setTodos,
      errorMessage,
      setErrorMessage,
      tempTodo,
      setTempTodo,
      deletingTodosIds,
      setDeletingTodosIds,
      updatingTodosIds,
      setUpdatingTodosIds,
    ],
  );

  return (
    <TodosStateContext.Provider value={value}>
      {children}
    </TodosStateContext.Provider>
  );
};

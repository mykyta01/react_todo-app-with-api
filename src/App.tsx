/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoAppHeader } from './components/TodoHeader';
import { TodoAppFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { TodosStateContext } from './providers/TodosProvider';
import { USER_ID } from './utils/constants';
import { Status } from './types/Status';
import { FocusProvider } from './providers/FocusProvider';

export const App: React.FC = () => {
  const { todos } = useContext(TodosStateContext);
  const [status, setStatus] = useState(Status.All);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FocusProvider>
          <TodoAppHeader />

          <TodoList todos={filteredTodos} />

          {!!todos.length && (
            <TodoAppFooter status={status} onStatusChange={setStatus} />
          )}
        </FocusProvider>
      </div>

      <ErrorNotification />
    </div>
  );
};

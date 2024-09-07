import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TodosStateContext } from '../providers/TodosProvider';

export const ErrorNotification: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(TodosStateContext);
  const [isVisible, setIsVisible] = useState(false);
  const [displayedError, setDisplayedError] = useState('');

  useEffect(() => {
    let timerId: NodeJS.Timeout | null;

    if (errorMessage) {
      setIsVisible(true);
      setDisplayedError(errorMessage);

      timerId = setTimeout(() => {
        setErrorMessage('');
        setIsVisible(false);
      }, 3000);
    }

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [errorMessage, setErrorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !isVisible },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        aria-label="Hide error message"
        onClick={() => setIsVisible(false)}
      />
      {displayedError}
    </div>
  );
};

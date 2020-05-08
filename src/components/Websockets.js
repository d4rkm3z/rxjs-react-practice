import React, { useState, useEffect, useCallback } from 'react';
import { Button, InputGroup, Classes } from '@blueprintjs/core';
import { webSocket } from 'rxjs/webSocket';
import classNames from 'classnames';

const subject$ = webSocket({
  url: 'wss://echo.websocket.org/',
  resultSelector: msg => console.log(msg),
  openObserver: {
    next: () => {
      console.info('WS: connection ok');
    }
  },
  closeObserver: {
    next: () => {
      console.info('WS: connection is closed');
    }
  }
});

function Websockets() {
  const [content, setContent] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    subject$.subscribe(
      ({ message }) => setContent(prevState => [...prevState, message]),
      err => console.error(err)
    );

    return () => subject$.complete();
  }, []);

  const sendMessage = useCallback(
    message => {
      subject$.next({ message });
      setInput('');
    },
    [setInput]
  );

  return (
    <>
      <InputGroup
        dir="auto"
        value={input}
        placeholder="Write message here..."
        onChange={event => setInput(event.target.value)}
        rightElement={
          <Button onClick={() => sendMessage(input)}>Push message to WS</Button>
        }
      />

      <div className={classNames(Classes.CODE_BLOCK)}>
        {content.map((val, index) => (
          <div key={index}>{val}</div>
        ))}
      </div>
    </>
  );
}

export default Websockets;

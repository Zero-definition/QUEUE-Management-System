import React, { createContext, useState } from "react";

export const QueueStateContext = createContext();

export const QueueStateProvider = props => {
    const [queueState, setQueueState] = useState([]);

    return (
        <QueueStateContext.Provider value={[queueState, setQueueState]}>
            {props.children}
        </QueueStateContext.Provider>
    );
};
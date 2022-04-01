const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Katya'},
        {id: 3, name: 'Anya'},
        {id: 4, name: 'Vasia'},
    ],
    messages: [
        {id: 1, name: 'Dima', message: 'Hello'},
        {id: 2, name: 'Katya', message: 'my message'},
        {id: 3, name: 'Anya', message: 'call me back'},
        {id: 4, name: 'Vasia', message: 'love you'},
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 5,
                name: 'Test',
                message: action.textOfMessage
            }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };

        default:
            return state;
    }

}

export const sendMessage = (textOfMessage) => ({type: SEND_MESSAGE, textOfMessage})


export default dialogsReducer;
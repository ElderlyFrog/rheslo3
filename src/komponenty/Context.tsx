import React, {useReducer, useContext, createContext} from 'react';
import {ReactNode} from "react";
import generator from "generate-password";

type HesloContextProviderType = {
    children: ReactNode

}
type State = {
    value: any,
    length: number,
    includeUppercase: boolean,
    includeNumbers: boolean,
    includeSymbols: boolean,
    includeLowercase: boolean

};

const initialState: State = {

    value: '',
    length: 5,
    includeLowercase: true,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false,
}

type Action = {
    type: 'Velke' | 'Cisla' | 'Znaky' | 'Ukaz' | 'Pocet' | 'Heslo' | 'Maly';
    payload?:  any


};

type Context = {
    state: State;
    dispatch: React.Dispatch<Action>;
};


const reducer = (state: State, action: Action): State => {
    switch (action.type) {


        case 'Velke':
            return {
                ...state,
                includeUppercase: !state.includeUppercase,
            }
        case 'Cisla':
            return {
                ...state,
                includeNumbers: !state.includeNumbers,

            }
        case 'Znaky':
            return {
                ...state,
                includeSymbols: !state.includeSymbols

            }
        case 'Ukaz':
            return {
                ...state,

            }
        case 'Pocet':
            return {
                ...state,
                length:( action.payload)
            }
        case 'Heslo':
            return {
                ...state,
                value: action.payload
            }
        case "Maly":
            return {
                ...state,
                includeLowercase: !state.includeLowercase
            }
        default:
            return state;
    }

}


const HesloContext = createContext<Context>({
    state: initialState,
    dispatch: () => {
    },
});

export const HesloProvider = ({children}: HesloContextProviderType) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <HesloContext.Provider value={{state, dispatch}}>
            {children}
        </HesloContext.Provider>
    );
};


export const Heslo: React.FC = () => {
    const {state, dispatch} = useContext(HesloContext);
    const includeSymbols = () => {

        dispatch({type: 'Znaky',});
    };

    const includeUpperCase = () => {

        dispatch({type: 'Velke',});
    };

    const includeNumbers = () => {

        dispatch({type: 'Cisla',});
    };

    const includeLowercase = () => {

        dispatch({type: "Maly"})
    }

    const hesloLenght = (event: React.ChangeEvent<HTMLInputElement>) => {


        dispatch({type:'Pocet',
            payload: (event.target.value)
        })

    }

    const GRHeslo = () => {

        dispatch({type: "Heslo", payload: rHeslo})
    }



    const rHeslo = generator.generate({
        length: state.length,
        lowercase: state.includeLowercase,
        uppercase: state.includeUppercase,
        numbers: state.includeNumbers,
        symbols: state.includeSymbols
    });



    return (
        <>


            <form>
                <div>{state.value} </div> <br/>
                <input type="number" value={state.length} min={4} max={20} onChange={(event) => hesloLenght(event)}/> <br/>

                <label>Include Numbers</label>
                <input type={"checkbox"} checked={state.includeNumbers} onChange={includeNumbers}/> <br/>

                <label>Include LowerCase</label>
                <input type={"checkbox"} checked={state.includeLowercase} onChange={includeLowercase}/> <br/>

                <label>Include Symbols</label>
                <input type={"checkbox"} checked={state.includeSymbols} onChange={includeSymbols}/> <br/>

                <label>Include Uppercase</label>
                <input type={"checkbox"} checked={state.includeUppercase} onChange={includeUpperCase}/> <br/>

                <label>Random Heslo</label>
                <input type={ "button"} onClick={GRHeslo}/>
            </form>

        </>
    );
};
export interface INotes {
    title: string,
    text: string
}

export interface IBoard {
    title: string,
    notes: INotes[]
}

export interface IUser {
    // role: string;
    username: string;
    email: string;
    password: string;
    // board:IBoard[]
}


// auth
export interface IUserSignUp {
    username: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}
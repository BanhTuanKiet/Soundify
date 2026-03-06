export interface DateOfBirth {
    day: string
    month: string
    year: string
}

export interface UserLogin {
    email: string
    name: string
    dateOfBirth: DateOfBirth
    sex: "male" | "female"
}


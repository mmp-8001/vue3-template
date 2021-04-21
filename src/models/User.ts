export interface User {
    id: number,
    firstName: string;
    lastName: string;
}

export function UserEmpty(): User {
    return {
        id: -1,
        firstName: "",
        lastName: ""
    }
}

export function UserFullName(user: User): string {
    return `${user.firstName} ${user.lastName}`;
}
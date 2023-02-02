import {user}from "./user"
import { auth } from "./auth"


export const endpoint = {
    ...auth,
    ...user,
};
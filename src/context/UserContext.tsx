import React, { useContext, useState, createContext, useEffect } from 'react'
import { CreateUser, login, Login, register } from '../api/virtumed'
import { LocalStorageHelper } from '../helpers/LocalStorageHelper';
import { LocalStorageKeys } from '../types/LocalStorageKeys';
import { RoutePath } from '../types/routes'

interface ContextProps {
  registerUser: (modelData: CreateUser) => void
  loginUser:(modelData: Login) => void
  onChangeNewUser:(propname:string,e:any) => void
  newUser: any
}

interface UserProps {
    children?: React.ReactNode;
  }
  
  const inputRegister = {} as CreateUser

export const UserContext = createContext<ContextProps>({} as ContextProps)

export const UserProvider: React.FC<UserProps> = ({ children }) => {
    const [newUser, setNewUser] = useState<any[]>([inputRegister])

    const onChangeNewUser = (
        propName: string,
        e: any
      ) => {
        const arr = [...newUser]
        const item = arr[0]
        item[propName] = e
        setNewUser(arr)
      }

    async function registerUser(modelData: CreateUser): Promise<any> {
        try {
          const result = await register(modelData).then((res) => { })
          const loginData = {
            email: modelData.email,
            password: modelData.password
          }
          setTimeout(() => loginUser(loginData),1000)
          return result
        } catch (err) {
          console.error(err)
        }
    }

    async function loginUser(modelData: Login): Promise<any> {
        try {
          const result = await login(modelData).then((res) => {return res})
          console.log(result)
          LocalStorageHelper.set(LocalStorageKeys.USER,result.data.user)
          LocalStorageHelper.set(LocalStorageKeys.TOKEN,result.data.token)
          setTimeout(() => window.location.href = RoutePath.HOME,500)
          return result;
        } catch (err) {
          console.error(err)
        }
    }

  return (
    <UserContext.Provider
      value={{
        newUser,
        onChangeNewUser,
        registerUser,
        loginUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): ContextProps => useContext(UserContext)

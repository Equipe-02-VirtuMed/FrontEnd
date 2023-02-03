import React, { useContext, useState, createContext, useEffect } from 'react'
import { CreateUser, getSchedules, login, Login, postSchedule, register } from '../api/virtumed'
import { LocalStorageHelper } from '../helpers/LocalStorageHelper';
import { LocalStorageKeys } from '../types/LocalStorageKeys';
import { RoutePath } from '../types/routes'

interface ContextProps {
  registerUser: (modelData: CreateUser) => void
  loginUser:(modelData: Login) => void
  onChangeNewUser:(propname:string,e:any) => void
  onChangeNewSchedule:(propname:string,e:any) => void
  getSchedule:(email:string,typeUser:string) => void
  newSchedule:(data:any) => void
  createSchedule: any
  newUser: any
  user:any
  schedules:any
}

interface UserProps {
    children?: React.ReactNode;
}

interface CreateSchedule{
  day: string
  doctoremail: string
  pacientemail: string 
  residency: string
}
  
  const inputRegister = {} as CreateUser

  const inputSchedule = {} as CreateSchedule

export const UserContext = createContext<ContextProps>({} as ContextProps)

export const UserProvider: React.FC<UserProps> = ({ children }) => {
    const [newUser, setNewUser] = useState<any[]>([inputRegister])
    const [createSchedule, setNewSchedule] = useState<CreateSchedule[]>([inputSchedule])
    const [user,setUser] = useState(LocalStorageHelper.get(LocalStorageKeys.USER))
    const [schedules,setSchedules] = useState()

    const onChangeNewSchedule = (
      propName: string,
      e: any
    ) => {
      const arr = [...newUser]
      const item = arr[0]
      item[propName] = e
      setNewSchedule(arr)
    }

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
          const result = await login(modelData).then((res) => {
            setUser(res.data.user)
            return res})
          LocalStorageHelper.set(LocalStorageKeys.USER,result.data.user)
          LocalStorageHelper.set(LocalStorageKeys.TOKEN,result.data.token)
          window.location.href = RoutePath.HOME
          return result;
        } catch (err) {
          console.error(err)
        }
    }

    async function getSchedule(email:string,typeUser:string): Promise<any> {
      console.log({doctoremail:email},typeUser)
      try {
        const result = await getSchedules({doctoremail:email},typeUser).then((res) => {
          setSchedules(res.data)
          return res})
        return result;
      } catch (err) {
        console.error(err)
      }
  }

  async function newSchedule(data:any): Promise<any> {
    try {
      const result = await postSchedule(data).then((res) => {return res})
        console.log(result.data.user)
      setTimeout(() => window.location.href = RoutePath.HOME,500)
      return result;
    } catch (err) {
      console.error(err)
    }
}

  return (
    <UserContext.Provider
      value={{
        schedules,
        newSchedule,
        createSchedule,
        getSchedule,
        user,
        newUser,
        onChangeNewUser,
        onChangeNewSchedule,
        registerUser,
        loginUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): ContextProps => useContext(UserContext)

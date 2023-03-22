export interface DataContact {
    title: string
    address?: string
    phones?: Phone[]
    email?: string
  }
  
  export interface Phone {
    phone: string
    title: string
  }
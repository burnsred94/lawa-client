import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../Button/Button'
import { FormProps } from './Form.props'
import styles from './styles.module.scss'

export const Form = ({ className, ...props }: FormProps): JSX.Element => {
  const { register, control, handleSubmit, formState, setValue } = useForm()
  const [submitData, setSubmitData] = useState({})




  return (
    <div className={styles.form}>
      <form>
        <label htmlFor="name">
          <Image src='svg/people.svg' alt='people' width={24} height={24}
          />
          <input
            {...register('name', { required: { value: true, message: 'Заполните имя' } })}
            placeholder="Имя" />
        </label>
        <label htmlFor="email">
          <Image src='svg/email.svg' alt='email' width={24} height={24}
          />
          <input
            {...register('email', { required: { value: true, message: 'Заполните имя' } })}
            placeholder="E-mail" />
        </label>
        <label htmlFor="telefone">
          <Image src='svg/tel.svg' alt='email' width={24} height={24}
          />
          <input
            {...register('email', { required: { value: true, message: 'Заполните имя' } })}
            placeholder="Телефон" />
        </label>
        <label htmlFor="text" className={styles.formArea}>
          <Image src='svg/pencil.svg' alt='email' width={24} height={24}
          />
          <input
            {...register('text', { required: { value: true, message: 'Заполните имя' } })}
            placeholder="Ваше сообщение"
            type='text' />
        </label>
        <div className={styles.formButton}>
          <Button type='submit'>Отправить</Button>
        </div>
      </form>
    </div>
  )
}



import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { Input } from '../Input/Input.component';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFormInterface } from './Form.interfaces';

import { Button } from '../Button/Button'
import { FormProps } from './Form.props'
import cn from 'classnames'
import styles from './styles.module.scss'
import { Paragraph } from '../Paragraph/Paragraph';
import { Headlines } from '../Headlines/Headlines';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const Form = ({ className, ...props }: FormProps): JSX.Element => {
  const { register, control, handleSubmit, formState, setValue } = useForm<IFormInterface>();
  const [submitData, setSubmitData] = useState(false);

  const onSubmit: SubmitHandler<IFormInterface> = async (data: IFormInterface, e: any) => {
    if (data) {
      const success = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/mails`, {
        data: {
          name: data.name,
          phone_number: data.telefone,
          email: data.email,
          text_mail: data.textarea,
          date: new Date()
        }
      })
      if (success) {
        setSubmitData(true)
        setValue('name', '')
        setValue('telefone', '')
        setValue('email', '')
        setValue('textarea', '')
        e.preventDefault();
      }
    }

    setTimeout(() => {
      setSubmitData(false)
    }, 3000)
    e.preventDefault();
  };


  const renderForm = () => (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="name">
          <Input typeInput='text' placeholder='Ваше имя'
            error={formState.errors.name}
            {...register('name', { required: { value: true, message: "Заполните имя" } })}
          />
        </label>
        <label htmlFor="email">
          <Input typeInput='email' placeholder='Ваша почта'
            error={formState.errors.email}
            {...register('email', { required: { value: true, message: "Введите свою почту" } })}
          />
        </label>
        <label className={styles.modalLabel} htmlFor="telefone" >
          <Controller

            control={control}
            rules={{ validate: (value) => isValidPhoneNumber(value, "BY") || 'Телефон должен быть формата +375 (XX) XXX XX XX' }}
            {...register('telefone', { required: { value: true, message: 'Введите номер телефона' } })}
            render={({ field: { onChange, value, ref } }) => (
              <Input typeInput='telefone' placeholder='Ваш телефон'
                error={formState.errors.telefone}
                value={value}
                onChange={onChange}
                id='telefone'
              />
            )}
          />
        </label>
        <label className={styles.modalTextLabel} htmlFor="textarea">
          <Input typeInput='textarea'
            error={formState.errors.textarea}
          >
            <textarea className={styles.modalTextLabelArea}
              {...register('textarea', { required: { value: true, message: 'Введите сообщение' }, maxLength: { value: 500, message: 'Максимальная д' } })}
              id="message"
              placeholder='Ваше сообщение'
            />

          </Input>
        </label>
        <Button init='button' className={styles.modalButton} type="submit">Отправить</Button>
      </form>
    </div>
  )

  const successSubmitted = (): JSX.Element => {
    return (
      <div className={styles.success}>
        <Image src='/svg/mail.svg' alt='alt' width={50} height={50} />
        <span>Ваши данные отправлены, в ближайшее время с вами свяжется наш консультант</span>
      </div>
    );
  };

  return !submitData ? renderForm() : successSubmitted()
}



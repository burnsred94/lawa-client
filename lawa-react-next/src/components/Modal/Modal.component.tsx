
import React, { ChangeEvent, useState } from 'react';
import { Button } from '../Button/Button';
import { Headlines } from '../Headlines/Headlines';
import styles from './style.module.scss'; // стили для модального окна
import { Paragraph } from '../Paragraph/Paragraph';
import axios from 'axios';
import { Input } from '../Input/Input.component';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IFormInterface } from '../Form/Form.interfaces';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';


interface ModalProps {
    onClose: () => void;
    url: string;
}

export const Modal = ({ onClose, url }: ModalProps): JSX.Element => {
    const { register, control, handleSubmit, formState, setValue } = useForm<IFormInterface>();
    const [submitData, setSubmitData] = useState(false);


    const onSubmit: SubmitHandler<IFormInterface> = async (data: IFormInterface, e: any) => {
        if (data) {
            await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/mails`, {
                data: {
                    name: data.name,
                    phone_number: data.telefone,
                    email: data.email,
                    text_mail: data.textarea,
                    date: new Date(),
                    url_site: url,
                }
            })
        }
        e.preventDefault();
        onClose();
        setSubmitData(true);
    };

    const handleClose = () => {
        setValue("telefone", '');
        setValue("name", '');
        setValue('email', '');
        setValue('textarea', '');
        onClose();
    }


    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.modalHeader}>
                        <Headlines tag='h3'>Думаешь, крутой продукт<br />обязательно стоит дорого?</Headlines>
                        <button onClick={() => handleClose()}></button>
                    </div>
                    <Paragraph type='sub-title-text-dull'>Мы умеем и любим решать сложные задачи. Давай обсудим проект!</Paragraph>
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
        </div>
    )



};
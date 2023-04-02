
import React, { useState } from 'react';
import { Button } from '../Button/Button';
import Image from 'next/image';
import { Headlines } from '../Headlines/Headlines';
import styles from './style.module.scss'; // стили для модального окна
import { Paragraph } from '../Paragraph/Paragraph';
import axios from 'axios';


interface ModalProps {
    onClose: () => void;
}

export const Modal = ({ onClose }: ModalProps): JSX.Element => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!name || !phone || !email || !message) {
            onClose();
        } else {
            await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/mails`, {
                data: {
                    name: name,
                    phone_number: phone,
                    email: email,
                    text_mail: message,
                    date: new Date()
                }
            })
            onClose();
        }
    };

    const handleClose = () => {
        if (name.length > 0 || phone.length > 0 || email.length > 0 || message.length > 0) {
            setPhone('');
            setEmail('');
            setName('');
            setMessage('');
        }
        onClose();
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.modalHeader}>
                        <Headlines tag='h3'>Думаешь, крутой продукт<br />обязательно стоит дорого?</Headlines>
                        <button onClick={() => handleClose()}></button>
                    </div>
                    <Paragraph type='sub-title-text-dull'>Мы умеем и любим решать сложные задачи. Давай обсудим проект!</Paragraph>
                    <label className={styles.modalLabel} htmlFor="name">
                        <Image src='/svg/people.svg' alt='people' width={24} height={24}
                        />
                        <input className={styles.modalInput}
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Заполните имя" >
                        </input>
                    </label>
                    <label className={styles.modalLabel} htmlFor="email">
                        <Image src='/svg/email.svg' alt='email' width={24} height={24}
                        />
                        <input className={styles.modalInput}
                            type="text"
                            id="email"
                            placeholder='E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label className={styles.modalLabel} htmlFor="telefone">
                        <Image src='/svg/tel.svg' alt='tel' width={24} height={24}
                        />
                        <input className={styles.modalInput}
                            type="phone"
                            id="telefone"
                            placeholder='Телефон'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} />
                    </label>
                    <label className={styles.modalTextLabel} htmlFor="message">
                        <div className={styles.modalTextLabelWrapper}>
                            <Image src='/svg/pencil.svg' alt='email' width={24} height={24}
                            />
                            <textarea className={styles.modalTextLabelArea}
                                id="message"
                                value={message}
                                placeholder='Ваше сообщение'
                                onChange={(e) => setMessage(e.target.value)} />
                        </div>
                    </label>
                    <Button init='button' className={styles.modalButton} type="submit">Отправить</Button>
                </form>
            </div>
        </div>
    )
};
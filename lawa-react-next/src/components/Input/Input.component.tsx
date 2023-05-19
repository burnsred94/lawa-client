import { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";
import Image from "next/image";
import cn from "classnames";
import styles from "./Input.module.scss";

export const Input = forwardRef(({ typeInput, isChecked, className, error, children, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
    switch (typeInput) {
        case "text":
            return (
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                        <Image decoding="async" src='/svg/people.svg' alt='people' width={24} height={24}
                        />
                        <input className={cn(className, styles.input, {
                            [styles.error]: error
                        })} ref={ref} {...props} />
                    </div>
                    {error && <span className={styles.errorMessage}>{error.message}</span>}
                </div>
            );
        case "email":
            return (
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                        <Image decoding="async" src='/svg/email.svg' alt='people' width={24} height={24}
                        />
                        <input type='email' className={cn(className, styles.input, {
                            [styles.error]: error
                        })} ref={ref} {...props} />
                    </div>
                    {error && <span className={styles.errorMessage}>{error.message}</span>}
                </div>
            );
        case "telefone":
            return (
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                        <Image decoding="async" src='/svg/tel.svg' alt='people' width={24} height={24}
                        />
                        <input type='tel' className={cn(className, styles.input, {
                            [styles.error]: error
                        })} ref={ref} {...props} />
                    </div>
                    {error && <span className={styles.errorMessage}>{error.message}</span>}
                </div>
            );
        case "textarea":
            return (
                <div className={styles.inputContainer}>
                    <div className={styles.modalTextLabelWrapper}>
                        <Image src='/svg/pencil.svg' alt='email' width={24} height={24}
                        />
                        {children}
                    </div>
                    {error && <span className={styles.errorMessage}>{error.message}</span>}
                </div>
            );
    }
});

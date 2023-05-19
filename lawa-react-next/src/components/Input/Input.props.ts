import { AllHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { FieldError } from "react-hook-form";


export interface InputProps extends DetailedHTMLProps<AllHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    typeInput: "text" | "telefone" | "email" | "textarea";
    isChecked?: boolean;
    children?: ReactNode
    label?: string;
    checked?: boolean;
    error?: FieldError
}
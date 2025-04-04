import { FC } from "react";
import { ModalProps } from "../Modal";

export interface ModalContextType {
    isOpen: boolean,
    component: FC<ModalProps> | null,
}

export type ModalContext = Array<ModalContextType>;

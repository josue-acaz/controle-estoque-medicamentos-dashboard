import React from "react";
import OutsideClickHandler from "react-outside-click-handler";

import "./styles.css";

interface ModalProps {
    handleClose(): void,
    show: boolean;
    hideOnClickOutside?: boolean;
    className?: string;
};

const Core: React.FC<ModalProps> = ({handleClose, show, children, hideOnClickOutside=true, className}) => {
  return (
        <div className={`lay-modal ${className} ${show ? "display-block" : "display-none"}`}>
            <OutsideClickHandler onOutsideClick={() => {
                if(hideOnClickOutside) {
                    handleClose();
                }
            }}>
                <section className="lay-modal-main">
                    {children}
                </section>
            </OutsideClickHandler>
        </div>
  );
};

export default Core;
"use client";
import React, {ReactNode, useState} from "react";

interface AccordionProps {
    children: ReactNode,
    defaultOpenId?: string | null;
}

export function Accordion({children, defaultOpenId = null}: AccordionProps) {
    const [openAccordionId, setOpenAccordionId] = useState<string | null>(defaultOpenId);
    const toggleAccordion = (id: string) => {
        setOpenAccordionId(openAccordionId === id ? null : id);
    };

    const childrenWithProps = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {isOpen: child.props.id === openAccordionId, onClick: () => toggleAccordion(child.props.id)});
        }
        return child;
    });

    return <div className="w-full">{childrenWithProps}</div>
}
import { FC, useState } from "react";

interface transformProps
{
    children?: React.ReactNode;
    className?: string;
}
//
const TransformComponent: React.FC<transformProps> = ({
    children,
    className = '',
}) => {
    const [isActive, setIsActive] = useState(false);

/**
 * Toggles the isActive state between true and false.
 * Updates the component's state to reflect the opposite value on each click.
 */

    const handleClick = () => {
        setIsActive((prevState) => !prevState);
    };

    return (
        <div 
            className={`${className} ${isActive ? 'active' : ''}`} 
            onClick={handleClick}>
            {children}
        </div>
    );
};

export default TransformComponent

interface SwitchformProps
{
    firstChild: React.ReactNode;
    secondChild: React.ReactNode;
    className?:string;
}

/**
 * SwitchformProps is a functional component that toggles between two child elements.
 * When clicked, it switches visibility and opacity of the provided children elements.
 * 
 * @param {React.ReactNode} firstChild - The first child component to be rendered.
 * @param {React.ReactNode} secondChild - The second child component to be rendered.
 * @param {string} className - Additional custom class names for styling.
 * @returns {React.ReactElement} The component containing the toggleable children.
 */

export const SwitchformPropsComponent:FC<SwitchformProps> = ({firstChild,secondChild,className=''}) => {
    
    const [isActive,setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive((prevState) => !prevState);
    }

    return (
        <div onClick={handleClick}>
        <div 
            className={`${className}`} 
            style={{ 
                opacity: isActive ? 0 : 1,
                visibility: isActive ? 'hidden' : 'visible',
                transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
            }}>
            {firstChild}
        </div>
        <div 
            className={`${className} active`} 
            style={{ 
                opacity: isActive ? 1 : 0,
                visibility: isActive ? 'visible' : 'hidden',
                transition: 'opacity 0.5s ease-in-out, visibility 0.5s ease-in-out'
            }}>
            {secondChild}
        </div>
    </div>
    );
}
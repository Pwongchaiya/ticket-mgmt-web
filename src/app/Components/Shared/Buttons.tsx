const Button: React.FC<{ type: "button" | "submit"; label: string; className: string; onClick?: () => void }> = ({ type, label, className, onClick }) => (
    <button type={type} className={`px-4 py-2 text-white ${className}`} onClick={onClick}>
        {label}
    </button>
);

export default Button;

const DateTimeField: React.FC<{
    label: string;
    name: string;
    value?: Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            type="datetime-local"
            name={name}
            value={value ? value.toISOString().slice(0, 16) : ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
    </div>
);

export default DateTimeField;
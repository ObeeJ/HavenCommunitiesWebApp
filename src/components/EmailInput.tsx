interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function EmailInput({ value, onChange, placeholder = "Enter your email", className = "" }: EmailInputProps) {
  return (
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`basis-0 font-['Avenir:Regular',_sans-serif] grow leading-[24px] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden text-[#717680] text-[16px] bg-transparent border-none outline-none w-full ${className}`}
    />
  );
}

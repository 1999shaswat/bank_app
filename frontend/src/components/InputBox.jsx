export const InputBox = ({ label, placeholder, onChange, type }) => {
  return (
    <div>
      <div className="font-medium text-sm text-left py-2">{label}</div>
      <input
        onChange={onChange}
        className="w-full px-2 border rounded border-slate-200"
        placeholder={placeholder}
        type={type}
      />
    </div>
  )
}

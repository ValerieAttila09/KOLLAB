interface AudienceChipsProps {
  items: string[]
}

const AudienceChips = ({ items }: AudienceChipsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default AudienceChips

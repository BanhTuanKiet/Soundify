type FilterTabProps = {
    tab: string
    activeTab: string
    onChange: (tab: string) => void
}

type FilterBarProps = {
    FilterTabs: string[]
    activeTab: string
    onChange: (tab: string) => void
}

export const FilterTab: React.FC<FilterTabProps> = ({ activeTab, tab, onChange }) => (
    <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === tab
            ? 'bg-white text-black'
            : 'bg-[#232323] text-white hover:bg-[#2a2a2a]'
            }`}
    >
        {tab}
    </button>
);

export const FilterBar: React.FC<FilterBarProps> = ({ FilterTabs, activeTab, onChange }) => (
    <div className="flex gap-2 flex-wrap">
        {FilterTabs.map(tab => (
            <FilterTab activeTab={activeTab} tab={tab} onChange={onChange} />
        ))}
    </div>
)
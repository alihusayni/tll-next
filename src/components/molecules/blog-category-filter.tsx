'use client';

interface Category {
  id: string;
  label: string;
}

interface BlogCategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className = ''
}: BlogCategoryFilterProps) {
  return (
    <div className={`border-b border-[#D2D5D9] box-border flex gap-2 items-start justify-start md:justify-center px-0 py-4 w-full overflow-x-auto scrollbar-hide ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {categories.map((category) => {
        const isActive = category.id === activeCategory;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              box-border flex gap-2 items-center justify-center px-3 md:px-4 py-2 md:py-3 rounded-full shrink-0 transition-colors
              ${isActive 
                ? 'bg-[#E1E6EB]' 
                : 'bg-transparent hover:bg-[#F7F9FC]'
              }
            `}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="flex flex-col justify-center leading-[0]">
              <p className={`
                font-inter-tight font-medium text-base md:text-lg leading-[20px] md:leading-[22px] whitespace-nowrap
                ${isActive ? 'text-[#071C32]' : 'text-[#747D85]'}
              `}>
                {category.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}


'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FAQItemData {
  question: string;
  answer: string;
}

export interface FAQProps {
  title?: string;
  subtitle?: string;
  categories: Record<string, string>;
  faqData: Record<string, FAQItemData[]>;
  className?: string;
  id?: string;
}

// Main reusable FAQ component styled to match Wayang Jawi theme
export const FAQ: React.FC<FAQProps> = ({ 
  title = "Pustaka Tanya Jawab",
  subtitle = "ꦥꦶꦠꦏꦺꦴꦤ꧀",
  categories,
  faqData,
  className,
  id = "faq",
  ...props 
}) => {
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0] || "");

  return (
    <section 
      id={id}
      className={cn(
        "relative overflow-hidden bg-[#0a0a0a] px-4 py-20 sm:py-24 text-white border-t border-[#dedf42]/15",
        className
      )}
      {...props}
    >
      <FAQHeader title={title} subtitle={subtitle} />
      <FAQTabs 
        categories={categories}
        selected={selectedCategory} 
        setSelected={setSelectedCategory} 
      />
      <FAQList 
        faqData={faqData}
        selected={selectedCategory} 
      />
    </section>
  );
};

interface FAQHeaderProps {
  title: string;
  subtitle: string;
}

const FAQHeader: React.FC<FAQHeaderProps> = ({ title, subtitle }) => (
  <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10 sm:mb-12">
    {/* Subtitle: Hanya Aksara Jawa saja sesuai permintaan */}
    <span className="mb-3 font-serif text-base sm:text-lg md:text-xl font-normal tracking-[0.25em] text-[#dedf42] select-none">
      {subtitle}
    </span>
    {/* Title: Tipografi Playfair Display */}
    <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
      {title}
    </h2>
    {/* Atmospheric Golden Lamp / Blencong Silhouette Glow Behind Title */}
    <span className="absolute -top-[250px] left-[50%] z-0 h-[450px] w-[650px] -translate-x-[50%] rounded-full bg-gradient-to-r from-[#dedf42]/15 to-[#dedf42]/5 blur-3xl pointer-events-none" />
  </div>
);

interface FAQTabsProps {
  categories: Record<string, string>;
  selected: string;
  setSelected: (key: string) => void;
}

const FAQTabs: React.FC<FAQTabsProps> = ({ categories, selected, setSelected }) => (
  <div className="relative z-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto mb-12">
    {Object.entries(categories).map(([key, label]) => {
      const isSelected = selected === key;
      return (
        <button
          key={key}
          type="button"
          onClick={() => setSelected(key)}
          className={cn(
            "relative overflow-hidden whitespace-nowrap rounded-full border px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold tracking-wider uppercase cursor-pointer select-none transition-colors duration-500",
            isSelected
              ? "border-[#dedf42] text-black shadow-lg shadow-[#dedf42]/20"
              : "border-[#dedf42]/25 bg-black/50 text-neutral-300 hover:text-[#dedf42] hover:border-[#dedf42]/60 hover:bg-[#dedf42]/10 backdrop-blur-md"
          )}
        >
          <span className={cn("relative z-10 transition-colors duration-500", isSelected ? "text-black font-extrabold" : "text-neutral-300")}>
            {label}
          </span>
          {isSelected && (
            <motion.span
              layoutId="active-faq-tab"
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 20,
                mass: 1.1,
              }}
              className="absolute inset-0 z-0 bg-[#dedf42] rounded-full"
            />
          )}
        </button>
      );
    })}
  </div>
);

interface FAQListProps {
  faqData: Record<string, FAQItemData[]>;
  selected: string;
}

const FAQList: React.FC<FAQListProps> = ({ faqData, selected }) => (
  <div className="relative z-10 mx-auto max-w-3xl px-2 sm:px-4">
    <AnimatePresence mode="wait">
      {Object.entries(faqData).map(([category, questions]) => {
        if (selected === category) {
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5 sm:space-y-4"
            >
              {questions.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </motion.div>
          );
        }
        return null;
      })}
    </AnimatePresence>
  </div>
);

const FAQItem: React.FC<FAQItemData> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "rounded-2xl border transition-all duration-300 overflow-hidden",
        isOpen 
          ? "border-[#dedf42]/60 bg-[#161009] shadow-xl shadow-[#dedf42]/5" 
          : "border-[#dedf42]/20 bg-[#0e0906]/90 hover:border-[#dedf42]/45 hover:bg-[#120b08]"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer focus:outline-none group"
      >
        <span
          className={cn(
            "text-base sm:text-lg md:text-xl font-serif font-medium transition-colors duration-200 leading-snug",
            isOpen ? "text-[#dedf42]" : "text-neutral-200 group-hover:text-white"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "45deg", scale: 1.1 },
            closed: { rotate: "0deg", scale: 1 },
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "shrink-0 rounded-full p-1.5 border transition-colors",
            isOpen 
              ? "border-[#dedf42] text-[#dedf42] bg-[#dedf42]/15 shadow-sm shadow-[#dedf42]/30" 
              : "border-neutral-700 text-neutral-400 group-hover:border-[#dedf42]/50 group-hover:text-[#dedf42]"
          )}
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? "auto" : "0px", 
          opacity: isOpen ? 1 : 0,
          marginBottom: isOpen ? "20px" : "0px" 
        }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden px-4 sm:px-5"
      >
        <div className="border-t border-[#dedf42]/15 pt-3.5">
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans font-normal">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FAQ;

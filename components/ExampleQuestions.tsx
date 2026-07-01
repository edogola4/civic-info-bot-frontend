const EXAMPLES = [
  'How do I register to vote in Kenya?',
  'What are the roles of my MCA?',
  'What rights does the Constitution give me?',
  'What services does my county government provide?',
  'What is the role of the County Governor?',
]

export default function ExampleQuestions({ onSelect }: { onSelect: (q: string) => void }) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-lg mx-auto px-4">
      <p className="text-xs text-gray-400 text-center mb-1">Try asking:</p>
      {EXAMPLES.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="text-left text-sm px-4 py-3 rounded-xl border border-gray-200 hover:border-[#2D6A4F] hover:bg-[#2D6A4F]/5 text-[#1B1B1B] transition-colors"
        >
          {q}
        </button>
      ))}
    </div>
  )
}

// Right side takes up 2 grid cols on desktop and above.

export default function RightSide({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full relative col-span-2 xl:col-span-3 row-span-2 lg:border-l border-neutral-700 overflow-x-hidden">
      {children}
    </div>
  );
}

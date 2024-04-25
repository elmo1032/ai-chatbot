export function TailwindIndicator() {
  const screenSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) return null;

  return (
    <div className="fixed bottom-1 left-1 z-50 flex items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      {screenSizes.map((size, index) => (
        <div key={index} className={`hidden ${isProduction ? ' ' : `xl:`}xl:block`}>
          {size}
        </div>
      ))}
    </div>
  );
}

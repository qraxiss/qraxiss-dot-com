export function LogShow({ items, error }: { items: string[], error: boolean }) {
  items = items.slice().reverse()

  console.log(items)

  if (!error) {
    items = items.filter(item => !item.includes("     LOG "))
  }

  return (
    <div className="dark:text-dark-200 mt-6 text-base text-gray-600 font-mono bg-black p-4 rounded overflow-auto">
      {items.map(item => {
        return (
          <div className="flex">
            <p className="whitespace-pre-wrap">
              {item.replaceAll("[32m", "").replaceAll("[33m", "").replaceAll("[39m", "").replaceAll("[38;5;3m", "").replaceAll("     LOG ", " | ").split("  - ")[1]}
            </p>
          </div>
        )
      })}
    </div>
  );

}

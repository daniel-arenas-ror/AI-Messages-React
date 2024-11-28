import { useEffect } from "react";

function useLocalStorage(itemName, initialValue){
  const [item, setItem] = useState(initialValue);

  useEffect(() => {
    let parseItem = localStorage.getItem(itemName)
    parseItem = !parseItem ? initialValue : JSON.parse(parseItem)

    setItem(parseItem)
  }, [])

  const saveItem = (newItem) => {
    setItem(newItem);
    localStorage.setItem(itemName, JSON.stringify(newItem))
  }

  return {
    item,
    saveItem
  }
}

export { useLocalStorage };

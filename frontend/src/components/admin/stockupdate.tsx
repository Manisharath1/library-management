import { useEffect, useState } from "react";
import Modal from "../ui/modal";
import { getBook, updateStockValue } from "../services/bookservice";
import { useToast } from "../ui/use-toast";

interface StockUpdateProps {
  setDisplayStockModal: React.Dispatch<React.SetStateAction<boolean>>;
  bookId: string;
  refreshBooks: () => void;
}

const StockUpdate: React.FC<StockUpdateProps> = ({
  setDisplayStockModal,
  bookId,
  refreshBooks,
}) => {
  const { toast } = useToast();
  const [isHidden, setHidden] = useState(false);
  const [stockValue, setStockValue] = useState("");

  useEffect(() => {
    try {
      getBook(bookId).then((respone) => {
        if (respone.data && respone.data.availableStock) {
          setStockValue(respone.data.availableStock);
        } else {
            setStockValue("0");
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [bookId]);

  useEffect(() => {
    setDisplayStockModal(!isHidden);
  }, [isHidden, setDisplayStockModal, setHidden]);

  function onStockSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      updateStockValue(bookId, Number(stockValue)).then(() => {
        toast({ title: "Updated stock" });
        refreshBooks();
        setHidden(true);
      });
    } catch (err) {
      console.error(err);
    }
  }

  const styleInput =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const styleLabel = "block text-gray-700 text-sm font-bold mb-2";
  return (
    <Modal isHidden={isHidden} setHidden={setHidden} heading="Update Stock">
      <form onSubmit={onStockSubmit}>
        <div className="mb-5">
          <label className={styleLabel}>Book stock</label>
          <input
            className={styleInput}
            id="studentReferenceNumber"
            type="number"
            placeholder="Quantity"
            value={stockValue}
            onChange={(e) => setStockValue(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            type="button"
            onClick={() => setHidden(true)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StockUpdate;

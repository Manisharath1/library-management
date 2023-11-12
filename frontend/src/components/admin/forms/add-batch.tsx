import {
  addBatch,
  getBatch,
  upadateBatch,
} from "@/components/services/batchservice";
import Modal from "@/components/ui/modal";
import { useToast } from "@/components/ui/use-toast";
import Batch from "@/model/Batch";
import { useEffect, useState, useRef } from "react";

interface AddBatchProps {
  setDisplayBatchModal: React.Dispatch<React.SetStateAction<boolean>>;
  updateBatchData: () => void;
  batchId: string;
}

const AddBatch: React.FC<AddBatchProps> = ({
  batchId,
  setDisplayBatchModal,
  updateBatchData,
}) => {
  const [isHidden, setHidden] = useState(false);
  const { toast } = useToast();
  const batchNameRef = useRef<HTMLInputElement>(null);
  const totalSemesterRef = useRef<HTMLInputElement>(null);
  const toastMessage = batchId.length > 0 ? "Batch updated" : "Batch added";
  const headingMessage = batchId.length > 0 ? "Update Batch" : "Add Batch";

  const [batch, setBatch] = useState<Batch>({
    batchName: "",
    totalSemester: 0,
  });

  useEffect(() => {
    setDisplayBatchModal(!isHidden);
  }, [isHidden, setDisplayBatchModal, setHidden]);

  useEffect(() => {
    try {
      if (batchId)
        getBatch(batchId).then((response) => setBatch(response.data));
    } catch (err) {
      console.error(err);
    }
  }, [batchId]);

  useEffect(() => {
    batchNameRef.current!.value = batch.batchName;
    totalSemesterRef.current!.value = String(batch.totalSemester);
  }, [batch.batchName, batch.totalSemester]);

  const styleInput =
    "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  const styleLabel = "block text-gray-700 text-sm font-bold mb-2";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const batchName = batchNameRef.current?.value || "";
    const totalSemester = Number(totalSemesterRef.current?.value) || 0;

    const batch: Batch = { batchName, totalSemester };
    function afterApiCall() {
      toast({
        title: toastMessage,
      });

      updateBatchData();
      setHidden(true);
    }
    try {
      batchId.length > 0
        ? upadateBatch(batch, batchId).then(() => afterApiCall())
        : addBatch(batch).then(() => afterApiCall());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Modal isHidden={isHidden} setHidden={setHidden} heading={headingMessage}>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label className={styleLabel}>Batch name</label>
          <input
            className={styleInput}
            id="batchname"
            type="text"
            placeholder="Batch name"
            ref={batchNameRef}
          />
        </div>
        <div className="mb-5">
          <label className={styleLabel}>Total semester</label>
          <input
            className={styleInput}
            id="totalSemester"
            type="number"
            placeholder="Total semester"
            ref={totalSemesterRef}
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

export default AddBatch;

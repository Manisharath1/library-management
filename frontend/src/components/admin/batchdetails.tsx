import { useEffect, useState } from "react";
import { deleteBatch, getAllBatch } from "../services/batchservice";
import DataTable from "@/common/datatable";
import { BiSearch } from "react-icons/bi";
import OverFlowMenuItem from "@/model/OverFlowMenuItem";
import { useToast } from "../ui/use-toast";
import Batch from "@/model/Batch";
import AddBatch from "./forms/add-batch";

const BatchDetails = () => {
  const { toast } = useToast();
  const [batchs, setBatchs] = useState<Batch[]>([]);
  const [filteredBatch, setFilteredBatch] = useState<Batch[]>([]);
  const [search, setSearch] = useState("");
  const [displayBatchModal, setDisplayBatchModal] = useState(false);
  const [batchId, setBatchId] = useState("");

  const overflowMenuItems: OverFlowMenuItem[] = [
    {
      label: "Edit",
      callBack: updateBatchDetails,
    },
    {
      label: "Inactive",
      callBack: inactiveBatch,
    },
  ];

  function updateBatchDetails(id: string) {
    setBatchId(id);
    setDisplayBatchModal(true);
  }

  function inactiveBatch(id: string) {
    try {
      deleteBatch(id).then(() => {
        toast({
          title: "Succefully mark as inactive",
        });
        getBatchs();
      });
    } catch (err) {
      console.error(err);
    }
  }

  function getBatchs() {
    try {
      getAllBatch().then((response) => {
        setBatchs(response.data);
        setFilteredBatch(response.data);
      });
    } catch (err) {
      console.error(err);
    }
  }

  function onSearch(data: string) {
    setSearch(data);
    if (data.length > 3) {
      const result = batchs.filter((batch) =>
        batch.batchName.toLocaleLowerCase().includes(data.toLocaleLowerCase())
      );
      setFilteredBatch(result);
    } else {
      setFilteredBatch(batchs);
    }
  }

  useEffect(() => {
    getBatchs();
  }, []);

  return (
    <div className="shadow-lg rounded-md p-5 bg-white">
      <h2 className="text-xl text-center font-bold p-2">Batch Details</h2>
      <hr />
      <div className="w-full mt-6 flex h-full justify-between items-center">
        <div
          className="flex items-center border border-gray-300 flex-1 px-2"
          style={{ borderBottom: "none" }}
        >
          <BiSearch />
          <input
            type="search"
            placeholder="search here"
            className="outline-none p-2 w-full"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div>
          <button
            className="bg-blacktext-white bg-black text-white p-2"
            onClick={() => {
              setBatchId("");
              setDisplayBatchModal(true);
            }}
          >
            Add Batch
          </button>
        </div>
      </div>
      <DataTable
        data={filteredBatch}
        idName="batchId"
        overflowMenu={overflowMenuItems}
      />
      {displayBatchModal && (
        <AddBatch
          setDisplayBatchModal={setDisplayBatchModal}
          updateBatchData={getBatchs}
          batchId={batchId}
        />
      )}
    </div>
  );
};

export default BatchDetails;

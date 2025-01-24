import useFetchClients from "@/app/(invoice-application)/(client)/client/_hooks/useFetchClients";
import Button from "@/components/Button";
import { ClientType } from "@/types/ClientType";
import React, { useEffect, useState } from "react";

type SelectClientModalProps = {
  closeModal: () => void;
  openNewInvoicesForm: any;
};

const SelectClientModal = ({
  closeModal,
  openNewInvoicesForm,
}: SelectClientModalProps) => {
  const { data, isLoading, isError, error } = useFetchClients(
    undefined,
    undefined,
    50
  );
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const handleSelectClient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClientId(Number(event.target.value));
  };

  useEffect(() => {
    document.title = "Select Client - Invoice Application";
  }, []);
  return (
    <>
      <div className="bg-white flex flex-col items-start gap-4 font-poppins p-8 w-[320px] md:w-[500px]">
        <h1 className="text-xl font-semibold">Client List</h1>
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-xs">Client</label>
          <select
            disabled={isLoading || isError}
            className="text-[#AAAAAA] border-[1px] border-[#CCCCCC] py-2 rounded-md w-full"
            onChange={handleSelectClient}
            value={selectedClientId || ""}
          >
            {/* DEFAULT OPTION */}
            <option className="text-sm" value={""}>
              Select Client
            </option>
            {isLoading && (
              <option className="text-sm" value={""}>
                Select Client
              </option>
            )}
            {isError && (
              <option className="text-sm text-red-600">{`Error: ${error?.message || "An Unknown Error Occurred."
                }`}</option>
            )}
            {data && data?.data.clients.length > 0 ? (
              data.data.clients.map((client: ClientType) => (
                <option className="text-sm" key={client.id} value={client.id}>
                  {`${client.firstname} ${client.lastname} - ${client.companyName}`}
                </option>
              ))
            ) : (
              <option className="text-sm">No Data Found</option>
            )}
          </select>
        </div>
        <div className="flex self-end items-center gap-2 mt-2">
          <Button
            className="bg-white text-red-700 border-2 border-white hover:border-2 hover:border-red-700 px-4 lg:px-8"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className="border-2 border-[#D2232D] px-4 lg:px-10"
            onClick={() => {
              if (selectedClientId) {
                const selectedClient = data?.data.clients.find(
                  (client: ClientType) => client.id === selectedClientId
                );
                if (selectedClient) {
                  openNewInvoicesForm(selectedClient);
                }
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectClientModal;

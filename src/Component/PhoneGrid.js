import React, { useState, useEffect, useMemo } from "react";
import Grid from "./Grid";
import ModalContainer from "./ModalContainer";
import Editor from "./Editor";
import { getFormattedDate, formatPhoneEntry } from "../Utility";
import { Get, Post } from "../API/phonebook";
import Check from "../check.png";
import "./PhoneGrid.css";

const PhoneGrid = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [phoneEntries, setPhoneEntries] = useState(null);

  const [selectEntry, setSelectEntry] = useState(null);
  const columns = useMemo(
    () => [
      {
        Header: "Number",
        accessor: "number",
      },
      {
        Header: "Extension",
        accessor: "extn",
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: (cellInfo) => {
          switch (cellInfo.cell.value) {
            case "C":
              return "Callback";
            case "O":
              return "Operator";
            case "CID":
              return "Caller ID";
            default:
              return;
          }
        },
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "State",
        accessor: "state",
      },
      {
        Header: "Description",
        accessor: "desc",
      },
      {
        Header: "Date Created",
        accessor: "date",
        Cell: (cellInfo) => {
          return getFormattedDate(cellInfo.cell.value);
        },
      },
      {
        Header: "Active",
        accessor: "isActive",
        Cell: (cellInfo) => {
          return cellInfo.cell.value ? <img src={Check} alt="active" /> : "";
        },
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      let response;
      try {
        response = await Get("/getallphoneentries");
        setPhoneEntries(response.phoneEntries);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const toggleModal = () => {
    setSelectEntry(null);
    setModalOpen(!modalOpen);
  };

  const savePhoneDetails = async (data) => {
    setModalOpen(!modalOpen);
    setIsLoading(true);
    let response;
    try {
      response = await Post("/createPhoneEntry", data);
      if (response.error) setError(true);
      setPhoneEntries([...phoneEntries, data]);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const editPhoneEntry = (data) => {
    const form = formatPhoneEntry(data);
    setSelectEntry(form);
    setModalOpen(true);
  };

  const updatePhoneDetails = async (data) => {
    setModalOpen(!modalOpen);
    setIsLoading(true);
    let response;
    try {
      response = await Post("/updatephoneentry", data);
      if (response.error) setError(true);
      setPhoneEntries(
        phoneEntries.map((item) => (item.number === data.number ? data : item))
      );
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <p className="text-center">Some error occured!!!</p>;

  return (
    <div className="grid-container">
      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && (
        <Grid columns={columns} data={phoneEntries} onEdit={editPhoneEntry} />
      )}

      <div className="grid-action">
        <button onClick={toggleModal}>Add</button>
        <button>Cancel</button>
      </div>

      {modalOpen && (
        <ModalContainer
          renderContent={() => (
            <Editor
              onClose={toggleModal}
              onSave={savePhoneDetails}
              onUpdate={updatePhoneDetails}
              data={selectEntry}
            />
          )}
        />
      )}
    </div>
  );
};

export default PhoneGrid;

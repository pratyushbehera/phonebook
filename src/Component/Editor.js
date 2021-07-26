import React, { useState } from "react";
import { usStates } from "../Utility";
import "./Editor.css";

const defaultForm = {
  number: "",
  type: "C",
  state: "AL",
  isActive: false,
  desc: "",
  extn: "",
  city: "",
  date: new Date().toString(),
};

const Editor = ({ onClose, onSave, onUpdate, data }) => {
  const [form, setForm] = useState(!data ? defaultForm : data);
  const [editable] = useState(!!data);
  const [error, setError] = useState(false);
  const updateForm = (e) => {
    if (e.target.name === "isActive")
      setForm({ ...form, [e.target.name]: !form.isActive });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = () => {
    setError(false);
    if (form.number) {
      onSave(form);
    } else {
      setError(true);
    }
  };

  const formUpdate = () => {
    setError(false);
    if (form.number) {
      onUpdate(form);
    } else {
      setError(true);
    }
  };

  return (
    <div className="editor">
      <div className="editor-header">Add Phone Number</div>
      <div className="editor-content">
        <form>
          <div className="half">
            <div className="form-group">
              <label htmlFor="number">Phone Number</label>
              <input
                type="number"
                id="number"
                name="number"
                disabled={editable}
                value={form.number}
                onChange={updateForm}
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Number type</label>
              <select
                id="type"
                name="type"
                onChange={updateForm}
                value={form.type}
              >
                <option value="C">Callback</option>
                <option value="O">Operator</option>
                <option value="CID">Caller ID</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <select
                id="state"
                name="state"
                onChange={updateForm}
                value={form.state}
              >
                {usStates &&
                  usStates.map((item) => {
                    return (
                      <option key={item.abbreviation} value={item.abbreviation}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <div>
                <label htmlFor="active">
                  <input
                    type="radio"
                    name="isActive"
                    id="active"
                    onChange={updateForm}
                    checked={form.isActive}
                  />
                  Active
                </label>
                <label htmlFor="inactive">
                  <input
                    type="radio"
                    name="isActive"
                    id="inactive"
                    onChange={updateForm}
                    checked={!form.isActive}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div className="half">
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                id="desc"
                name="desc"
                onChange={updateForm}
                value={form.desc}
              />
            </div>
            <div className="form-group">
              <label htmlFor="extn">Extension</label>
              <input
                type="text"
                id="extn"
                name="extn"
                onChange={updateForm}
                value={form.extn}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={updateForm}
                value={form.city}
              />
            </div>
          </div>
          <div className="clear"></div>
        </form>

        {error && <p className="error">Phone number is required</p>}
        <div className="editor-action">
          {!editable && <button onClick={submitForm}>Save</button>}
          {editable && <button onClick={formUpdate}>Update</button>}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Editor;

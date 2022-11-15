import { useState } from 'react'
import * as xlsx from 'xlsx';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react'
import '../styles/xl.css';

function XL() {
  const [json, setJson] = useState(null);

  const readUploadFile = (e) => {
    e.preventDefault();
    console.log(`read upload file...`);
    if (e.target.files) {
      console.log(`read upload file... file present`);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(`read upload file... file present...e.target.result: ${e.target.result}`);

        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);

        setJson(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  const postLocationData = async (data) => {
    try {
      const locationData = [];
      data.forEach((item) => {
        // eq_type, make, model_name
        const { eq_type, make, model_name, serial_number, last_checked, notes, ...rest } = item;
        locationData.push(rest);
      });

      const filtered = locationData.filter((item, i, arr) =>
        arr.findIndex(t => t.building === item.building && t.room === item.room) === i)

      console.log(`Data:location ${JSON.stringify(filtered)}`);
      // debuggery
      filtered.forEach((o) => {
        console.log(`building: ${o.building}, room: ${o.room}`);
      })
      // return;
      const result = await axios.post('/api/v1/locations/xl-import', {
        body: filtered
      })

      console.log(`location import result: ${JSON.stringify(result)}`);

    }
    catch (error) {
      console.log(`getlocationData error: ${error}`);
    }
  }

  const postModelData = async (data) => {
    try {
      const modelData = [];
      data.forEach((item) => {
        // eq_type, make, model_name
        const { serial_number, building, room, last_checked, notes, ...rest } = item;
        modelData.push(rest);
      });

      const filtered = modelData.filter((item, i, arr) =>
        arr.findIndex(t => t.eq_name === item.eq_name && t.make === item.make && t.model_name === item.model_name) === i)

      console.log(`modelData: ${JSON.stringify(filtered)}`);
      // debuggery
      filtered.forEach((o) => {
        console.log(`eq_type: ${o.eq_type}, make: ${o.make}, model: ${o.model_name}`);
      })
      // return;
      const result = await axios.post('/api/v1/models/xl-import', {
        body: filtered
      })

      console.log(`model import result: ${JSON.stringify(result)}`);

    }
    catch (error) {
      console.log(`getModelData error: ${error}`);
    }
  }

  const postEquipmentData = async (data) => {
    try {
      const eqData = [];
      data.forEach((item) => {
        // eq_type, make, model_name
        const { eq_type, make, model_name, ...rest } = item;
        // eqData.push(rest);
        eqData.push(item);
      });

      const result = await axios.post('/api/v1/equipment/xl-import', {
        body: eqData
      })

      console.log(`eq import result: ${JSON.stringify(result)}`);

    }
    catch (error) {
      console.log(`getModelData error: ${error}`);
    }
  }

  const handleModelSave = (e) => {
    e.preventDefault();
    if (json) {
      postModelData(json)
    }
  }
  const handleEqSave = (e) => {
    e.preventDefault();
    if (json) {
      postEquipmentData(json)
    }
  }
  const handleLocationSave = (e) => {
    e.preventDefault();
    if (json) {
      postLocationData(json)
    }
  }

  return (
    <div className="xl-component">
      <div className="w-4/5 h-fit p-3 text-justify">
        <article>
          {`This component is designed to import an Excel (i.e. .xlsx) file
            and give the options to import location, model, and equipment
            data separately. This is for admin use only, but it has been left 
            accessible in order to demonstrate that it was done as part of This
            project. It is necessary to import models and locations before equipment.
            If not, the imported equipment will not receive the associated 
            model and location ids, due to their not existing yet.
            The file load should still work, and does not hit the server/database. 
            It will just display the excel file as JSON in the box below. 
            This has only been tested on a file with one worksheet and only one table,
            so results may vary.`}
        </article>
      </div>
      <form className="xl-form">
        <Form.Field>
          <label htmlFor="upload">Upload File</label>
          <input
            type="file"
            name="upload"
            id="upload"
            onChange={readUploadFile}
          />
        </Form.Field>
        <Form.Field>
          <Button className="xl-btn" type="submit" onClick={(e) => handleModelSave(e)}>post models</Button>
          <Button className="xl-btn" type="submit" onClick={(e) => handleEqSave(e)}>post equipment</Button>
          <Button className="xl-btn" type="submit" onClick={(e) => handleLocationSave(e)}>post locations</Button>
        </Form.Field>
      </form>
      <div className="xl-json-code" style={{ backgroundColor: "blue", marginTop: "5000em" }}>
        {JSON.stringify(json)}
      </div>
    </div>
  )
}

export default XL
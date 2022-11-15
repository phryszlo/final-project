import { useState, useEffect } from "react";

const name = (props) => {
  const [thing1, setThing1] = useState(null);

  useEffect(() => {
  }, [])

  return (
    <div>
      <table>
        <thead>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          {thing1.map((v, i) => (
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
};

export default name;

import ModelForm from "./ModelForm";
import ModelsTable from "./ModelsTable";
import { useEffect, useContext } from 'react';
import '../../styles/inventory.css';
import { ModelsContext } from '../../state/ModelsContext';
import { getModels } from '../../utilities/inventory-service';

function ModelsPage() {
  const {model, models} = useContext(ModelsContext);
  const [mods, setMods] = models;


  useEffect(() => {


    const callGetModels = async () => {
      try {
        const loc = await getModels();
        setMods(loc.models);
      } catch (error) {
        console.log(`callModels error: ${error}`);
      }
    }
    callGetModels();
  }, []);


  useEffect(() => {
    console.log(`locpage euf: ${JSON.stringify(model)}`)
  }, [model]);

  return (
    <main className="model-page-main flex flex-col w-screen min-w-max justify-start items-center !pt-5 ">
      <h2 className="font-burtons text-lg !mb-2 text-teal-600">Models Page</h2>
      <div className="flex">
        <ModelsTable />
        <ModelForm />
      </div>
    </main>
  )
}

export default ModelsPage
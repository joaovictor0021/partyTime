import { useEffect, useState } from "react";
import partyFetch from "../axios/config";
import {Link} from 'react-router-dom'
import Title from "../components/Title";

function Home() {
  const [partys, setPartys] = useState(null);

  useEffect(() => {
    const loadParties = async () => {
      const res = await partyFetch.get('/parties');

      setPartys(res.data);
    };

    loadParties();
  }, []);

  if(!partys) return <p>Carregando...</p> 

  return (
    <div className="w-full h-fit flex flex-col justify-center gap-10">
      <Title>Suas Festas</Title>
      <div className="w-full h-full p-6 flex gap-10">
        {partys.length === 0 && <p>Não há festas cadastradas</p>}
        {partys.map((party) => (
          <div className="w-[400px] h-fit rounded-md flex flex-col gap-2" key={party._id}>
            <img className="rounded-md" src={party.image} alt={party.title} />
            <h1 className="text-xl italic ">{party.title}</h1>
            <Link className={`px-2 py-1 bg-purple-300 rounded-md w-fit hover:opacity-70 `} to={`/party/${party._id}`}>Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
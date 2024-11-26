import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import partyFetch from "../axios/config";

import useToast from "../hook/useToast"

import  Title from "../components/Title"

function Party() {
  const {id} = useParams();
  const [party, setParty] = useState();
  const navigate = useNavigate()

  // Loady party
  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`)

      const data = res.data;

      setParty(data)
    }

    loadParty();
  }, []);

  // Delete this party
  const handleDelete = async () => {
    const res = await partyFetch.delete(`/parties/${id}`)

    if (res.status === 200) {
      navigate('/')
      useToast(res.data.msg)
    }
  }

  if(!party) return <p>Carregando...</p>

  return (
    <div className="flex flex-col p-6 gap-4">
      <Title >{party.title}</Title>
      <p className="text">{party.description}</p>
      <div className="flex gap-3">
        <Link to={`/party/edit/${party._id}`} className="px-2 py-1 bg-green-300" >Editar</Link>
        <button onClick={handleDelete} className="px-2 py-1 bg-red-300" >Excluir</button>
      </div>
      <p>Orçamento: R${party.budget}</p>
      <h3>Serviços contratados:</h3>
      <div className="flex gap-5">
        {party.services.map((service) => (
          <div  key={service._id}>
            <img className="h-[200px]" src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Party;
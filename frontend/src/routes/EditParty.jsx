import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import useToast from "../hook/useToast";
import Title from "../components/Title";
import Label from "../components/Label";
import Span from "../components/Span";
import Input from "../components/Input";
import partyFetch from "../axios/config";


function EditParty() {
  const { id } = useParams();
  const [party, setParty] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get('/services');

      const data = res.data;

      setServices(data)

      loadParty();
    };

    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`)

      const data = res.data;

      setParty(data)
    };

    loadServices()
  }, []);

  // Add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    let partyServices = party.services;

    if (checked) {
      partyServices = [...partyServices, filteredService[0]];
    } else {
      partyServices =  partyServices.filter((s) => s._id !== value);
    }

    setParty({...party, services: partyServices});
  };



  const updateParty = async (e) => {
    e.preventDefault();
    
    try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);

      if(res.status === 200) {
        navigate(`/party/${id}`);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error")
    }
  }

  if (!party) return <p>Carregando...</p>

  return (
    <div className="w-full min-h-[190vh] p-6 flex flex-col items-center">
      <Title>Editando: {party.title}</Title>
      <p className="text-[18px] italic text-center tracking-wide">Ajuste as informações da sua festa</p>

      <form onSubmit={(e) => updateParty(e)} className="w-[950px] flex flex-col justify-center items-center pt-14 gap-5">
        <Label>
          <Span className="text-[18px]">Nome da festa:</Span>
          <Input onChange={(e) => setParty({...party, title: e.target.value})} value={party.title} type="text" placeholder="Seja criativo..." required />
        </Label>

        <Label>
          <Span>Anfitrião:</Span>
          <Input onChange={(e) => setParty({...party, author: e.target.value})} value={party.author} type="text" placeholder="Quem está dando a feta ?" required />
        </Label>

        <Label>
          <Span>Descrição:</Span>
          <textarea onChange={(e) => setParty({...party, description: e.target.value})} value={party.description} className="w-full min-h-[150px] p-2 border-2 border-[#d6d6d6] rounded-md outline-purple-300" type="text" placeholder="Conte mais sobre a festa..." />
        </Label>

        <Label>
          <Span>Orçamento:</Span>
          <Input onChange={(e) => setParty({...party, budget: e.target.value})} value={party.budget} type="number" placeholder="Quanto você pretende investir ?" required />
        </Label>

        <Label>
          <Span>Imagem:</Span>
          <Input onChange={(e) => setParty({...party, image: e.target.value})} value={party.image} type="text" placeholder="Insira a URL de uma imagem" required />
        </Label>

        <div className="flex flex-col justify-center mt-[6rem]">
          <Title>Escolha os serviços</Title>
          <p className="text-[18px] italic text-center tracking-wide">Escolha alguns dos serviços abaixo para que sua festa seja inesquecível!</p>
          <div className="flex flex-wrap items-center gap-5 mt-[6rem]">
            {services.length === 0 && <p>Carregando serviços...</p>}
            {services.length > 0 && services.map((service) => (
              <div className="flex flex-col" key={service._id}>
                <img className="w-[220px] h-[140px] rounded-[6px]" src={service.image} alt={service.name} />
                <p>{service.name}</p>
                <p>R${service.price}</p>
                <div className="flex items-center gap-2">
                  <input className="w-[17px] h-[17px]" type="checkbox" value={service._id} onChange={(e) => handleServices(e)} checked={party.services.find((partyService) => partyService._id === service._id) || ""} />
                  <p>Marque para solicitar</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="w-fit px-[80px] py-[10px] my-10 bg-purple-300 border-2 border-purple-300 rounded-md text-xl hover:opacity-80" type="submit">Atualizar festa</button>
      </form>
    </div>
  )
}

export default EditParty;
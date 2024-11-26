import { useEffect, useState } from "react";
import {useNavigate}  from 'react-router-dom'
import useToast from "../hook/useToast";

import partyFetch from "../axios/config";
import Input from "../components/Input";
import Label from "../components/Label";
import Span from "../components/Span";
import Title from "../components/Title";


function CreateParty() {
  const navigate = useNavigate()  
  const [services, setServices] = useState([]);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState('');
  const [partyServices, setPartyServices] = useState([]);

  // Load services
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get('/services');

      const data = res.data;

      setServices(data)
    }
    loadServices()
  }, []);


  // Add or remove services
  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    if (checked) {
      setPartyServices((services) => [...services, filteredService[0]]);
    } else {
      setPartyServices((services) => services.filter((s) => s._id !== value));
    }

    console.log(partyServices);
  }


  // Create a new Party
  const createParty = async (e) => {
    try {
      e.preventDefault();

      const party = {
        title,
        author,
        description,
        budget,
        image,
        services: partyServices,
      }

      const res = await partyFetch.post("/parties", party);

      if (res.status === 201) {
        navigate('/');
        useToast(res.data.msg)
      }

    } catch (error) {
      useToast(error.response.data.msg, "error")
    }
  }

  return (
    <div className="w-full min-h-[190vh] p-6 flex flex-col items-center">
      <Title>Crie sua próxima Festa</Title>
      <p className="text-[18px] italic text-center tracking-wide">Defina o seu orçamento e escolha os serviços</p>

      <form onSubmit={(e) => createParty(e)} className="w-[950px] flex flex-col justify-center items-center pt-14 gap-5">
        <Label>
          <Span className="text-[18px]">Nome da festa:</Span>
          <Input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Seja criativo..." required />
        </Label>

        <Label>
          <Span>Anfitrião:</Span>
          <Input onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder="Quem está dando a feta ?" required />
        </Label>

        <Label>
          <Span>Descrição:</Span>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full min-h-[150px] p-2 border-2 border-[#d6d6d6] rounded-md outline-purple-300" type="text" placeholder="Conte mais sobre a festa..." />
        </Label>

        <Label>
          <Span>Orçamento:</Span>
          <Input onChange={(e) => setBudget(e.target.value)} value={budget} type="number" placeholder="Quanto você pretende investir ?" required />
        </Label>

        <Label>
          <Span>Imagem:</Span>
          <Input onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="Insira a URL de uma imagem" required />
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
                  <input className="w-[17px] h-[17px]" type="checkbox" value={service._id} onChange={(e) => handleServices(e)} />
                  <p>Marque para solicitar</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="w-fit px-[80px] py-[10px] my-10 bg-purple-300 border-2 border-purple-300 rounded-md text-xl hover:opacity-80" type="submit">Criar festa</button>
      </form>
    </div>
  )
}

export default CreateParty;
const { default: mongoose } = require("mongoose");
const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0)

  console.log(priceSum, budget)
  if (priceSum > budget) {
    return false;
  }

  return true;
}

const PartyController = {
  create: async (req, res) => {
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      }

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(400).json({ msg: "O seu orçamento é insuficiente." })
        return
      }

      const response = await PartyModel.create(party);
      res.status(201).json({ response, msg: "Festa criada com sucesso!" })

    } catch (error) {
      console.log(error)
    }
  },
  getAll: async (req, res) => {
    try {
      const parties = await PartyModel.find();

      res.json(parties);
    } catch (error) {
      console.log(error)
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;

      // Validação
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido." });
      }

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: "Festa não encontrada!" })
        return;
      }

      res.json(party)
    } catch (error) {
      console.log(error)
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido" })
      }

      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: "Festa não encontrada." });
        return;
      }

      const deletedParty = await PartyModel.findByIdAndDelete(id)

      res.status(200).json({ deletedParty, msg: "Festa excluída com sucesso!" })

    } catch (error) {
      console.log(error)
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido." })
      }

      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      }

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(400).json({ msg: "O seu orçamento é insuficiente" })
        return
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);


      if (!updatedParty) {
        res.status(404).json({ msg: "Festa não encontrada." });
        return;
      }

      res.status(200).json({ party, msg: "Festa atualizada com sucesso!" })
    } catch (error) {
      console.log(error)
    }
  }
};

module.exports = PartyController;
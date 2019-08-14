const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Poll = require("../../models/Poll");

/**
 * @route GET api/polls/list/:[all, opened, next, closed]
 * @desc  Get polls by status
 * @access public
 */
router.get("/list/:status", async (req, res) => {
  try {
    let polls = {};
    switch (req.params.status) {
      // Retorna apenas as enquetes em aberto
      case "opened":
        polls = await Poll.find({
          $and: [
            { start: { $lte: new Date(Date.now()) } },
            { end: { $gte: new Date(Date.now()) } }
          ]
        }).sort({ start: 1 });
        break;
      // Retorna as próximas enquetes
      case "next":
        polls = await Poll.find({
          start: { $gt: new Date(Date.now()) }
        }).sort({ start: 1 });
        break;

      // Retorna as enquetes fechadas
      case "closed":
        polls = await Poll.find({
          end: { $lt: new Date(Date.now()) }
        }).sort({ start: 1 });
        break;

      // Retorna todas as enquetes
      case "all":
        polls = await Poll.find().sort({ start: 1 });
        break;

      default:
        return res.status(404).json({ msg: "Opção inválida" });
        break;
    }
    return res.status(200).json(polls);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

/**
 * @route POST api/polls/add
 * @desc  Add a Poll
 * @access public
 */

router.post(
  "/add",
  [
    check("title", "Título da enquete é obrigatório")
      .not()
      .isEmpty(),
    check("start", "A data de início é obrigatória")
      .not()
      .isEmpty(),
    check("end", "A data de término é obrigatória")
      .not()
      .isEmpty(),
    check("options", "As opções são obrigatórias").isArray()
  ],
  async (req, res) => {
    // Verifica se os campos obrigatórios foram preenchidos
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, start, end, options } = req.body;

      // Verifica se tem pelo menos 3 opções
      if (options.length < 3) {
        return res
          .status(400)
          .json({ msg: "É preciso ter no mínimo 3 opções!" });
      }

      // Cria objeto da enquete
      const pollFields = {
        title,
        start: new Date(
          start
            .split("/")
            .reverse()
            .join("-")
        ),
        end: new Date(
          end
            .split("/")
            .reverse()
            .join("-")
        ),
        options
      };

      // Salvando...
      const poll = new Poll(pollFields);
      await poll.save();

      return res.send(poll);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

/**
 * @route PUT api/polls/edit/:id
 * @desc  Edit a specific poll
 * @access public
 */

router.put(
  "/edit/:id",
  [
    check("title", "Título da enquete é obrigatório")
      .not()
      .isEmpty(),
    check("start", "A data de início é obrigatória")
      .not()
      .isEmpty(),
    check("end", "A data de término é obrigatória")
      .not()
      .isEmpty(),
    check("options", "As opções são obrigatórias").isArray()
  ],
  async (req, res) => {
    try {
      // Verifica se os campos obrigatórios foram preenchidos
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const poll = await Poll.findById(req.params.id);
      // Se não existir a enquete, retorna 404
      if (poll) {
        const pollData = ({ title, start, end, options } = req.body);

        // Verifica se tem pelo menos 3 opções
        if (options.length < 3) {
          return res
            .status(400)
            .json({ msg: "É preciso ter no mínimo 3 opções!" });
        }

        await poll.updateOne(pollData);

        return res.status(200).json({ msg: "Enquete atualizada!" });
      } else {
        return res.status(404).json({ msg: "Enquete não encontrada!" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);

/**
 * @route DELETE api/polls/delete/:id
 * @desc  Delete a specific poll
 * @access public
 */

router.delete("/delete/:id", async (req, res) => {
  const poll = Poll.findById(req.params.id);

  try {
    if (poll) {
      await poll.deleteOne();
      return res.status(200).json({ msg: "Enquete deletada com sucesso!" });
    } else {
      return res.status(404).json({ msg: "Enquete não encontrada!" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

/**
 * @route PUT api/polls/votes/add/:poll_id/:option_id
 * @desc  Add 1 point to an option
 * @access public
 */
router.put("/votes/add/:poll_id/:option_id", async (req, res) => {
  try {
    const { poll_id, option_id } = req.params;

    // Retorna a enquete
    const poll = await Poll.findById(poll_id);

    if (!poll) return res.status(404).json({ msg: "Enquete não encontrada" });

    // Retorna o indice da opção selecionada
    const optionIndex = poll.options
      .map(option => option.id)
      .indexOf(option_id);
    const { votes } = poll.options[optionIndex]; // pega o campo de votos
    poll.options[optionIndex].votes = votes + 1; // Adiciona mais um ponto

    await poll.save();

    return res.json(poll.options);
  } catch (error) {
    if (error.kind == undefined) {
      return res.status(404).json({ msg: "opção não encontrada" });
    }
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

/**
 * @route GET api/polls/votes/all/:poll_id
 * @desc  Return all votes from a poll
 * @access public
 */
router.get("/votes/all/:poll_id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.poll_id);

    if (!poll) return res.status(404).json({ msg: "Enquete não encontrada" });

    const { options } = poll;

    let votes = options.map(item => item.votes);
    let total = votes.reduce((acummulate, vote) => acummulate + vote);

    return res.json(total);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
});

/**
 * @route GET api/polls/votes/all/:poll_id/:option_id
 * @desc  Return Total votes from a specific option
 * @access public
 */
router.get("/votes/all/:poll_id/:option_id", async (req, res) => {
  try {
    const { poll_id, option_id } = req.params;
    const poll = await Poll.findById(poll_id);

    if (!poll) return res.status(404).json({ msg: "Enquete não encontrada" });

    const { options } = poll;

    // Pega o indice da opção selecionada
    const optionIndex = options.map(option => option.id).indexOf(option_id);

    return res.json(options[optionIndex].votes);
  } catch (error) {
    if (error.kind == undefined) {
      return res.status(404).json({ msg: "opção não encontrada" });
    }
    console.log(error.kind);
    return res.status(500).send("Server error");
  }
});

// TODO Retorna o total de pontos buscando pelo ID

/**
 * @route GET api/polls/debug
 * @desc  Used to debug our application
 * @access public
 */
router.get("/debug", async (req, res) => {});

module.exports = router;

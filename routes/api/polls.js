const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Poll = require("../../models/Poll");

/**
 * @route GET api/polls
 * @desc  Return list of all posts
 * @access public
 */
router.get("/", async (req, res) => {
  var date = "29/07/2019";
  date = date
    .split("/")
    .reverse()
    .join("-");
  res.send(new Date(date));
});

/**
 * @route POST api/polls/add
 * @desc  Add a new post
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

module.exports = router;

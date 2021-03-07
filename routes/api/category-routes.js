const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        models:Product,
        attributes:['id','product_name','price','stock','category_id']
      }
    ]
  })
  .then(dbCategoryData=>{
    if(!dbCategoryData){
      res.status(404).json({message:'broken'});
      return;
    }
    res.json(dbCategoryData)
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock','category_id']
      },
    ],
      where:{
        id:req.params.id
      }
    })
      .then(dbCategoryData=>{
          if(!dbCategoryData){
            res.status(404).json({message:'broken'});
            return;
          }
        res.json(dbCategoryData);
     })
});

router.post('/', (req, res) => {
  Category.create({
    category_name:req.body.category_name
  })
  .then(dbCategoryData=>{
    console.log(dbCategoryData);
    res.json(dbCategoryData)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name
  },
  {
    where:{
      id:req.params.id
    }
  }
  )
  .then(dbCategoryData=>{
    if(!dbCategoryData){
      res.status(404).json({message:'broken'});
      return;
    }
    res.json(dbCategoryData)
  })
  .catch(err=>{
    console.log(err);
    res.status(400).json(err)
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(dbCategoryData=>{
    if(!dbCategoryData){
      res.status(404).json({message:'broken'});
      return;
    }
    res.json(dbCategoryData)
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;

import prisma from '../db';

/**
 *  Get all Update
 */

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },

    include: {
      updates: true,
    },
  });

  /**
   *  If I have to do some thing like this,
   *
   *  1. Remember this type reducing or maping or filtering
   *     or any type functionality outside of database
   *     query will increase MY SERVER COST.
   *  2. I must need to change my schema.
   *
   */
  const updates = products.reduce(
    (allUpdates, product) => [...allUpdates, product.updates],
    []
  );

  res.status(200).json({ data: updates });
};

/**
 *  Get One Update
 */

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ data: update });
};

// Create Update
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: req.body.productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    return res.status(401).json({ message: 'Noope' });
  }

  const update = await prisma.update.create({
    data: {
      body: req.body.body,
      title: req.body.title,
      product: { connect: { id: product.id } },
    },
  });

  res.status(200).json({ data: update });
};

// Update Update
export const updateUpdate = async (req, res) => {
  const { productId, ...restBody } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: req.user.id,
      },
    },
  });

  if (!product) {
    return res.status(401).json({ message: 'Noope' });
  }

  const foundUpdate = await prisma.update.findFirst({
    where: {
      productId,
      id: req.params.id,
    },
  });

  if (!foundUpdate) {
    return res.status(401).json({ message: 'Noope' });
  }

  const update = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: restBody,
  });

  res.status(200).json({ data: update });
};

// Delete Update
// export const DeleteUpdate = async (req, res) => {
//   const product = await prisma.product.findUnique({
//     where: {
//       id_belongsToId: {
//         id: req.body.productId,
//         belongsToId: req.user.id,
//       },
//     },
//   });

//   if (!product) {
//     return res.status(401).json({ message: 'Noope' });
//   }

//   const foundUpdate = await prisma.update.findFirst({
//     where: {
//       id: req.params.id,
//       productId: req.body.productId,
//     },
//   });

//   if (!foundUpdate) {
//     return res.status(401).json({ message: 'Noope' });
//   }

//   const update = await prisma.update.delete({
//     where: {
//       id: req.params.id,
//     },
//   });

//   res.status(200).json({ data: update });
// };

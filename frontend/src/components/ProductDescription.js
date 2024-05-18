import React from 'react'

function ProductDescription() {
  return (
    <div className='max-padd-container mt-20 '>
        <div className='flex gap-3 mb-4'>
            <button className='btn-dark rounded-sm !text-xs !py-[6px] w-36'>Discription</button>
            <button className='btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Care Guide</button>
            <button className='btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Size Guide</button>
        </div>
        <div className='flex flex-col pb-16'>
        <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus architecto, praesentium tenetur
            autem reiciendis perferendis soluta sequi recusandae ullam possimus. Reiciendis nemo error asperiores
            tenetur numquam ad officiis magni, animi est? Cum modi totam esse laboriosam doloremque possimus quasi,
            voluptatibus quaerat placeat unde nobis odit facilis iure, nesciunt ipsam sit quibusdam ea delectus in
            voluptas tempore! Dicta voluptates quo, ratione, sed quaerat magnam totam possimus molestiae recusandae
            deleniti nemo, aspernatur dolorem. Molestiae, excepturi placeat ipsa ipsam veniam quod?
            Adipisci beatae voluptatum voluptatibus placeat iusto quam.
        </p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aperiam sint quia, veritatis atque odit delectus aliquid pariatur eum,
            illo odio placeat corporis unde officia, amet commodi adipisci?
            Facere, molestiae quaerat!
        </p>
        </div>
    </div>
  )
}

export default ProductDescription
import Image from 'next/image'
import React from 'react'
import image from '../../public/images/error.svg'
export default function NotFound() {
  return (

<>
<div className='flex justify-center items-center min-h-vh my-7'>
<Image alt='photo' src={image} className='w-[50%] object-cover h-[50%]'/>

</div>
</>

  )
}



// import Image from 'next/image';
// import React from 'react';
// import image from '../../public/images/error.svg';

// export default function NotFound() {
//   return (
//     <div className="flex justify-center items-center ">
//       <div className="relative w-4/5 max-w-lg">
//         <Image
//           alt="Not Found"
//           src={image}
//           fill
//           className="object-contain"
//           // priority
//         />
//       </div>
//     </div>
//   );
// }
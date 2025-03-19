// import { useState } from 'react'
// import React from 'react'

// interface CheckoutFormData {
//   name: string
//   email: string
//   address: string
//   city: string
//   state: string
//   zipCode: string
// }

// interface CheckoutFormProps {
//   onSubmit: (data: CheckoutFormData) => void
// }

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState<CheckoutFormData>({
//     name: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit(formData)
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         defaultValue="Full Name"
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//       />
//       <input
//         defaultValue="Email"
//         name="email"
//         type="email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//       />
//       <input
//         defaultValue="Address"
//         name="address"
//         value={formData.address}
//         onChange={handleChange}
//         required
//       />
//       <div className="grid grid-cols-3 gap-4">
//         <input
//           defaultValue="City"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//           required
//         />
//         <input
//           defaultValue="State"
//           name="state"
//           value={formData.state}
//           onChange={handleChange}
//           required
//         />
//         <input
//           defaultValue="ZIP Code"
//           name="zipCode"
//           value={formData.zipCode}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <button type="submit">Complete Order</button>
//     </form>
//   )
// }

// export default CheckoutForm;
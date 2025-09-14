import React, { useState} from "react";


export default function RegistrationPage(){
    // const [ userEmail, setEmail]=useState('');
    // const [ businessType, setBusinessType]= useState('');
    // const [ userName, setUserName]= useState('');
    const [form, setForm]= useState({
        name:'',
        businessType:'',
        email:'',
    });

 

    // const [error, setError]=useState('');
    const handleSubmit= async(e: React.FormEvent)=>{
        e.preventDefault();
   console.log("form data", form)
    }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


return(

    <div className="max-w-md mx-auto p-6 bg-gray-300 rounded shadow relative" >

        <form onSubmit={handleSubmit}> 
            <h2 className="text-xl font-bold mt-4 text-black"> Register here</h2>
                        {/* {error && <div className="text-red-600 mb-2">{error}</div>} */}
                        <div className="mb-2">
                            <label>Full names</label>
                            <input type="text" name="name"
                            placeholder="your names"
                            value={form.name}
                           required
                           onChange={handleChange}
                           className="border p-2 round w-full my-2"/>
                        </div>
                                    <div className="mb-2">
              <label>Email</label>
              <input
                name="email"
                placeholder="you@example.com"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full my-2"
              />
            </div>

                        <div className="mb-2">
              <label>Business type</label>
              <input
                name="businessType"
                placeholder="business type"
                type="text"
                value={form.businessType}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full my-2"
              />
            </div>

                        <button type="submit" className="bg-gray-500 text-black px-4 py-2 rounded w-full">
              Register
            </button>


        </form>

    </div>
)
}
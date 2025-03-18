import { NavLink, useNavigate, useParams } from 'react-router';
import { use, useState, useEffect } from 'react';
import axios from 'axios';


const UserForm = () => {
    const navigate = useNavigate();  
    const [name, setName] = useState('');
    const {id} = useParams();

    useEffect(() => {
        if (!id) {return};

        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:3004/users/${id}`);
            setName(response.data.name);
        }
        fetchUser();
      }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`http://localhost:3004/users/${id}`, {name});
            alert('User updated successfully'); 
        } else {
            await axios.post(`http://localhost:3004/users`, {name});
            alert('User added successfully');  
        }
        setName('');
    }

    return (
        <>
            <h2>User Details</h2>
            <NavLink to={"/"}>Back to Home</NavLink>
            <form onSubmit={handleSubmit} >   
                <label>Name</label>
                <div className='d-flex gap-2'>
                    <input type="text" name="name" id="" className='form-control' value={name} onChange={(e)=>setName(e.target.value)} />
                    <button type="submit" className="btn btn-success">
                        {id ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>
        </>
        
    ); 
};

export default UserForm;
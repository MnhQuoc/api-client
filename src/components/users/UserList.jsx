import { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const UserList = () => {
    const [users, setUsers]=useState([]);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3004/users")
        .then((res) =>   setUsers(res.data))
        .catch((error) => {
            if (error.code==='ERR_NETWORK') {
                setError("Không có kết nối Interner");
            }
        });
    },[]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await axios.delete(`http://localhost:3004/users/${id}`);
            alert('User delete successfully');  
    
            // tải lại trang home khi xóa xong
            setUsers((preState)=>preState.filter((item)=>item.id !== id));
        };   
    }

    if (error) return <h1>{error}</h1>;

    return (
        < div className="container py-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Users</h1>
                <button className="btn btn-success" onClick={()=>navigate('/users/create')}>Add User</button>
            </div>
            {users.length === 0 ? (
                <p>Không có dữ liệu</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th style={{width:'180px'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td className="d-flex gap-2 justify-content-center">
                                <button className="btn btn-primary" onClick={()=>navigate(`/users/edit/${item.id}`)}>Edit</button>
                                <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            )}
        </div>
    )
}
export default UserList;
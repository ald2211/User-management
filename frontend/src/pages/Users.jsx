import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import profile from '../assets/profile.png'
import Search from '../components/Search';

 const Users=()=> {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [userState,setUserState]=useState(false)
  const [search,setSearch]=useState('')
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res=await fetch('http://localhost:3000/api/user/getusers',{credentials: 'include'})
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id,userState]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`http://localhost:3000/api/user/getusers?startIndex=${startIndex}`,{credentials: 'include'});
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUserState = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/user/state/${userIdToDelete}/${userState}`, {
            method: 'PATCH',
        });
        const data = await res.json();
        if (data.success) {
            setShowModal(false);
            setUserState(null)
            
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <>
    <div><h1 className='text-center text-3xl my-7 font-semibold'>Handle Users</h1></div>
    <Search search={search} setSearch={setSearch} />
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className='shadow-md text-center '>
            <Table.Head>
              <Table.HeadCell>Date Joined</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Number</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            {users.filter((item) =>{
                return search.toLowerCase()===''?item:item.username.toLowerCase().includes(search)
            } ).map((user)=>{
                return(
                    <Table.Body className='divide-y' key={user._id}>
                      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                         <p className='flex justify-center p-3 mt-2'>
                         <img
                            src={user.avatar ? `http://localhost:3000/uploads/${user.avatar}` : profile} 
                            alt={user.username}
                            className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                          />
                         </p>
                        </Table.Cell>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.number}</Table.Cell>
                        
                        <Table.Cell>
                          <span
                            onClick={() => {
                              setShowModal(true);
                              setUserIdToDelete(user._id);
                              setUserState(user.isBlocked)
                            }}
                            className='font-medium text-black   hover:bg-blue-600 rounded p-2 cursor-pointer'
                          >
                            {user.isBlocked?'unBlock':'Block'}
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  )
            })}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center '>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure ?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='red' onClick={handleUserState}>
                Continue
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
 
}

export default Users
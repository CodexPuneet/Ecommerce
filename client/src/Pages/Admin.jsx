import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { Button, Center, Image } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Text,
  Box,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Popover,
  Img,
} from '@chakra-ui/react'
import { useSelector } from "react-redux";
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'


const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const navigate = useNavigate();
 const token=useSelector((store)=>(store.AuthReducer.token))

  const [data, setData]=useState({
    title:"",
    image:"",
    price:"",
    rating:""
})
const [list, setList] = useState([]);
const [editKey, setEditKey] = useState("");
  const [editValue, setEditValue] = useState("");

const handleChange=(e)=>{
    const {name, value}=e.target;
    setData({
        ...data,
        [name]:value
    })
   
}

const handlePost=(e)=>{
  e.preventDefault()
  axios.post('http://localhost:4500/shop/',data,{
headers:{
  Authorization: token
}
  })
  .then((res)=>{
    if(res.data=="Item has been listed Sucessfully")
    {
      onClose();
      toast({
        title: 'Added Sucessfull.',
        description: res.data,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      getData()
    }
})
  .catch((err)=>{})
}
  
const getData = () => {
  axios.get(`http://localhost:4500/shop/`, {
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
  })
    .then((res) => setList(res.data))

    .catch((err) =>
      toast({
        title: "Error Occured",
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    );
};
const handelDelete = (id) => {
    axios.delete(`http://localhost:4500/shop/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: token
      },
    })
    .then((res) => {
      toast({
        title: "Item Deleted Successfully",
        description: `You've Removed Item with id ${id} from Database.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      getData();
    })
    .catch((err) =>
      toast({
        title: "Error Occured",
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    );
};


const handelEdit = (id) => {
  let edit = { [editKey]: editValue };

  axios.patch(`http://localhost:4500/shop/${id}`,edit, {
    headers: {
      "content-type": "application/json",
      Authorization: token
    },
  })
    .then((res) => {
      toast({
        title: 'Updated Sucessfull.',
        description: res.data,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      getData();
    })
    .catch((err) =>
      toast({
        title: "Error Occured",
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    );
};



useEffect(()=>{
  getData()
},[])

  return (
    <div>
<Navbar/>

<Button m={"20px"} bg="#2ca8e0" color="#ffff" hover={"red"} onClick={onOpen}>Post</Button>
<Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List a New Product</ModalHeader>
          <ModalCloseButton />
          <form >         
             <ModalBody pb={6}>
            <FormControl >
              <FormLabel>Product Name</FormLabel>
              <Input ref={initialRef} required  placeholder='Name' name='title' type='text'  onChange={handleChange}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Image</FormLabel>
              <Input placeholder='Product URL' isRequired  name='image' type='text'  onChange={handleChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Product Price</FormLabel>
              <Input placeholder='Price' isRequired name='price' type='number'  onChange={handleChange} />
            </FormControl>
         

          <FormControl mt={4}>
              <FormLabel>Product Rating</FormLabel>
              <Input placeholder='Rating' isRequired  name='rating' type='number'  onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' onClick={handlePost} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            
          </ModalFooter>
          </form>

     
        </ModalContent>
      </Modal>


      <Box p="0px 20px">
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Sr No.</Th>
                  <Th>Image</Th>
                  <Th>Title</Th>
                  <Th>Price</Th>
                  <Th>Rating</Th>
                  <Th>Edit</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {list.length==0 ?  <Center><Image src='https://bakestudio.in/assets/images/cart/empty-cart.gif'/></Center>  : list?.map((el, index) => {
                  return (
                    <Tr
                      p="10px"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      key={index}
                    >
                      <Td>{index + 1}</Td>
                      <Td>
                        <Img w="70px" src={el.image}></Img>
                      </Td>
                      <Td>
                        <Text>{el.title}</Text>
                      </Td>
              
                      <Td>
                        <Text>{el.price}</Text>
                      </Td>
                      <Td>
                        <Text>{el.rating}</Text>
                      </Td>
                      <Td>
                        <Popover>
                          <PopoverTrigger>
                            <Button color={'#ffff'} bg={'#14D52D'} mt="8px"><EditIcon /></Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Confirmation!</PopoverHeader>
                            <PopoverBody>
                              <form
                                onSubmit={(e) => {
                                  e.preventDefault();
                                  handelEdit(el._id);
                                }}
                              >
                                <FormLabel>Key</FormLabel>
                                <Input
                                  type="text"
                                  onChange={(e) => setEditKey(e.target.value)}
                                  isRequired
                                />
                                <FormLabel>Value</FormLabel>
                                <Input
                                  type={editKey == "price || rating" ? "number" : "text"}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  isRequired
                                />
                                <FormLabel></FormLabel>

                                <Input
                                  mt="5px"
                                  type="submit"
                                  bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
                                />
                              </form>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td>
                        <Button
                        bg={'#D2141D'}
                          mt="8px"
                          onClick={() => handelDelete(el._id)}
                          ml="5px"
                          color={'#ffff'}
                        >
                         <DeleteIcon  />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

    </div>
  )
}

export default Admin
import {
    Box,
    Flex,
    Avatar,
    Button,
    Image,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
  } from '@chakra-ui/react';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import { useNavigate } from "react-router-dom";
  import { useSelector,useDispatch } from "react-redux";
  import { FaShoppingCart } from 'react-icons/fa';
  import {getAuthLogout} from "../Redux/AuthReducer/action";
  
  export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { colorMode, toggleColorMode } = useColorMode();
    const data=useSelector((store)=>(store.AuthReducer.isAuth))
    const item=useSelector((store)=>(store.AppReducer.Cart))
    let user="person"
    if(data.email && data.email.includes('@admin.com'))
    {
      user="admin";
    }
    const handleLogout=()=>{
      dispatch(getAuthLogout())
      navigate('/')
    }
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box w='50px'><Image src="https://impresariopromotions.com/wp-content/uploads/2020/05/logo-60x49.png"/></Box>
       
         <Text fontSize={'22px'} color={'#2da9e1'} fontFamily={'cursive'}><b><span style={{'color':'#f2a2c6'}}>Impresario</span> Promotions</b></Text>
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>

              <Button onClick={()=>navigate("/cart")} >
                  <FaShoppingCart />
                  <Text w='20px' h={'18px'} color={'#ffff'} borderRadius={'50%'} bg={"red"} pos={'absolute'} right={'5px'} top={'1px'}>{item.length>9?"9+":item.length}</Text>
                </Button>

                <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
  
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg'}
                    />
                  </MenuButton>
                  <MenuList zIndex={'1000'} alignItems={'center'} z-Index={1000} bg={user=='admin'?"#b2f4ea":"Yellow"} >
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={user=='admin'?'https://images.avishkaar.cc/user/avatar/coder.webp':"https://us.123rf.com/450wm/robuart/robuart2010/robuart201000672/156977979-vector-cartoon-character-avatar-of-young-bearded-man-wearing-eyeglasses-in-yellow-t-shirt-isolated.jpg?ver=6"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <Text fontSize={'25px'} color={'pink.400'} fontFamily={'fantasy'}>{data && data.name}</Text>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem  onClick={()=>navigate("/home")}>Dashboard</MenuItem>
                    <MenuItem onClick={()=>navigate("/cart")}>Cart</MenuItem>
                    <MenuItem bg={'#EE3E3E'} color={'white'} onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
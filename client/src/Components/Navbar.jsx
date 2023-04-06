import {
    Box,
    Flex,
    Avatar,
    Button,
    Image,
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
  import { useSelector } from "react-redux";
  
  export default function Navbar() {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const data=useSelector((store)=>(store.AuthReducer.isAuth))
    let user="person"
if(data.email.includes('@admin.com'))
{
  user="admin";
}
    const handleLogout=()=>{
     
      navigate('/')
    }
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} >
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box w='50px'><Image src="https://impresariopromotions.com/wp-content/uploads/2020/05/logo-60x49.png"/></Box>
       
  
            <Flex alignItems={'center'}>
              <Stack direction={'row'} spacing={7}>
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
                  <MenuList zIndex={'1000'} alignItems={'center'} z-Index={1000} bg={user=='admin'?"teal":"Yellow"} >
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={user=='admin'?'https://images.avishkaar.cc/user/avatar/coder.webp':"https://us.123rf.com/450wm/robuart/robuart2010/robuart201000672/156977979-vector-cartoon-character-avatar-of-young-bearded-man-wearing-eyeglasses-in-yellow-t-shirt-isolated.jpg?ver=6"}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{data && data.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem  onClick={()=>navigate("/homepage")}>Dashboard</MenuItem>
                    <MenuItem onClick={()=>navigate("/homepage")}>Admin Panel</MenuItem>
                    <MenuItem color={'red'} onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
      </>
    );
  }
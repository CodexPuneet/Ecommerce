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
  
  
  export default function Navbar() {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    let data=JSON.parse(localStorage.getItem('paypal'))
    const handleLogout=()=>{
      localStorage.removeItem('paypal')
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
                  <MenuList alignItems={'center'} z-Index={1000} >
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={'https://images.avishkaar.cc/user/avatar/coder.webp'}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{data && data.data.user.name}</p>
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